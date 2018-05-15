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
  constructor(private _sessionService: SessionService, private _router: Router) { }

  ngOnInit() {
    this._sessionService.getRegisterSessions()
    .subscribe(
      res => this.registerSessions = res,
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
