import { Component, computed, inject, signal, Signal } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { IOrderPayload, OrderService } from '../../../../services/requests/order.service';
import { of, switchMap, tap } from 'rxjs';
import { cartTriggerAction } from '../../../../state/cart/cart.actions';

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
  private orderService = inject(OrderService);

  private stripe = this.stripeService.stripe;
  private paymentMethod = this.orderService.paymentMethod;
  private paymentMethodId = signal<string>('');
  stripeAmount: number = 0;

  cartTotalPrice$ = this.store.select(selectCartTotalPrice);
  cart$ = this.store.select(selectCartItems);


  constructor() {
    this.store.select(selectCartTotalPrice)
      .subscribe(amount => {
        this.stripeAmount = Math.round(amount * 100);
      });
  }

  order = computed<IOrderPayload>(() => ({
    paymentMethod: this.paymentMethod(),
    paymentMethodId: this.paymentMethodId(),
    amount: this.stripeAmount,
    currency: 'usd',
  }));

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
      isDisabled: true,
    }
  }));

  orderMethod = computed(() => ({
    default: () => this.orderService.createOrder(this.order()),
    new: () =>
      this.stripe() && this.stripeService.cardNumberElement
        ? this.stripeService.createPaymentMethod()
          .pipe(
            switchMap(() => this.stripeService.createPaymentMethod()),
            tap((pm) => this.paymentMethodId.set(pm.paymentMethod?.id as string)),
            tap(() => this.orderService.createOrder(this.order()))
          )
        : of(this.snackBar.open('Problem to init checkout', 'Close', { duration: 5000 }))
  }));

  onProceedToCheckout() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['cart', 'checkout'])
      : this.dialogRef.open(AuthDialogComponent, {
        width: '400px',
      });
  }

  onPlaceOrder() {
    this.orderMethod()[this.paymentMethod()]()
      .pipe(
        tap(() => this.snackBar.open('Order placed', 'Close', { duration: 5000 })),
        tap(() => this.router.navigate(['cart', 'success'])),
        tap(() => this.store.dispatch(cartTriggerAction()))
      )
      .subscribe()
  }

  // TODO: add list of products for checkout??
}
