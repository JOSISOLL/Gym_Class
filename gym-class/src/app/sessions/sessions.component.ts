import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = []
  todays_session = []
  constructor(private _sessionService: SessionService) { }
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' })

  ngOnInit() {

    this._sessionService.getSessions()
      .subscribe(
        res => {
          this.sessions = res
          console.log(this.sessions.length)
          for(let entry of this.sessions){
            // console.log(entry)
            if( entry.day === this.today){
              this.todays_session.push(entry)
            }
          }
          console.log(this.todays_session)
        },
        err => console.log(err)
      )
  }

}
