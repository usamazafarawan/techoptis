import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmobilierService, Property } from '../../immobilier.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  propertyId: string = '';
  allProperties: Property[] = [];
  selectedProperty: any = {};
  reservationForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.reservationForm = this.fb.group({
      address: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      childrens: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.allProperties = this.immobilierService.getProperties();
    this.route.queryParams.subscribe((params: any) => {
      if (params?.propertyId) {
        this.propertyId = params.propertyId;
        this.selectedProperty = this.allProperties.find(
          (property: Property) => Number(property.id) == Number(this.propertyId)
        );
      } else {
        this.propertyId = '';
      }
    });
  }

  navigateToPropertiesList() {
    this.router.navigate(['/voyageur/list-location']);
  }

  reserve() {
    const userInfo: any =
      JSON.parse(localStorage.getItem('userProfile') as any) || {};
    const reservationDetail: any = JSON.parse(
      localStorage.getItem('reservationsDetails') as any
    );
    const reservationDetails: any[] = [];
    if (reservationDetail && userInfo) {
      const userReservationInfoIndex = reservationDetail.findIndex(
        (reservation: any) =>
          reservation.userName === userInfo.name &&
          reservation.userEmail == userInfo.email
      );
      if (userReservationInfoIndex > -1) {
        reservationDetail[userReservationInfoIndex].reservationdetails.push({
          propertyId: this.selectedProperty.id,
          propertyName: this.selectedProperty.name,
          price: this.selectedProperty.price,
          address: this.reservationForm.value.address,
          arrivalDate: this.reservationForm.value.arrivalDate,
          departureDate: this.reservationForm.value.departureDate,
          adults: this.reservationForm.value.adults,
          childrens: this.reservationForm.value.childrens,
        });
        localStorage.setItem(
          'reservationsDetails',
          JSON.stringify(reservationDetail)
        );
      }
    } else {
      const reservatinUserDetails: any = {
        userName: userInfo.name,
        userEmail: userInfo.email,
        reservationdetails: [],
      };
      reservatinUserDetails.reservationdetails.push({
        propertyId: this.selectedProperty.id,
        propertyName: this.selectedProperty.name,
        price: this.selectedProperty.price,
        address: this.reservationForm.value.address,
        arrivalDate: this.reservationForm.value.arrivalDate,
        departureDate: this.reservationForm.value.departureDate,
        adults: this.reservationForm.value.adults,
        childrens: this.reservationForm.value.childrens,
      });
      reservationDetails.push(reservatinUserDetails);
      localStorage.setItem(
        'reservationsDetails',
        JSON.stringify(reservationDetails)
      );
    }
    this.toaster.success('Réservation ajoutée avec succès');
  }
}
