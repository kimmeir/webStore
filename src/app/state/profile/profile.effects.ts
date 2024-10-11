import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { exhaustMap, switchMap, tap } from 'rxjs';
import { profileActions, profileLogout } from './profile.actions';
import { TokenService } from '../../services/token.service';
import { CartService } from '../../services/requests/cart.service';
import { Store } from '@ngrx/store';
import { cartActions, cartClear } from '../cart/cart.actions';
import { Router } from '@angular/router';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    tokenService = inject(TokenService),
    profileService = inject(ProfileService),
    cartService = inject(CartService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(profileActions.login),
    exhaustMap((loginData) => {
      return profileService.login(loginData)
        .pipe(
          tap((token) => tokenService.setToken(token.access_token)),
          tap(() => profileService.isLoginModalOpen.set(false)),
          switchMap(() => cartService.getCart()),
          tap((cartItems) => store.dispatch(cartActions.loadCartOnLogin(cartItems)))
        )
    })
  ),
  { functional: true, dispatch: false }
);

export const logoutEffect = createEffect((
    actions$ = inject(Actions),
    tokenService = inject(TokenService),
    router = inject(Router),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(profileLogout),
    tap(() => {
      store.dispatch(cartClear());
      tokenService.removeToken()
      router.navigate(['/']);
    })
  ),
  { functional: true, dispatch: false }
)