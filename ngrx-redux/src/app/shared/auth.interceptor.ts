import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/switchMap';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../components/auth/store/auth.reducers';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted: ', req);
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);
      });
  }
}