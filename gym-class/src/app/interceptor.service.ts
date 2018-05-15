import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from "@angular/common/http";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InterceptorService  implements HttpInterceptor {

  constructor(private injector: Injector) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    let _authService = this.injector.get(AuthService)

    const token = _authService.getToken()
    if(_authService.getToken()){

    
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    })
    return next.handle(tokenizedReq)
  } else {
    return next.handle(req);
  }
}

}
