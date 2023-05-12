import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( request.url.indexOf('login') !== -1)

     {
      return next.handle(request);
    }

    const jwtToken = this.userService.getJwtToken();
    return next.handle(this.addToken(request, jwtToken));
  }
  private addToken(request: HttpRequest<any>,jwtToken:string){
    return request.clone({"headers":request.headers.set('Authorization',
    'Bearer ' + jwtToken)})
  }
}
