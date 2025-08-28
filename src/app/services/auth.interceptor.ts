import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cloned = req.clone({
    setParams: {
      api_key: environment.currencyApiKey
    }
  });

  return next(cloned);
};
