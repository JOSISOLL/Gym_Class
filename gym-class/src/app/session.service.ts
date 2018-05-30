import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SessionService {

  private _sessionsUrl = "http://localhost:3000/api/sessions"; 
  private _sessionRegisterUrl = "http://localhost:3000/api/sessions/register";
  private _sessionAdduUrl = "http://localhost:3000/api/sessions/add";
  private _sessionDeleteUrl = "http://localhost:3000/api/sessions/delete/";


  constructor(private http: HttpClient) { }

  getSessions(){
    return this.http.get<any>(this._sessionsUrl)
  }
  
  getRegisterSessions(){
    return this.http.get<any>(this._sessionRegisterUrl)
  }
  addSession(session){
    return this.http.post<any>(this._sessionAdduUrl, session)
  }
  deleteSession(id : string){
    console.log(this._sessionDeleteUrl.concat(id))
    return this.http.delete<any>(this._sessionDeleteUrl.concat(id))
  }



}
