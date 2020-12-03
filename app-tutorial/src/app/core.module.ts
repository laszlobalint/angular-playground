import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
