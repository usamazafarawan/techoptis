import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property, ImmobilierService } from '../../immobilier.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class ListLocationComponent implements OnInit {
  searchResults: Property[] = [];
  filteredProperties: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private immobilierService: ImmobilierService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      const address = params.query || '';
      this.searchResults = this.immobilierService
        .getProperties()
        .filter((property: any) =>
          property.city.toLowerCase().includes(address.toLowerCase())
        );
      this.filteredProperties = this.searchResults;
    });
  }

  filterByCity(city: string): void {
    if (city) {
      this.filteredProperties = this.searchResults.filter(
        (property) => property.city === city
      );
    } else {
      this.filteredProperties = this.searchResults;
    }
  }

  bookNow(selectedProperty: Property) {
    console.log('selectedProperty: ', selectedProperty);
    this.router.navigate(['/voyageur/reservation'], {
      queryParams: {
        propertyId: selectedProperty.id,
      },
    });
  }

  checkReservation(property: Property) {
    const reservationDetails: any = JSON.parse(
      localStorage.getItem('reservationsDetails') as any
    );
    const userProfile: any = JSON.parse(
      localStorage.getItem('userProfile') as any
    );
    if (reservationDetails && userProfile) {
      const userReservationInfo = reservationDetails.find(
        (reservation: any) =>
          reservation.userName === userProfile.name &&
          reservation.userEmail == userProfile.email
      );
      if (userReservationInfo) {
        if (
          userReservationInfo.reservationdetails.findIndex(
            (reserveDetail: any) =>
              Number(reserveDetail.propertyId) == Number(property.id)
          ) > -1
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


