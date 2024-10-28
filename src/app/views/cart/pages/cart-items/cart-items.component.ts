import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { CartService } from '../../../../services/requests/cart.service';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../../../state/cart/cart.selectors';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { cartActions } from '../../../../state/cart/cart.actions';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [
    AsyncPipe,
    CartItemComponent,
    InfoBlockComponent,
    NgIf
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {
  cartService = inject(CartService);
  store = inject(Store);

  cart$ = this.store.select(selectCartItems);

  constructor(private profileService: ProfileService) {
    if (this.profileService.isAuthorized())
      this.cartService.getCart()
  }

  onRemoveFromCart(cartItemId: string | number) {
    this.store.dispatch(cartActions.removeTrigger(cartItemId));
  }
}
