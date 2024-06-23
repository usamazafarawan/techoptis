import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmobilierService, Property } from '../../immobilier.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css',
})
export class FactureComponent implements OnInit {
  userDetails: any;
  reservationDetails: any[] = [];
  currentDate: Date = new Date();
  currentIndex: number = -1;
  userInfo:any={};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.userDetails = {};

    /////
  }

  ngOnInit(): void {
    this.userInfo =
      JSON.parse(localStorage.getItem('userInfo') as any) || {};
    const userProfile: any =
      JSON.parse(localStorage.getItem('userProfile') as any) || {};
    const reservationDetails: any = JSON.parse(
      localStorage.getItem('reservationsDetails') as any
    );

    this.userDetails = {
      name: userProfile.name,
      email: userProfile.email,
      phoneNumber: this.userInfo.phoneNumber ? this.userInfo.phoneNumber : '---',
      address: this.userInfo.adress ? this.userInfo.adress : '---',
    };

    console.log(' this.userDetails', this.userDetails);
    if (reservationDetails && this.userInfo) {
      const userReservationInfoIndex = reservationDetails.findIndex(
        (reservation: any) =>
          reservation.userName === userProfile.name &&
          reservation.userEmail == userProfile.email
      );
      console.log('userReservationInfoIndex: ', userReservationInfoIndex);

      if (userReservationInfoIndex > -1) {
        this.currentIndex = userReservationInfoIndex;
        console.log('userReservationInfoIndex: ', userReservationInfoIndex);
        this.reservationDetails =
          reservationDetails[userReservationInfoIndex].reservationdetails;
        console.log('this.reservationDetails: ', this.reservationDetails);
      }
    }
  }

  deleteReservation(propertyId: any) {
    this.reservationDetails.splice(
      this.reservationDetails.findIndex(
        (detaial: any) => detaial.propertyId == propertyId
      ),
      1
    );
    const reservationDetails: any = JSON.parse(
      localStorage.getItem('reservationsDetails') as any
    );

    reservationDetails[this.currentIndex].reservationdetails =
      this.reservationDetails;
    localStorage.setItem(
      'reservationsDetails',
      JSON.stringify(reservationDetails)
    );
    this.toaster.success('Réservation supprimée avec succès');
  }

  moveToPaymentGateWay(property: any) {
    console.log('property: ', property);

    this.router.navigate(['/voyageur/facture-paiement'], {
      queryParams: {
        paid: property.paid,
        price: Number(property.price*1.1+(this.userInfo?.breakfast ?10:0) +(this.userInfo?.cleaning ?5:0)).toFixed(0),
        propertyId: property.propertyId,
        propertyName: property.propertyName,
        type: 'property',
      },
    });
  }
}
