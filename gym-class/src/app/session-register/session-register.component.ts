import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-register',
  templateUrl: './session-register.component.html',
  styleUrls: ['./session-register.component.scss']
})
export class SessionRegisterComponent implements OnInit {

  registerSessions = []
  todays_session = []
  private today;
  staticAlertClosed = false;
  constructor(private _sessionService: SessionService, private _router: Router) { }

  ngOnInit() {
    this.today = new Date().toLocaleString('en-us', {  weekday: 'long' })
    this._sessionService.getRegisterSessions()
    .subscribe(
      res => {
        this.registerSessions = res
        for(let entry of this.registerSessions){
          // console.log(entry)
          if( entry.days === this.today){
            this.todays_session.push(entry)
          }
        }
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
    setTimeout(() => this.staticAlertClosed = true, 20000);
  }

}
