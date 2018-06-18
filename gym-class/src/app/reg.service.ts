import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegService {

  private _regUrl = "http://localhost:3000/api/sessions/registration"
  private _regUsersUrl = "http://localhost:3000/api/sessions/registerd"
  constructor(private http: HttpClient, private _router : Router) { }

  regSession(session_reg){
    return this.http.post<any>(this._regUrl, session_reg)
  }
  getRegUsers(){
    return this.http.get<any>(this._regUsersUrl)
  }

}
