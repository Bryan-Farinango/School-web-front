import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  hide = true;
  public showPassword: boolean;
  public emailExist: boolean;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    telefono: new FormControl(''),
    rol: new FormControl(''),
  });

  dataObjRegister = {
    nombres: '',
    apellidos: '',
    rol: '',
    email: '',
    telefono: '',
    password: '',
    api_key_admin: '',
    origen: '',
    temporal_password: '',
    firebase_uid: '',
  };

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private adminService: AdminApiService,
    private toastr: ToastrService
  ) {
    this.showPassword = false;
    this.emailExist = false;
  }

  setShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  async onRegister(form: any) {
    if (form.invalid) {
      return;
    }
    /*
    registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    telefono: new FormControl(''),
    rol: new FormControl(''),
  });
  */
    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
    } = this.registerForm.value;
    this.dataObjRegister.nombres = nombre;
    this.dataObjRegister.apellidos = apellido;
    this.dataObjRegister.telefono = telefono;
    this.dataObjRegister.rol = 'Padre';
    this.dataObjRegister.email = email;
    this.dataObjRegister.password = password;
    this.dataObjRegister.api_key_admin = environment.apiKeyAdmin;
    this.dataObjRegister.origen = 'register_page';

    try {
      const user = await this.authSvc.register(email, password);

      if (user.code == 'auth/email-already-in-use') {
        this.emailExist = true;
      } else if (user) {
        this.dataObjRegister.firebase_uid = user.user.uid;
        this.adminService.createUser(this.dataObjRegister).subscribe(
          (result) => {
            if (result.resultado == true) {
              this.router.navigate(['/verificacion-correo']);
            } else {
              this.showAlert(result.mensaje, 'Error');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {}
  }
}
