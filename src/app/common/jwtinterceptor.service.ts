import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { AuthenticationService } from '../login/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptorService implements HttpInterceptor{

  constructor(private authent: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authent.jwtToken;
    const clone = req.clone({setHeaders:{Authorization:`Bearer ${jwt}`}})
    return next.handle(clone);
  }
}
