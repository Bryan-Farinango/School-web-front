import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent implements OnInit {
  public message: string;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  responseProcess: any;
  dataObjRegister = {
    nombre_asignatura: '',
    descripcion: '',
    anio_escolar: '',
    grado: '',
  };
  dataObjGetGrades = {
    api_key_admin: '',
  };
  gradeOptions = [];
  yearOptions = ['2021', '2022', '2023', '2024', '2025', '2026'];

  passwordInputType = 'password';
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private subjectService: AdminApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      subjectName: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });

    this.passwordFormGroup = this.fb.group({
      grade: [null, Validators.required],
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });

    this.dataObjGetGrades.api_key_admin = environment.apiKeyAdmin;
    this.subjectService.getGrades(this.dataObjGetGrades).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseProcess = result;
          let grades = this.responseProcess.grados;
          let arr = [];
          Object.keys(grades).map(function (key) {
            arr.push(grades[key]['nombre_grado']);
            return arr;
          });
          this.gradeOptions = arr;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }

  submit() {
    const { subjectName, description, year } = this.accountFormGroup.value;
    const { grade } = this.passwordFormGroup.value;
    this.dataObjRegister.nombre_asignatura = subjectName;
    this.dataObjRegister.descripcion = description;
    this.dataObjRegister.anio_escolar = year;
    this.dataObjRegister.grado = grade;

    this.subjectService.createSubject(this.dataObjRegister).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Aignatura creada correctamente.', 'Listo');
          this.accountFormGroup.get('subjectName').setValue(' ');
          this.accountFormGroup.get('description').setValue(' ');
          this.accountFormGroup.get('year').setValue(' ');
          this.passwordFormGroup.get('grade').setValue(' ');
        } else {
          this.message = result.mensaje;
          this.showAlert(this.message, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
