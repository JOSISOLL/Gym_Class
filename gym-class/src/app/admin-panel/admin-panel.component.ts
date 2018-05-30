import { Component, OnInit } from '@angular/core';
import { AddSessionService } from '../add-session.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Location } from '@angular/common';

declare var jquery: any; 
declare var $ :any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  sessionData = {}
  sessions = []
  todays_session = []
  selectedData = []
  session_id : string
  deleteStatus : string
  redirectUrl : string
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' })
  constructor(private _addService: AddSessionService, private _router: Router, private _sessionService: SessionService, private location : Location) { }

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
          if(res){
          console.log(res)
          this.pageRefresh()
        }
      },
      err => console.log(err)
    )
    
    
  }
  deleteSessionModal(data){
    this.selectedData = data
    $("#modal-view-part").modal("show");
    console.log(this.selectedData)
  }
  deleteSessionById(id){
    this.session_id = id
    this.redirectUrl = this.location.path()
    this._sessionService.deleteSession(id)
    .subscribe(
      res =>{
        console.log("Session deleted successfully")
        this.pageRefresh()
      },
      err => console.log(err)
    )
    
  }
  pageRefresh() {
    location.reload();
 }
  
}
