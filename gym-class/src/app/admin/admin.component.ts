import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminLoginData = {}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  adminLogin(){
    this._auth.adminLogin(this.adminLoginData)
    .subscribe(
      res => {
        localStorage.setItem('admin_token', res.token)
        console.log(res)
        this._router.navigate(['/admin_panel'])
      },
      err => console.log(err)
    )

  }

}
