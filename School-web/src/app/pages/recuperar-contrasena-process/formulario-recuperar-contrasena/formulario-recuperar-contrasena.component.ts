import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-recuperar-contrasena',
  templateUrl: './formulario-recuperar-contrasena.component.html',
  styleUrls: ['./formulario-recuperar-contrasena.component.scss'],
})
export class FormularioRecuperarContrasenaComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
  hide = true;
  hide2 = true;
  public showPassword: boolean;
  public showRepeatPassword: boolean;
  public mode: string;
  public code: string;
  public apiKey: string;
  public errorAuth: boolean;
  public differentPassword: boolean;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mode = this.route.snapshot.queryParams.mode;
    this.code = this.route.snapshot.queryParams.oobCode;
    this.apiKey = this.route.snapshot.queryParams.apiKey;
    this.errorAuth = false;
    this.differentPassword = false;
    this.showPassword = false;
    this.showRepeatPassword = false;
  }

  ngOnInit(): void {}

  setShowPassword() {
    this.showPassword = !this.showPassword;
  }

  setShowRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  checkEqualPassword(newPassword: string, password: string) {
    if (newPassword !== password) {
      this.differentPassword = true;
    } else {
      this.differentPassword = false;
    }
  }

  async onResetPassword(form: any) {
    if (form.invalid) {
      return;
    }

    const { password, repeatPassword } = this.resetPasswordForm.value;

    if (password !== repeatPassword) {
      this.differentPassword = true;
      return;
    }

    try {
      await this.authSvc.sendResetPassword(this.code, password);
      this.router.navigate(['/constrasena-exitosa']);
    } catch (error) {
      this.errorAuth = true;
    }
  }
}
