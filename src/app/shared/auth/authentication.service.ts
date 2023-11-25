import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        console.log(res);

        const user = res.user;
        this.ngZone.run(() => {
          // Now, immediately get the ID token for the newly created user
          user
            ?.getIdToken()
            .then((idToken) => {
              // Now you have the ID token for the newly created user

              localStorage.setItem('token', idToken);
              console.log('ID Token:', idToken);
              this.router.navigate(['/pricing']);

              // Optionally, you can use the ID token for your authentication needs
            })
            .catch((error) => {
              // Handle errors
              console.error('ID Token error:', error);
            });
        });
      },
      (err) => {
        console.log(err);
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        console.log(res);

        const user = res.user;
        this.ngZone.run(() => {
          user
            ?.getIdToken()

            .then((idToken: any) => {
              localStorage.setItem('token', idToken);
              this.router.navigate(['/pricing']);
            })
            .catch((error: any) => {
              // Handle errors
              console.error('ID Token error:', error);
            });
        });

        alert('Registration Successful');
      },
      (err) => {
        console.log(err.message);
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  signInWithGoogle() {

    var provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });


    return this.fireauth.signInWithPopup(provider).then(
      (res) => {
        console.log(res);

        const user = res.user;
        this.ngZone.run(() => {
          user
            ?.getIdToken()

            .then((idToken: any) => {
              localStorage.setItem('token', idToken);
              this.router.navigate(['/pricing']);
            })
            .catch((error: any) => {
              // Handle errors
              console.error('ID Token error:', error);
            });
        });
      },
      (err) => {
        alert(err.message);
      }
    );
  }


  // beklow all are deprecated
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}
