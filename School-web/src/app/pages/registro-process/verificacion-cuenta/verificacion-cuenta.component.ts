import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verificacion-cuenta',
  templateUrl: './verificacion-cuenta.component.html',
  styleUrls: ['./verificacion-cuenta.component.scss'],
  providers: [AuthService],
})
export class VerificacionCuentaComponent implements OnInit {
  public code: string;
  public stateVerification: boolean;
  public titlePage: string;
  public subTitlePage: string;
  public textPage: string;
  constructor(private authSvc: AuthService, private route: ActivatedRoute) {
    this.stateVerification = false;
    this.code = this.route.snapshot.queryParams.oobCode;
    this.titlePage = '';
    this.subTitlePage = '';
    this.textPage = '';
  }

  ngOnInit(): void {
    this.validateAccount();
  }

  async validateAccount() {
    try {
      await this.authSvc.validateAccount(this.code);
      this.stateVerification = true;
      this.titlePage = '¡Listo!';
      this.subTitlePage = 'Tu cuenta se encuentra activada.';
      this.textPage = 'Ya puedes disfrutar de nuestros servicios';
    } catch (error) {
      console.log(error);
      this.stateVerification = false;
      this.titlePage = '¡Ooops!';
      this.subTitlePage =
        'Hubo un error al activar tu cuenta o ya se encuentra activada.';
      this.textPage = '¿Necesitas un nuevo link de activación?';
    }
  }

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }
}
