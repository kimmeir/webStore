import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWishItem } from '../../services/requests/wishes.service';

export const selectWishes = createFeatureSelector<IWishItem[]>('wishes');

export const selectWishListItems = createSelector(
  selectWishes,
  (wishlist) => wishlist
);

