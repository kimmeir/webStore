import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { StripeService } from '../../../../services/requests/stripe.service';
import { switchMap, tap } from 'rxjs';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { injectStripe, StripeCardComponent, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { BankCardComponent } from './components/bank-card/bank-card.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';

@Component({
  selector: 'app-existing-stripe-cards',
  standalone: true,
  imports: [
    ButtonComponent,
    AsyncPipe,
    JsonPipe,
    StripeElementsDirective,
    StripePaymentElementComponent,
    StripeCardComponent,
    NgIf,
    StripeCardComponent,
    StripeCardComponent,
    BankCardComponent,
    InfoBlockComponent,
    MatButton,
    MatIcon,
    BasicButtonComponent
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  private profileService = inject(ProfileService);
  private stripeService = inject(StripeService);

  user = this.profileService.user;
  cards = this.stripeService.cards;
  stripe = injectStripe(this.stripeService.key)
  newCard = signal(false);

  ngOnInit() {
    if (this.user()?.stripeId !== undefined) {
      this.stripeService.getPaymentMethods(this.user()!.stripeId as string);
    }
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
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
    this.stripe
      .createPaymentMethod({
        type: 'card',
        card: this.cardElement.element,
      })
      .pipe(
        switchMap(result =>
          this.stripeService.createPaymentMethod({
            stripeId: this.user()?.stripeId,
            paymentMethodId: result.paymentMethod?.id
          })
        ),
        tap(() => this.newCard.set(false)),
        tap(() => this.stripeService.getPaymentMethods(this.user()!.stripeId as string))
      )
      .subscribe()
  }
}
