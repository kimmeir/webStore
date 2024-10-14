import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileLogout } from '../../state/profile/profile.actions';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return next(req)
    .pipe(
      catchError((error) => {
        if (error.status === 401)
          store.dispatch(profileLogout());
        return throwError(error);
      })
    )
};

