import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

    /**
   * Intercepts and handles the HTTP request by adding an authorization token to the headers.
   *
   * @param {HttpRequest<any>} req - the HTTP request to be intercepted
   * @param {HttpHandler} next - the next HTTP handler
   * @return {Observable<HttpEvent<any>>} an observable of the HTTP event after interception
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = environment.token;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authReq);
  }
}
