import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegService } from '../reg.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private _sessionService: SessionService, private _router: Router, private _regService: RegService) { }
  regData = {}
  regSessions = []

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  todays_session = []
  date : string
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' })


  ngOnInit() {
    this.date = new Date().toLocaleString()
    this._sessionService.getRegisterSessions()
    .subscribe(
      res => {
        this.regSessions = res
        for(let entry of this.regSessions){
          // console.log(entry)
          if( entry.day === this.today){
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

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(9000)
    ).subscribe(() => {this.successMessage = null,
      this._router.navigate(['/sessions'])});

  }

  registration(){
    console.log(this.regData)
    this._regService.regSession(this.regData)
    .subscribe(
      res => {
        console.log(res.username)
        this._success.next(` Dear ${res.username}, you have successfully registered for this session. Make sure to confirm 1 hour before the session starts.`);
      },
      err => console.log(err)
    )
  }
  

}
