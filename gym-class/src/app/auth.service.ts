import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _adminUrl = "http://localhost:3000/api/admin"

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {

    return this.http.post<any>(this._registerUrl, user)

  }
  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }
  adminLogin(admin){
    return this.http.post<any>(this._adminUrl,admin)
  }
  userLoggedIn(){
    return !!localStorage.getItem('token')
  }
  loggedIn(){
    if (this.adminLoggedIn()){
      return !!localStorage.getItem('admin_token')
    } else {
      return !!localStorage.getItem('token')
    }
  }
  adminLoggedIn(){
    return !!localStorage.getItem('admin_token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  userLogout(){
    if(this.adminLoggedIn()){
      localStorage.removeItem('admin_token')
      this._router.navigate(['/admin'])
    } else {
      localStorage.removeItem('token')
      this._router.navigate(['/sessions'])
    }

  }

}
