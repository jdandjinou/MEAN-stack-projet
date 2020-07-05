import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AddCookieInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`AddCookie interceptor intercepted ${req.url} with method ${req.method}`);

        const reqWithCookie: HttpRequest<any> = req.clone({
            withCredentials: true
        });
        return next.handle(reqWithCookie);
    }
}