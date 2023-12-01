import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { browserSessionPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './Services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
// import { NgOtpInputModule } from 'ng-otp-input';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { TermCondComponent } from './pages/term-cond/term-cond.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { RefundComponent } from './pages/refund/refund.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFire} from "@angular/fire/auth"

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    HttpClientModule,
    MatSnackBarModule,
    // NgOtpInputModule,
    ComponentsModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    AngularFirestoreModule

  ],
  declarations: [
    AngularFireModule.initializeApp(environment.firebase),
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ComingSoonComponent,
    PoliciesComponent,
    TermCondComponent,
    ShippingComponent,
    RefundComponent,
    ContactUsComponent,
    PricingComponent,
    FooterComponent,
    NavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
