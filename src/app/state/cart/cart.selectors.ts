import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartItem } from '../../services/requests/cart.service';

export const selectCart = createFeatureSelector<ICartItem[]>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart
);
