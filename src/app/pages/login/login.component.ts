import { Component, OnInit } from '@angular/core';

import {FormsModule}from '@angular/forms'
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string ='';
  password:string="";

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {

    if(this.auth.isLoggedIn()){
      this.router.navigate(['pricing']);
    }
  }

  login(){

    if(this.email==''){
      alert("email missing");
      return
    }


    if(this.password==''){
      alert("password missing");
      return
    }

    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';

  }

  signInWithGoogle(){

    this.auth.signInWithGoogle()
  }

}
