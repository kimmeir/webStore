import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { selectCartTotal } from '../../state/cart/cart.selectors';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

export const checkoutGuard: CanActivateFn = (route, state): Observable<any> => {
  const store = inject(Store);

  return store.select(selectCartTotal)
    .pipe(
      tap((total) => total > 0)
    )
};

