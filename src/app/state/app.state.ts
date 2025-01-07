import { ICartItem } from '../services/requests/cart.service';
import { cartReducers } from './cart/cart.reducers';
import { ActionReducer } from '@ngrx/store';
import { IUser } from '../services/requests/profile/profile.typings';
import { profileReducers } from './profile/profile.reducers';
import { IWishItem } from '../services/requests/wishes.service';
import { wishesReducers } from './wishes/wishes.reducers';

export interface AppState {
  cart: ActionReducer<ICartItem[]>;
  profile: ActionReducer<IUser | {}>;
  wishes: ActionReducer<IWishItem[]>;
}

export const appState: AppState = {
  cart: cartReducers,
  profile: profileReducers,
  wishes: wishesReducers,
};
