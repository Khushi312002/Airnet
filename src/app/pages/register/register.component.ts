import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email:string ='';
  password:string="";

  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }



  register(){

    if(this.email==''){
      alert("email missing");
      return
    }


    if(this.password==''){
      alert("password missing");
      return
    }

    this.auth.register(this.email,this.password);
    this.email='';
    this.password='';

  }

  signInWithGoogle(){

    this.auth.signInWithGoogle()
  }

}
