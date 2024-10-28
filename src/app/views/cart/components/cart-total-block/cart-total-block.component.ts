import { Component, computed, effect, inject, Signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotalPrice } from '../../../../state/cart/cart.selectors';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../../../layouts/header/components/auth-dialog/auth-dialog.component';
import { StripeService } from '../../../../services/requests/stripe.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-total-block',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    CurrencyPipe,
    InfoBlockComponent,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './cart-total-block.component.html',
  styleUrl: './cart-total-block.component.scss'
})
export class CartTotalBlockComponent {
  private store = inject(Store);
  protected router = inject(Router);
  private profileService = inject(ProfileService);
  private dialogRef = inject(MatDialog);
  private stripeService = inject(StripeService);
  private snackBar = inject(MatSnackBar);

  stripe = this.stripeService.stripe;

  cartTotalPrice$ = this.store.select(selectCartTotalPrice);
  cart$ = this.store.select(selectCartItems);
  pi_secret = this.stripeService.pi_secret;

  constructor() {
    effect(() => {
      this.pi_secret = this.stripeService.pi_secret;
    });
  }

  totalButtons: Signal<Record<string, {
    text: string,
    onClick: () => void,
    isDisabled?: boolean | string | null
  }>> = computed(() => ({
    '/cart': {
      text: 'Proceed to checkout',
      onClick: () => this.onProceedToCheckout(),
      isDisabled: undefined,
    },
    '/cart/checkout': {
      text: 'Place order',
      onClick: () => this.onPlaceOrder(),
      isDisabled: this.pi_secret(),
    }
  }));

  onProceedToCheckout() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['cart', 'checkout'])
      : this.dialogRef.open(AuthDialogComponent, {
        width: '400px',
      });
  }

  onPlaceOrder() {
    if (this.stripe && this.pi_secret())
      from(this.stripe()!.confirmCardPayment(this.pi_secret()!))
        .subscribe(result => {
          if (result.error?.message) {
            this.snackBar.open(result.error.message, 'Close');
          } else if (result?.paymentIntent?.status === 'succeeded') {
            this.snackBar.open('Payment succeeded', 'Close');
            this.router.navigate(['cart', 'success']);
          }
        });
  }

  // TODO: add list of products for checkout??
}
