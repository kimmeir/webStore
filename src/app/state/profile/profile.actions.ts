import { createAction, createActionGroup } from '@ngrx/store';
import { ILoginForm, IUser } from '../../services/requests/profile/profile.typings';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    login: (loginForm: ILoginForm) => loginForm,
    loadProfileSuccess: (profile: IUser) => ({ profile }),
    // loadProfileError: (error) => ({ error }),
    // updateProfile: (profile) => ({ profile }),
    // updateProfileSuccess: (profile) => ({ profile }),
    // updateProfileError: (error) => ({ error }),
  }
});

export const profileLogout = createAction('[Profile] Logout');
