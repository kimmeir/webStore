import { Component, inject } from '@angular/core';
import { CartService } from '../../services/requests/cart.service';
import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../state/cart/cart.selectors';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { cartActions } from '../../state/cart/cart.actions';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CurrencyPipe,
    MatIcon,
    NgIf,
    MatIconButton,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  store = inject(Store);

  // cart$ = this.cartService.cartItems;
  cart$ = this.store.select(selectCartItems);

  constructor(private profileService: ProfileService) {
    if (this.profileService.isAuthorized())
      this.cartService.getCart()
  }

  onRemoveFromCart(event: Event, productId: number | string) {
    event.stopPropagation();
    this.store.dispatch(cartActions.removeTrigger(productId));
    //
    // if (this.profileService.isAuthorized())
    //   this.cartService.removeFromCart(productId)
    //     .subscribe();
    // else {
    //   this.store.dispatch(cartActions.remove(productId));
    // }
  }
}
