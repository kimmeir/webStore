import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../../services/requests/profile/profile.typings';

export const selectProfile = createFeatureSelector<IUser | {}>('profile');

export const selectProfileData = createSelector(
  selectProfile,
  (profile) => profile
);
