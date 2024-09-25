import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://api.escuelajs.co/api/v1';
  const apiReq = req.clone({ url: `${baseUrl}${req.url}` });

  return next(apiReq);
};
