
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, query, where, getDoc, doc } from '@angular/fire/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, Auth, ConfirmationResult, UserCredential, user, onAuthStateChanged, } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  phoneNumber: any;
  reCaptchaVerifier!: any;
  confirmationResult!: ConfirmationResult;
  user: any;
  isLoggedIn = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore,
    private db: Firestore,
    // private afAuth: AngularFireAuth,
  ) {

    // auth.onAuthStateChanged((user) => {
    //   if (user !== null) {
    //     // this.router.navigate(['/'])
    //   } else {
    //     // this.router.navigate(['/login'])
    //   }
    // })


  }
  listenForAuthStateChanges(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in
        this.isLoggedIn = true;
      } else {
        // User is signed out
        this.isLoggedIn = false;
      }
    });
  }

  async loginWithPhoneNumber(phoneNumber: string): Promise<any> {
    // try {

    const docRef = doc(this.db, "numbers", "numbers");
    const phoneNumbersList: string[] = ((await getDoc(docRef)).data() ?? {})['phoneNumbersList'] ?? [];
    const numberExists = phoneNumbersList.some((element) => element === phoneNumber);

    if (numberExists) {
      // this.sendOtp();
      // this.isLoggedIn = true;
    } else {

      // this.toastr.error('Number does not exist.', 'Warning')
      throw new Error("Number does not exist");
    }

  }

  // sendOtp() {
  //   this.verificationInProgress = true;
  //   this.authService.sendOtp(this.phoneNumber)
  //     .then((result) => {
  //       console.log(result);
  //       console.log('OTP sent successfully');
  //       this.verificationInProgress = false
  //       this.router.navigate(['/otp']);
  //       this.active = 2;
  //     })
  //     .catch((error) => {
  //       this.verificationInProgress = false
  //       console.error('Error sending OTP:', error);
  //     })
  // }

  sendOtp(phoneNumber: string): Promise<any> {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      // 'callback': (response) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   // ...
      // },

      // 'expired-callback': () => {
      //   // Response expired. Ask user to solve reCAPTCHA again.
      //   // ...
      // }
    }, this.auth);
    return new Promise((resolve, reject) => {
      return signInWithPhoneNumber(this.auth, "+91" + phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // Save the confirmation result for later use
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }, (error) => {
          console.error('Error sending OTP:', error);
          reject(error);
        });
    })
  }

  verifyOtp(otp: string): Promise<any> {
    console.log(otp);

    if (this.confirmationResult !== null) {
      return this.confirmationResult.confirm(otp)
        .then((userCredential: UserCredential) => {
          // User successfully verified
          const user = userCredential.user;
          this.isLoggedIn = true;
          return user;
        })
        .catch((error: any) => {
          console.error('Error verifying OTP:', error);
          throw error;
        });
    } else {
      throw new Error('Confirmation result not found in local storage.');
    }
  }

  signOut(): Promise<void> {
    this.isLoggedIn = false;
    return this.auth.signOut();

  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}
