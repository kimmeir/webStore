import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartItem } from '../../services/requests/cart.service';

export const selectCart = createFeatureSelector<ICartItem[]>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart
);

export const selectCartTotal = createSelector(
  selectCart,
  (cart) => cart.length
);

export const selectCartTotalPrice = createSelector(
  selectCart,
  (cart) => cart.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0)
);
