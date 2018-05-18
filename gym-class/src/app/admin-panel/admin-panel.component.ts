import { Component, OnInit } from '@angular/core';
import { AddSessionService } from '../add-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  sessionData = {}
  constructor(private _addService: AddSessionService, private _router: Router) { }

  ngOnInit() {
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
