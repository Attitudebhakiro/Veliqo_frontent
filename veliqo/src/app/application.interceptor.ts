import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from './application.service';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {

  constructor(private appservice: ApplicationService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localtoken = this.appservice.getToken();
    request = request.clone({ headers: request.headers.set('Authorization','bearer ' + localtoken )})
    return next.handle(request);
  }
}
