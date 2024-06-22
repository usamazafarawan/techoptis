import { Component, ElementRef, ViewChild } from '@angular/core';
// import { StripeElementsOptions } from '@stripe/stripe-js';
import { NgxStripeModule, StripeService} from 'ngx-stripe';
import { StripeCardComponent } from 'ngx-stripe';
@Component({
  selector: 'app-facture-paiement',
  standalone: true,
  imports: [NgxStripeModule],
  templateUrl: './facture-paiement.component.html',
  styleUrl: './facture-paiement.component.css'
})
export class FacturePaiementComponent {
  @ViewChild('cardComponent', { static: true }) cardComponent!: ElementRef;

  elementsOptions:any = {
    locale: 'en'
  };

  cardOptions:any = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  constructor(private stripeService: StripeService) {}

  handlePayment() {
    this.stripeService.createToken(this.cardComponent.nativeElement, {})
      .subscribe((result) => {
        if (result.token) {
          // Handle the Stripe token
          console.log(result.token.id);
        } else if (result.error) {
          // Handle any errors
          console.log(result.error.message);
        }
      });
  }
}

