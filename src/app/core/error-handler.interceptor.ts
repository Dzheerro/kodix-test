import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        console.error('Error 500: Internal Server Error', error);
      }
      return throwError(() => error);
    })
  );
};
