import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeContrasenaComponent } from '../mensaje-contrasena/mensaje-contrasena.component';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
  providers: [AuthService, MensajeContrasenaComponent],
})
export class RecuperarContrasenaComponent implements OnInit {
  public userEmail = new FormControl('');
  public errorAuth: boolean;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private mensaje: MensajeContrasenaComponent
  ) {
    this.errorAuth = false;
  }

  ngOnInit(): void {}

  async onReset(form: any) {
    try {
      if (form.invalid) {
        return;
      }
      const email = this.userEmail.value;

      this.mensaje.saveUser(email);

      localStorage.clear();
      localStorage.setItem('emailUser', email);

      await this.authSvc.resetPassword(email);
      this.router.navigate(['/contrasena-enviada']);
      return email;
    } catch (error) {
      this.errorAuth = true;
    }
  }
}
