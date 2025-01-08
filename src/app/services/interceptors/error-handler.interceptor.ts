import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileLogout } from '../../state/profile/profile.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const _snackBar = inject(MatSnackBar);

  return next(req)
    .pipe(
      catchError((error) => {
        if (error.status === 401) store.dispatch(profileLogout());
        if (error?.error?.message) _snackBar.open(error.error.message)

        return throwError(error);
      })
    )
};

