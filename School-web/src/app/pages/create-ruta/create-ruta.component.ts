import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';

@Component({
  selector: 'app-create-ruta',
  templateUrl: './create-ruta.component.html',
  styleUrls: ['./create-ruta.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class CreateRutaComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  hide = true;
  public showPassword: boolean;
  public emailExist: boolean;
  dataObjRegister = {
    titulo_ruta: '',
    numero_ruta: '',
    ciudad: '',
    sector_1: '',
    sector_2: '',
    sector_3: '',
    transportista_id: '',
  };
  rutaForm = new FormGroup({
    title: new FormControl(''),
    number: new FormControl(''),
    city: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    address3: new FormControl(''),
  });
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
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  async onRegister(form: any) {
    if (form.invalid) {
      return;
    }
    const {
      title,
      number,
      city,
      address1,
      address2,
      address3,
    } = this.rutaForm.value;

    this.dataObjRegister.titulo_ruta = title;
    this.dataObjRegister.numero_ruta = number;
    this.dataObjRegister.ciudad = city;
    this.dataObjRegister.sector_1 = address1;
    this.dataObjRegister.sector_2 = address2;
    this.dataObjRegister.sector_3 = address3;
    this.dataObjRegister.transportista_id = 'empty';

    try {
      const ruta = this.adminService.createRuta(this.dataObjRegister).subscribe(
        (result) => {
          if (result.resultado == true) {
            this.showSuccess('Ruta creada correctamente.', 'Listo');
            this.formDirective.resetForm();
          } else {
            this.showAlert('La ruta ya existe', 'Error');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {}
  }
}
