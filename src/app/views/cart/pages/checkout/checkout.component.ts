import { Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { StripeService } from '../../../../services/requests/stripe.service';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { selectCartTotalPrice } from '../../../../state/cart/cart.selectors';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatIcon } from '@angular/material/icon';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    CurrencyPipe,
    InfoBlockComponent,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    JsonPipe
  ]
})
export class CheckoutComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);
  private snackBar = inject(MatSnackBar);

  user = this.profileService.user;
  customer = this.stripeService.customer;
  methodToPay = 'default';
  stripeAmount: number = 0;

  constructor(private store: Store) {
    this.profileService.getProfile();

    this.store.select(selectCartTotalPrice)
      .subscribe(amount => {
        this.stripeAmount = Math.round(amount * 100);
        // this.paymentForm.patchValue({ amount: stripeAmount })
      });

    effect(() => {
      this.paymentForm.patchValue({
        name: this.user()?.first_name,
        email: this.user()?.email
      })
    });
  }

  paymentMethods = computed(() => [
    {
      title: 'Default card',
      value: 'default',
      isVisible: this.customer()?.metadata?.default_source !== undefined
    },
    {
      title: 'New card',
      value: 'new',
      isVisible: false
    }
  ].filter(item => item.isVisible))

  paymentForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [0, [Validators.required]]
  });

  stripe = injectStripe(this.stripeService.key);
  paying = signal(false);

  ngOnInit() {
    this.stripeService
      .createPaymentIntent({
        amount: this.stripeAmount,
        currency: 'usd'
      })
      .subscribe(pi => {
        if (!pi.client_secret) {
          this.snackBar.open('Problem to init checkout', 'Close');
          return;
        }
        this.stripeService.pi_secret.set(pi.client_secret);
      });
  }

  // TODO: add possibility to pay by new card
}
