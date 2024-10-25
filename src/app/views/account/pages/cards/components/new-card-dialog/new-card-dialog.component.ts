import { Component, inject } from '@angular/core';
import {
  LoginFormComponent
} from '../../../../../../layouts/header/components/auth-dialog/forms/login-form/login-form.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  SignUpComponent
} from '../../../../../../layouts/header/components/auth-dialog/forms/sign-up/sign-up.component';
import { InfoBlockComponent } from '../../../../../../shared/components/info-block/info-block.component';
import { MatIcon } from '@angular/material/icon';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElement,
  StripeCardElementOptions,
  StripeCardExpiryElement,
  StripeCardNumberElement
} from '@stripe/stripe-js';
import { StripeService } from '../../../../../../services/requests/stripe.service';
import { ProfileService } from '../../../../../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingComponent } from '../../../../../../shared/components/loading/loading.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { from, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-new-card-dialog',
  standalone: true,
  imports: [
    LoginFormComponent,
    MatTab,
    MatTabGroup,
    SignUpComponent,
    InfoBlockComponent,
    MatIcon,
    ButtonComponent,
    MatProgressSpinner,
    LoadingComponent,
    MatFormField,
    MatLabel
  ],
  templateUrl: './new-card-dialog.component.html',
  styleUrl: './new-card-dialog.component.scss'
})
export class NewCardDialogComponent {
  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);
  private dialog = inject(MatDialog);

  stripe: Stripe | null = null;
  user = this.profileService.user;
  cardNumberElement!: StripeCardNumberElement;
  cardExpiryElement!: StripeCardExpiryElement;
  cardCvcElement!: StripeCardCvcElement

  async ngOnInit() {
    this.stripe = await loadStripe(this.stripeService.key)

    if (this.stripe) {
      const elements = this.stripe.elements();

      this.cardNumberElement = elements.create('cardNumber', this.cardOptions);
      this.cardExpiryElement = elements.create('cardExpiry', this.cardOptions);
      this.cardCvcElement = elements.create('cardCvc', this.cardOptions);

      this.cardNumberElement.mount('#card-number');
      this.cardExpiryElement.mount('#card-exp');
      this.cardCvcElement.mount('#card-cvc');
    }
  }

  cardOptions: StripeCardElementOptions = {
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

  createCard() {
    from(this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.cardNumberElement,
    }))
      .pipe(
        switchMap((result) =>
          this.stripeService.createPaymentMethod({
            stripeId: this.user()?.stripeId,
            paymentMethodId: result.paymentMethod?.id
          })
        ),
        tap(() => this.stripeService.getPaymentMethods(this.user()!.stripeId as string)),
        tap(() => this.close())
      )
      .subscribe()
  }

  close() {
    this.dialog.closeAll();
  }
}
