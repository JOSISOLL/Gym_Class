import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = []
  constructor(private _sessionService: SessionService) { }

  ngOnInit() {

    this._sessionService.getSessions()
      .subscribe(
        res => this.sessions = res,
        err => console.log(err)
      )
  }

}
