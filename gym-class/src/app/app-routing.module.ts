import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionRegisterComponent } from './session-register/session-register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path : '',
        redirectTo: '/sessions',
        pathMatch : 'full'

    },
    {
        path: 'sessions',
        component: SessionsComponent
    },
    {
        path: 'sessions/register',
        component: SessionRegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'admin',
        component : AdminComponent
    },
    {
        path: 'register',
        component : RegisterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }