import { Component, inject } from '@angular/core';
import { InfoBlockComponent } from '../../shared/components/info-block/info-block.component';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectWishListItems } from '../../state/wishes/wishes.selectors';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { cartActions } from '../../state/cart/cart.actions';
import { IProduct } from '../../services/requests/products';
import { wishesActions } from '../../state/wishes/wishes.actions';

@Component({
  selector: 'app-wishes',
  standalone: true,
  imports: [
    InfoBlockComponent,
    CurrencyPipe,
    AsyncPipe,
    NgIf,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './wishes.component.html',
  styleUrl: './wishes.component.scss'
})
export class WishesComponent {
  private store = inject(Store);
  wishes$ = this.store.select(selectWishListItems);

  addToCart(product: IProduct) {
    const cartItem = {
      productId: product.id,
      product,
      quantity: 1
    };
    this.store.dispatch(cartActions.addTrigger(cartItem))
  }

  removeItem(product: IProduct) {
    this.store.dispatch(wishesActions.remove(product.id))
  }
}
