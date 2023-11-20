import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { OtpComponent } from 'src/app/pages/otp/otp.component';

export const AuthLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent },
    // { path: 'home', component: HomeComponent },

    { path: 'login', component: LoginComponent },

    { path: 'otp', component: OtpComponent },
    { path: 'register', component: RegisterComponent }
];
