import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AddSessionService {

  private _addSessionUrl = "http://localhost:3000/api/session/add"
  constructor(private http: HttpClient, private _router: Router) { }

  addSession(add_session){
    return this.http.post<any>(this._addSessionUrl, add_session)
  }
}
