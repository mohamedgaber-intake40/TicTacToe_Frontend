import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Auth/Models/user';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: User;
  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.user = this.localStorageService.getUser();
    // console.log(this.user);
    if (this.user) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.user.token.access_token
        }
      });
    }
    return next.handle(request);
  }
}
