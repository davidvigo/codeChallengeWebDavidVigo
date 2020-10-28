import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from "../services/session.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    static isAuthURL(reqURL: string): boolean {
        return reqURL.includes('app/token');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!JwtInterceptor.isAuthURL(req.url)) {
            const token = SessionService.getAccessToken();
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${ token }`
                    }
                });
            }
        }

        return next.handle(req);
    }
}
