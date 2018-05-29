import { Component, OnInit } from '@angular/core';
import { AddSessionService } from '../add-session.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  sessionData = {}
  sessions = []
  todays_session = []
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' })
  constructor(private _addService: AddSessionService, private _router: Router, private _sessionService: SessionService) { }

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
  
  addSession(){

    
    // console.log(this.sessionData) 
    this._addService.addSession(this.sessionData)
    .subscribe(
      res =>{
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
