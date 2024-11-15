import { Component, inject } from '@angular/core';
import { Stripe, StripeCardCvcElement, StripeCardElementOptions, StripeCardExpiryElement } from '@stripe/stripe-js';
import { StripeService } from '../../../services/requests/stripe.service';

@Component({
  selector: 'app-new-card-form',
  standalone: true,
  imports: [],
  templateUrl: './new-card-form.component.html',
  styleUrl: './new-card-form.component.scss'
})
export class NewCardFormComponent {
  private stripeService = inject(StripeService);

  private stripe: Stripe | null = null;
  cardExpiryElement!: StripeCardExpiryElement;
  cardCvcElement!: StripeCardCvcElement

  private cardOptions: StripeCardElementOptions = {
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

  private async ngOnInit() {
    this.stripe = this.stripeService.stripe();

    if (this.stripe) {
      const elements = this.stripe.elements();

      this.stripeService.cardNumberElement = elements.create('cardNumber', this.cardOptions);
      this.cardExpiryElement = elements.create('cardExpiry', this.cardOptions);
      this.cardCvcElement = elements.create('cardCvc', this.cardOptions);

      this.stripeService.cardNumberElement.mount('#card-number');
      this.cardExpiryElement.mount('#card-exp');
      this.cardCvcElement.mount('#card-cvc');
    }
  }
}
