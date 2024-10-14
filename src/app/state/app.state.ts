import { ICartItem } from '../services/requests/cart.service';
import { cartReducers } from './cart/cart.reducers';
import { ActionReducer } from '@ngrx/store';
import { IUser } from '../services/requests/profile/profile.typings';
import { profileReducers } from './profile/profile.reducers';

export interface AppState {
  cart: ActionReducer<ICartItem[]>;
  profile: ActionReducer<IUser | {}>;
}

export const appState: AppState = {
  cart: cartReducers,
  profile: profileReducers
};
