import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../../../state/cart/cart.selectors';
import { cartActions } from '../../../../state/cart/cart.actions';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [
    AsyncPipe,
    CartItemComponent,
    InfoBlockComponent,
    NgIf,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {
  store = inject(Store);
  cart$ = this.store.select(selectCartItems);

  onRemoveFromCart(cartItemId: string | number) {
    this.store.dispatch(cartActions.removeTrigger(cartItemId));
  }

  onChangeQuantity({ id, quantity }: { id: number | undefined, quantity: number }) {
    if (!id) return;
    this.store.dispatch(cartActions.changeQuantity(id, quantity));
  }
}
