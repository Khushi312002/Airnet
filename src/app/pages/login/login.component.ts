import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, doc, getDocs, query, where, Firestore, getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  phoneNumber!: string;
  otp!: string;
  verificationInProgress = false;
  active = 1;

  constructor(

    private authService: AuthService,
    private router: Router,
    private db: Firestore,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  onOtpChange(event: any) {
    const otpValue: string = event;
    if (otpValue.length === 6) {
      console.log('OTP is complete:', otpValue);
      this.otp = otpValue;
      // const nextSection = this.elementRef.nativeElement.querySelector('#NatureOfTrip');
      // nextSection.scrollIntoView({ behavior: 'smooth' });
      // Perform any additional actions with the complete OTP
    }
  }

  sendOtp() {
    this.verificationInProgress = true;
    this.authService.sendOtp(this.phoneNumber)
      .then((result) => {
        console.log(result);
        console.log('OTP sent successfully');
        this.verificationInProgress = false
        this.router.navigate(['/otp']);
        this.active = 2;
      })
      .catch((error) => {
        this.verificationInProgress = false
        console.error('Error sending OTP:', error);
      })
  }

  verifyOtp() {
    this.verificationInProgress = true;
    this.authService.verifyOtp(this.otp)
      .then((user) => {
        console.log('OTP verified successfully for user:', user);
        this.verificationInProgress = false;
        this.router.navigate(['/destination']);
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        this.verificationInProgress = false;
      })
      .finally(() => {
      });
  }


  async loginWithPhoneNumber(phoneNumber: string): Promise<any> {
    // try {

    const docRef = doc(this.db, "numbers", "numbers");
    const phoneNumbersList: string[] = ((await getDoc(docRef)).data() ?? {})['phoneNumbersList'] ?? [];
    const numberExists = phoneNumbersList.some((element) => element === phoneNumber);

    if (numberExists) {
      this.sendOtp();
    } else {
      this.toastr.error('Number does not exist.', 'Warning')
      throw new Error("Number does not exist");
      // this.snackbar.open("Something went wrong", "", {
      //   duration: 2500,
      //   panelClass: ["alert", "alert-danger"],
      // });  
    }
  }
}
