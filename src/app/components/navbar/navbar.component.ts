import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    public authService: AuthService
    ) {
   
  }

  ngOnInit() {
  
  }
 
  // navigateToLogin(){
  //   this.router.navigate(['login'])
  // }

  // checkStatus(){
  //   return this.auth.isLoggedIn();
  // }
  // signout(){
  //   return this.auth.logout();
  // }

}