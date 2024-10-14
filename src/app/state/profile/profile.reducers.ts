import { IUser } from '../../services/requests/profile/profile.typings';
import { createReducer, on } from '@ngrx/store';
import { profileActions } from './profile.actions';

export const initialState: IUser | {} = {}

export const profileReducers = createReducer(
  initialState,
  on(profileActions.loadProfileSuccess, (_, { profile }) => profile)
);
