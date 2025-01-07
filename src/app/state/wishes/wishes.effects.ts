import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { wishesActions, wishesTrigger } from './wishes.actions';
import { WishesService } from '../../services/requests/wishes.service';
import { switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

export const getWishesEffect = createEffect((
    actions$ = inject(Actions),
    wishesService = inject(WishesService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(wishesTrigger),
    switchMap(() => wishesService.getWishes()),
    tap((wishesItems) => store.dispatch(wishesActions.loadToWishes(wishesItems)))
  ),
  { functional: true, dispatch: false }
);

export const addToWishesEffect = createEffect((
    actions$ = inject(Actions),
    wishesService = inject(WishesService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(wishesActions.add),
    switchMap(({ productId }) => wishesService.addToWish(productId)),
    tap((wishesItems) => store.dispatch(wishesActions.loadToWishes(wishesItems)))
  ),
  { functional: true, dispatch: false }
);

export const removeFromWishesEffect = createEffect((
    actions$ = inject(Actions),
    wishesService = inject(WishesService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(wishesActions.remove),
    switchMap(({ productId }) => wishesService.removeFromWishes(productId)),
    tap((wishesItems) => store.dispatch(wishesActions.loadToWishes(wishesItems)))
  ),
  { functional: true, dispatch: false }
);
