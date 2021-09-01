import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificacion-correo',
  templateUrl: './verificacion-correo.component.html',
  styleUrls: ['./verificacion-correo.component.scss'],
  providers: [AuthService],
})
export class VerificacionCorreoComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public chargeImg: boolean;

  constructor(private authSvc: AuthService) {
    this.chargeImg = false;
  }

  ngOnInit(): void {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
    this.chargeImg = true;
    setTimeout(() => {
      this.chargeImg = false;
    }, 2000);
  }
}
