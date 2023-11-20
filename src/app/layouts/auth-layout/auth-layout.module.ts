import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from '../../pages/home/home.component';
import { OtpComponent } from '../../pages/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgOtpInputModule,
    // NgbModule
    ToastrModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent
  ]
})
export class AuthLayoutModule { }
