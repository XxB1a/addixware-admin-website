import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token_addixware');
    if (token) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
