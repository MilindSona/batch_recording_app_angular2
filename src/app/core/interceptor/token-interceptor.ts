import { HttpInterceptorFn } from '@angular/common/http';
import { GlobalConstant } from '../../constants/global.constant';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(GlobalConstant.LOCAL_KEY_TOKEN);
  if (!token) {
    return next(req);
  }
  if (req.headers.has('Authorization')) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
