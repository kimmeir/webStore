import { createReducer, on } from '@ngrx/store';
import { IWishItem } from '../../services/requests/wishes.service';
import { wishesActions, wishesClear } from './wishes.actions';

export const initialState: IWishItem[] = [];

export const wishesReducers = createReducer(
  initialState,
  on(wishesActions.loadToWishes, (_, { wishItems }) => wishItems),
  on(wishesClear, () => initialState)
);
