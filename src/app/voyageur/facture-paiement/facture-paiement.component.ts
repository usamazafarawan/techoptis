import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { StripeElementsOptions } from '@stripe/stripe-js';


import {
  injectStripe,
  provideNgxStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import { PlutoService, STRIPE_PUBLIC_KEY } from '../../pluto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-facture-paiement',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
  templateUrl: './facture-paiement.component.html',
  styleUrl: './facture-paiement.component.css'
})
export class FacturePaiementComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly plutoService = inject(PlutoService);
  readonly stripe = injectStripe(STRIPE_PUBLIC_KEY);
  amount: number = 200;
  userProfile:any={}
  selectedSubscription:any[]=[]

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    // amount: [2500, [Validators.required]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paying = signal(false);
  currentData:any={}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  // get amount():number {
  //   const amountValue = this.checkoutForm.get('amount')?.value;
  //   if (!amountValue || amountValue < 0) return 0;

  //   return Number(amountValue / 100) ;
  // }

  ngOnInit() {
    // const amount = this.checkoutForm.get('amount')?.value;
    // console.log('amount: ', amount);
    this.currentData ={ };
    this.userProfile = JSON.parse(localStorage.getItem('userProfile') as any) || {};
    this.selectedSubscription = JSON.parse(localStorage.getItem('userSubscription') as any) || {};
   

    this.route.queryParams.subscribe((params:any) => {
      console.log('params: ', params);
      if(params){
        this.currentData = params;
        if(params.type==='subscription'){
          this.amount = Number(this.currentData.subPrice)
        }
      }
      else{
        this.currentData ={ }
      }
     
    });

    this.plutoService.createPaymentIntent({
        amount:this.amount,
        currency: 'eur',
      })
      .subscribe((pi) => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      });
  }

  clear() {
    this.checkoutForm.patchValue({
      name: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
    });
  }

  collectPayment() {
    if (this.paying() || this.checkoutForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } =
      this.checkoutForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe({
        next: (result) => {
          this.paying.set(false);
          if (result.error) {
            console.log('result.error: ', result.error);
            this.toaster.error(result.error.message)
       
          } else if (result.paymentIntent.status === 'succeeded') {
            console.log("success");
            this.toaster.success("Amount Submitted Successfully")

            if(this.currentData.type === 'subscription'){
              this.subcriptionRecordUpdate();
            }
          }
        },
        error: (err) => {
          console.log('err: ', err);
          this.paying.set(false);
          this.toaster.error(err.message)

        
        },
      });
  }

  subcriptionRecordUpdate(){
    if(this.selectedSubscription?.length){
      const userIndex = this.selectedSubscription.findIndex((user:any)=> user.userEmail == this.userProfile.email)
      if(userIndex>-1){
        this.selectedSubscription[userIndex]=this.currentData
      } 
    }
    else{
       this.selectedSubscription=[];
            this.selectedSubscription.push(this.currentData)  ;
            this.selectedSubscription =[...this.selectedSubscription]
    }
    localStorage.setItem("userSubscription", JSON.stringify(this.selectedSubscription));
    this.router.navigate(['voyageur/abonnement'])
  }
}
