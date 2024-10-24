import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { StripeService } from '../../services/requests/stripe.service';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { selectCartTotalPrice } from '../../state/cart/cart.selectors';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    StripePaymentElementComponent,
    ReactiveFormsModule,
    ButtonComponent,
    CurrencyPipe
  ]
})
export class CheckoutComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);

  user = this.profileService.user;
  totalPrice: number = 0;

  constructor(private store: Store) {
    this.profileService.getProfile();

    this.store.select(selectCartTotalPrice)
      .subscribe(amount => {
        const stripeAmount = Math.round(amount * 100);
        this.totalPrice = amount
        this.paymentForm.patchValue({ amount: stripeAmount })
      });

    effect(() => {
      this.paymentForm.patchValue({
        name: this.user()?.first_name,
        email: this.user()?.email
      })
    });
  }

  paymentForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [0, [Validators.required]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
    },
    wallets: {
      applePay: 'auto',
      googlePay: 'never'
    }
  };

  stripe = injectStripe(this.stripeService.key);
  paying = signal(false);

  ngOnInit() {
    this.stripeService
      .createPaymentIntent({
        amount: this.paymentForm.get('amount')?.value,
        currency: 'usd'
      })
      .subscribe(pi => {
        if (!pi.client_secret) {
          console.error('No client secret');
          return;
        }
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  pay() {
    if (this.paying() || this.paymentForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } = this.paymentForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name,
              email: email,
              address: {
                line1: address,
                postal_code: zipcode,
                city: city
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }
}
