import { Component, OnInit } from '@angular/core';
import { AddSessionService } from '../add-session.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { RegService } from '../reg.service';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var jquery: any; 
declare var $ :any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  myForm: FormGroup; 
  id: FormControl;
  title: FormControl; 
  description: FormControl; 
  time: FormControl; 
  day: FormControl; 
  max_people: FormControl; 

  regUsers = []
  sessionData = {}
  sessions = []
  todays_session = []
  todays_regUsers = []
  selectedData = []
  reg = []
  selsectedSession :any;
  session_id : string
  deleteStatus : string
  redirectUrl : string
  private today = new Date().toLocaleString('en-us', {  weekday: 'long' });
  private regDay = new Date().toLocaleDateString('nb-no', {year: "numeric", month : "2-digit", day : "numeric"})
  constructor(private _addService: AddSessionService, private _router: Router, private _sessionService: SessionService, private location : Location, private _regService : RegService) { }

  ngOnInit() {
    this.fetchSessions()
    this.createControls(); 
    this.createEditForm(); 
    this.getRegUsers();
    
  }
  createControls(){
    this.id = new FormControl();
    this.title = new FormControl(); 
    this.description = new FormControl();
    this.time = new FormControl(); 
    this.day = new FormControl(); 
    this.max_people = new FormControl(); 
  }
  createEditForm(){
    this.myForm = new FormGroup({
      id: this.id,
      title: this.title, 
      description: this.description, 
      time: this.time, 
      day: this.day, 
      max_people: this.max_people
    });

  }

  getRegUsers(){
    this._regService.getRegUsers()
    .subscribe(
      res => {
        if(res){
          this.regUsers = res
          // console.log(this.regUsers)
          for(let entry of this.regUsers){
            // console.log(entry)
            var day = entry.regDate.split('T')[0]
            if( day.split('-').reverse().join('/') === this.regDay.split('.').join('/')){
              // console.log(entry)
              this.todays_regUsers.push(entry);
            }
            
            // console.log(day.split('-').reverse().join('/'))
            // console.log(this.regDay.split('.').join('/'))
            // console.log(new Date().getDay())
          }
        }
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
          // console.log(res)
          this.pageRefresh()
        }
      },
      err => console.log(err)
    )
    
    
  }
  deleteSessionModal(data){
    this.selectedData = data
    $("#modal-view-session").modal("show");
    // console.log(this.selectedData)
  }
  deleteSessionById(id){
    this.session_id = id
    this._sessionService.deleteSession(id)
    .subscribe(
      res =>{
        console.log("Session deleted successfully")
        this.pageRefresh()
      },
      err => console.log(err)
    )
    this.pageRefresh()
  }
  pageRefresh() {
    location.reload();
 }
 fetchSessions(){
  this._sessionService.getSessions()
      .subscribe(
        res => {
          this.sessions = res
          // console.log(this.sessions.length)
          for(let entry of this.sessions){
            // console.log(entry)
            if( entry.day === this.today){
              this.todays_session.push(entry)
            }
          }
          // console.log(this.todays_session)
        },
        err => console.log(err)
      )
}
seeBookingbtnClick(data : any){
  // console.log("See booking clicked");
  var checked_reg = []
  this.selectedData = data;
  // console.log(this.selectedData._id)
  for(let entry of this.todays_regUsers){
    if(entry.sessionId === this.selectedData._id){
      // console.log(entry)
      checked_reg.push(entry)
    }
  }
  this.reg = checked_reg
  $("#modal-view").modal('show');

}
editSessionModal(data : any){
  this.selectedData = data
  this.myForm.setValue({
    id: data._id,
    title: data.title,
    description: data.description,
    time: data.time,
    day: data.day,
    max_people: data.max_people
  })
  $("#modal-edit-session").modal("show");
  console.log("Edit session clicked")
}
saveUpdates(){
  if(this.myForm.valid){
    var data = <any> this.myForm.value; 
    console.log('form data..');
    console.log(data);
    this._sessionService.updateSession(data)
    .subscribe(res =>{
      this.selsectedSession.title = data.title; 
      this.selsectedSession.description = data.description; 
      this.selsectedSession.time = data.time;
      this.selsectedSession.day = data.day; 
      this.selsectedSession.max_people = data.max_people; 
      $('#modal-edit-session').modal('hide'); 
      this.pageRefresh()
    });
    this.pageRefresh()
  }
} 

}
