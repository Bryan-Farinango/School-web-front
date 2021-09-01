import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public verified: boolean;
  public errorAuth: boolean;
  public showPassword: boolean;
  public chargeImg: boolean;
  public manyRequestError: boolean;
  public userNotFound: boolean;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  objLogin = {
    email: '',
    api_key_admin: '',
  };
  constructor(
    private authSvc: AuthService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private adminService: AdminApiService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {
    this.verified = false;
    this.errorAuth = false;
    this.showPassword = false;
    this.manyRequestError = false;
    this.userNotFound = false;
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, { windowClass: 'verification-modal' });
  }

  setShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
    this.chargeImg = true;
    setTimeout(() => {
      this.chargeImg = false;
    }, 2000);
  }

  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }

  async onLogin(form: any, content: any) {
    if (form.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.objLogin.email = email;
    this.objLogin.api_key_admin = environment.apiKeyAdmin;
    try {
      const user = await this.authSvc.login(email, password);
      if (!user.code) {
        if (user.user.emailVerified) {
          localStorage.setItem('usuario_email', email);
          this.adminService.loginUserMongo(this.objLogin).subscribe(
            (result) => {
              if (result.resultado == true) {
                //localStorage.setItem('rol', result.objeto.rol);
                localStorage.setItem('usuario_id', result.objeto.user_id);
                if (result.objeto.rol === 'Administrador') {
                  this.router.navigate(['/home/students-request']);
                } else if (result.objeto.rol === 'Profesor') {
                  this.router.navigate(['/teacher-page/techer-students']);
                } else if (result.objeto.rol === 'Padre') {
                  this.router.navigate(['/user-page/create-inscription']);
                }
              } else {
                this.showAlert(result.mensaje, 'Error');
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.open(content);
        }
      } else {
        if (
          user.code == 'auth/wrong-password' ||
          user.code == 'auth/user-not-found'
        ) {
          this.errorAuth = true;
        }
        if (user.code == 'auth/too-many-requests') {
          this.manyRequestError = true;
        }
        if (user.code == 'auth/user-not-found') {
          this.userNotFound = true;
          console.log('ingreso aqui', this.userNotFound);
        }
      }
    } catch (error) {}
  }
}
