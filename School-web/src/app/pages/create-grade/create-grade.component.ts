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
  selector: 'app-create-grade',
  templateUrl: './create-grade.component.html',
  styleUrls: ['./create-grade.component.scss'],
})
export class CreateGradeComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  hide = true;
  public showPassword: boolean;
  public emailExist: boolean;
  public message: string;
  public successful: boolean;
  dataObjRegister = {
    nombre_grado: '',
    jornada: '',
    descripcion: '',
    rango_edad: '',
  };

  gradeForm = new FormGroup({
    name: new FormControl(''),
    jornada: new FormControl(''),
    description: new FormControl(''),
    ageRange: new FormControl(''),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private gradeService: AdminApiService,
    private toastr: ToastrService
  ) {
    this.showPassword = false;
    this.emailExist = false;
    this.successful = true;
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

  async onCreateGrade(form: any) {
    if (form.invalid) {
      return;
    }

    const { name, jornada, description, ageRange } = this.gradeForm.value;
    this.dataObjRegister.nombre_grado = name;
    this.dataObjRegister.jornada = jornada;
    this.dataObjRegister.descripcion = description;
    this.dataObjRegister.rango_edad = ageRange;

    try {
      const grade = this.gradeService
        .createGrade(this.dataObjRegister)
        .subscribe(
          (result) => {
            if (result.resultado == true) {
              this.showSuccess('Grado creado correctamente.', 'Listo');
              this.successful = true;
              this.formDirective.resetForm();
            } else {
              this.successful = false;
              this.message = result.mensaje;
              this.showAlert('El grado ya existe', 'Error');
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {}
  }
}
