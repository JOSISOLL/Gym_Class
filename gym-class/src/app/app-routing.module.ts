import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionRegisterComponent } from './session-register/session-register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin-guard.guard';

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
        component: SessionRegisterComponent,
        canActivate :  [AuthGuard]
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
        path: 'admin_panel',
        component : AdminPanelComponent,
        canActivate: [AdminGuard]
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