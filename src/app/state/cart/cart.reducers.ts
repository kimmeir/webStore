import { createReducer, on } from '@ngrx/store';
import { cartActions, cartClear } from './cart.actions';
import { ICartItem } from '../../services/requests/cart.service';

export const initialState: ICartItem[] = [];

export const cartReducers = createReducer(
  initialState,
  on(cartActions.add, (state, { product }) => {
    const existingItem = state.some((item) => item.productId === product.productId);
    return existingItem
      ? state.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      )
      : [...state, product];
  }),
  on(cartActions.remove, (state, { cartItemId }) => {
    return state.filter((item) => item.productId !== cartItemId);
  }),
  on(cartActions.loadToCart, (_, { cartItems }) => {
    console.log('loadToCart:', cartItems)
    return cartItems
  }),
  on(cartClear, () => initialState)
);
