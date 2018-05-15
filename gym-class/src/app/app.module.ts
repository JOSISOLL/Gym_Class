import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SessionRegisterComponent } from './session-register/session-register.component';
import { SessionsComponent } from './sessions/sessions.component';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin-guard.guard';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    SessionRegisterComponent,
    SessionsComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, SessionService, AuthGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
