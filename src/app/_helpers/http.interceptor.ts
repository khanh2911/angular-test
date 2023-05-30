import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { StorageService } from '../_services/storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const user = this.storageService.getUser();
    if (user != null) {
      // cấu hình gắn token trong header cho mọi http request
       authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + user.accessToken)});
    }
    return next.handle(authReq);
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
