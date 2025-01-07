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
import { MatDialog } from '@angular/material/dialog';
import { wishesClear, wishesTrigger } from '../wishes/wishes.actions';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    tokenService = inject(TokenService),
    profileService = inject(ProfileService),
    dialog = inject(MatDialog),
    cartService = inject(CartService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(profileActions.login),
    exhaustMap((loginData) => {
      return profileService.login(loginData)
        .pipe(
          tap((token) => tokenService.setToken(token.access_token)),
          tap(() => dialog.closeAll()),
          tap(() => store.dispatch(wishesTrigger())),
          switchMap(() => cartService.getCart()),
          tap((cartItems) => {
            cartService.cartItems.set(cartItems)
            store.dispatch(cartActions.loadCartOnLogin(cartItems))
          })
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
      store.dispatch(wishesClear());
      tokenService.removeToken()
      router.navigate(['/']);
    })
  ),
  { functional: true, dispatch: false }
)
