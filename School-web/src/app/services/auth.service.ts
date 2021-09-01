import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public errorAuth: boolean;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.errorAuth = false;
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  async sendResetPassword(code: string, password: string): Promise<void> {
    try {
      return this.afAuth.confirmPasswordReset(code, password);
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  async validateAccount(code: string): Promise<void> {
    try {
      return this.afAuth.applyActionCode(code);
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      this.manageError500(error);
      return error;
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  manageError500(error) {
    if (error.code == 'auth/internal-error') {
      this.router.navigate(['/error-500']);
    }
  }
}
