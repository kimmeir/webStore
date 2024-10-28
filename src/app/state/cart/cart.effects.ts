import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, first, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { CartService, ICartItem } from '../../services/requests/cart.service';
import { cartActions, cartTriggerAction } from './cart.actions';
import { Store } from '@ngrx/store';
import { selectCartItems } from './cart.selectors';
import { ProfileService } from '../../services/requests/profile/profile.service';

export const cartTriggerEffect = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(cartTriggerAction),
    exhaustMap(() => cartService.getCart()
      .pipe(
        tap((cartItems) => store.dispatch(cartActions.loadToCart(cartItems)))
      )),
  ),
  { functional: true, dispatch: false }
);

export const loginCartEffect = createEffect((
    actions$ = inject(Actions),
    store = inject(Store),
    cartService = inject(CartService)
  ) => actions$.pipe(
    ofType(cartActions.loadCartOnLogin),
    withLatestFrom(store.select(selectCartItems)),
    switchMap(([_, cartItems]) => cartItems.length
      ? cartService.bulkAddToCart(cartItems)
      : of(cartService.cartItems())
    ),
    tap((cartItems) => {
      store.dispatch(cartActions.loadToCart(cartItems as ICartItem[]))
    })
  ),
  { functional: true, dispatch: false }
);


export const cartAddEffect = createEffect((
    actions$ = inject(Actions),
    profileService = inject(ProfileService),
    cartService = inject(CartService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(cartActions.addTrigger),
    tap((cartItem) => profileService.isAuthorized()
      ? cartService.addToCart(cartItem.product)
        .subscribe((cartItems) => store.dispatch(cartActions.loadToCart(cartItems as ICartItem[])))
      : store.dispatch(cartActions.add(cartItem.product))
    ),
  ),
  { functional: true, dispatch: false }
);

export const cartRemoveEffect = createEffect((
    actions$ = inject(Actions),
    cartService = inject(CartService),
    store = inject(Store),
    profileService = inject(ProfileService)
  ) => actions$.pipe(
    ofType(cartActions.removeTrigger),
    tap((cartRemoveAction) => profileService.isAuthorized()
      ? cartService.removeFromCart(cartRemoveAction.cartItemId)
        .pipe(first())
        .subscribe((cartItems) => store.dispatch(cartActions.loadToCart(cartItems as ICartItem[])))
      : store.dispatch(cartActions.remove(cartRemoveAction.cartItemId))
    ),
  ),
  { functional: true, dispatch: false }
)
