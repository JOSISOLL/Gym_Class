import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { RegistrationComponent } from './registration/registration.component';
import { RegService } from './reg.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddSessionService } from './add-session.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    SessionRegisterComponent,
    SessionsComponent,
    AdminPanelComponent,
    RegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, SessionService, AuthGuard, AdminGuard, RegService, AddSessionService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
