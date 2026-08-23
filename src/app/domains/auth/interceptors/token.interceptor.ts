import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environments';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  const headers: Record<string, string> = { Auth: environment.apiKey };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  req = req.clone({
    setHeaders: headers,
  });
  return next(req);
};
