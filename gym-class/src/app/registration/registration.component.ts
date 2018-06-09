import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegService } from '../reg.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  myForm: FormGroup; 
  username: FormControl;
  sessionId: FormControl; 
  phonenumber: FormControl; 
  regDate: FormControl; 

  constructor(private _sessionService: SessionService, private _router: Router, private _regService: RegService) { }
  regData = []
  regSessions = []

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  todays_session = []
  date : Date
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' })


  createControls(){
    this.username = new FormControl()
    this.sessionId = new FormControl()
    this.phonenumber = new FormControl()
    this.regDate = new FormControl()
  }
  createForm(){
    this.myForm = new FormGroup({
      username : this.username,
      phonenumber : this.phonenumber,
      sessionId : this.sessionId,
      regDate : this.regDate
    })
  }

  ngOnInit() {
    this.createControls()
    this.createForm()
    this.date = new Date()
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
    if(this.myForm.valid){
      this.regData = this.myForm.value
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
    else{
      console.log("FORM INVALID")
    }
  }
  

}
