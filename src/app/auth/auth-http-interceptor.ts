import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request - we modify because properties on the original req body are "read-only"
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq); //Can pipe and do other things with the different value types .pipe(
    //   filter((val) => val.type === HttpEventType.Sent),
    //   tap(() => {
    //     console.log('Sent a request.');
    //   })
    // );
  }
}
