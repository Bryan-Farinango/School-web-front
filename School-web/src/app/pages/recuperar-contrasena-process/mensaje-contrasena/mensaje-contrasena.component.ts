import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje-contrasena',
  templateUrl: './mensaje-contrasena.component.html',
  styleUrls: ['./mensaje-contrasena.component.scss'],
  providers: [AuthService],
})
export class MensajeContrasenaComponent implements OnInit {
  public nombre2: string;
  public emailUser = '';
  public errorResetPassword: boolean;
  public chargeImg: boolean;
  constructor(private authSvc: AuthService, private route: ActivatedRoute) {
    this.nombre2 = '';
    this.errorResetPassword = false;
    this.chargeImg = false;
  }

  ngOnInit(): void {
    this.emailUser = localStorage.getItem('emailUser');
  }

  onResendPassword() {
    try {
      if (this.emailUser) {
        this.chargeImg = true;
        setTimeout(() => {
          this.chargeImg = false;
        }, 2000);
        this.authSvc.resetPassword(this.emailUser);
      }
    } catch (error) {
      this.errorResetPassword = true;
    }
  }

  saveUser(field: string) {
    this.nombre2 = field;
  }
}
