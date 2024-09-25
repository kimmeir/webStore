import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../loading/loading';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  return next(req)
    .pipe(
      tap(() => loadingService.start()),
      finalize(() => loadingService.stop())
    );
};
