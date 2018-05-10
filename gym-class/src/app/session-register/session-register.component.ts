import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-register',
  templateUrl: './session-register.component.html',
  styleUrls: ['./session-register.component.scss']
})
export class SessionRegisterComponent implements OnInit {

  registerSessions = []
  constructor(private _sessionService: SessionService) { }

  ngOnInit() {
    this._sessionService.getRegisterSessions()
    .subscribe(
      res => this.registerSessions = res,
      err => console.log(err)
    )
  }

}
