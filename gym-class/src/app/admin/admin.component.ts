import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminLoginData = {}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  adminLogin(){
    this._auth.adminLogin(this.adminLoginData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )

  }

}
