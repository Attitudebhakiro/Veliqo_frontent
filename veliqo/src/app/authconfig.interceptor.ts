import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { ApplicationService } from "./application.service";





@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor( private appservice: ApplicationService,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.appservice.getToken();

        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}
