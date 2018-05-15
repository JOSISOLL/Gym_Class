import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
 
    constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean{
    if(this._authService.adminLoggedIn()){
      return true
    } else {
      this._router.navigate(['/admin'])
      return false
    }
  }
}

