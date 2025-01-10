import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { StripeService } from '../../../../services/requests/stripe.service';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { Store } from '@ngrx/store';
import { selectCartTotalPrice } from '../../../../state/cart/cart.selectors';
import { IOrderPayload, OrderService } from '../../../../services/requests/order.service';
import { CartTotalBlockComponent } from '../../components/cart-total-block/cart-total-block.component';
import { of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethodComponent } from '../../components/payment-method/payment-method.component';
import { CheckoutAddressesComponent } from '../../components/checkout-addresses/checkout-addresses.component';
import { cartTriggerAction } from '../../../../state/cart/cart.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CartTotalBlockComponent,
    PaymentMethodComponent,
    CheckoutAddressesComponent,
  ]
})
export class CheckoutComponent {
  @ViewChild(CheckoutAddressesComponent) checkoutAddresses!: CheckoutAddressesComponent;

  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);
  private orderService = inject(OrderService);
  private store = inject(Store);
  protected router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private stripe = this.stripeService.stripe;
  private paymentMethod = this.orderService.paymentMethod;
  private paymentMethodId = signal<string>('');

  user = this.profileService.user;
  stripeAmount: number = 0;


  constructor() {
    this.profileService.getProfile();

    this.store.select(selectCartTotalPrice)
      .subscribe(amount => {
        this.stripeAmount = Math.round(amount * 100);
      });
  }

  onPlaceOrder() {
    if (!this.checkoutAddresses?.billingForm?.form?.valid
      || (this.checkoutAddresses.isShipDiffAsBill() && !this.checkoutAddresses?.shippingForm?.form?.valid)) return;
    this.orderMethod()[this.paymentMethod()]()
      .pipe(
        tap((orderResult) => this.router.navigate(['cart', 'order-success', orderResult.order.id])),
        tap(() => this.snackBar.open('Order placed', 'Close', { duration: 5000 })),
        tap(() => this.store.dispatch(cartTriggerAction()))
      )
      .subscribe()
  }

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

  order = computed<IOrderPayload>(() => ({
    paymentMethod: this.paymentMethod(),
    paymentMethodId: this.paymentMethodId(),
    amount: this.stripeAmount,
    currency: 'usd',
    billAddress: this.checkoutAddresses.billingForm.form.value,
    shipAddress: this.checkoutAddresses.isShipDiffAsBill()
      ? this.checkoutAddresses.shippingForm.form.value
      : this.checkoutAddresses.billingForm.form.value
  }));
  // TODO: add list of products for checkout??
}
