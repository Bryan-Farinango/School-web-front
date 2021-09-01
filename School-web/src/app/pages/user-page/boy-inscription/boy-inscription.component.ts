import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boy-inscription',
  templateUrl: './boy-inscription.component.html',
  styleUrls: ['./boy-inscription.component.scss'],
})
export class BoyInscriptionComponent implements OnInit {
  public responseStudents: any;
  public matricula: boolean;
  public step: any;
  dataObjGetGrades = {
    api_key_admin: '',
  };
  dataObjGetStudents = {
    usuario_id: '',
  };
  dataObbjDelete = {
    usuario_id: '',
    estudiante_id: '',
  };
  public message: string;
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;
  public responseProcess: any;
  dataObjRegister = {
    nombres: '',
    apellidos: '',
    identificacion: '',
    edad: '',
    genero: '',
    nombre_grado: '',
    jornada: '',
    usuario_id: '',
  };
  roleOptions = ['Femenino', 'Masculino'];
  gradeOptions = [];
  sectionOptions = ['Mañana', 'Tarde'];
  passwordInputType = 'password';
  objLogin = {
    usuario_id: '',
    api_key_admin: '',
  };
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private adminService: AdminApiService,
    private toastr: ToastrService,
    private authSvc: AuthService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getStudents();
    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      identification: [null, Validators.required],
      age: [null, Validators.required],
      male: [null, Validators.required],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      grade: [null, Validators.required],
      section: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });

    this.dataObjGetGrades.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getGrades(this.dataObjGetGrades).subscribe(
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

  onRegister() {
    this.step = 2;
  }

  submit() {
    const {
      name,
      lastName,
      identification,
      age,
      male,
    } = this.verticalAccountFormGroup.value;

    const { grade, section } = this.verticalPasswordFormGroup.value;

    this.dataObjRegister.nombres = name;
    this.dataObjRegister.apellidos = lastName;
    this.dataObjRegister.identificacion = identification;
    this.dataObjRegister.edad = age;
    this.dataObjRegister.genero = male;
    this.dataObjRegister.nombre_grado = grade;
    this.dataObjRegister.jornada = section;
    this.dataObjRegister.usuario_id = localStorage.getItem('usuario_id');

    this.adminService.createStudent(this.dataObjRegister).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Inscripción correcta.', 'Listo');
          this.getUserInfo();
          this.getStudents();
          this.step = 3;
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

  getUserInfo() {
    const id = localStorage.getItem('usuario_id');
    this.objLogin.usuario_id = id;
    this.objLogin.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getUserInfo(this.objLogin).subscribe(
      (result) => {
        if (result.resultado == true) {
          if (result.objeto.matricula === true) {
            this.matricula = true;
            this.step = 3;
          } else {
            this.step = 1;
          }
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStudents() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjGetStudents.usuario_id = id;
    this.adminService.getStudents(this.dataObjGetStudents).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseStudents = result.objeto;
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delSolicitud(student_id: any) {
    const id = localStorage.getItem('usuario_id');
    this.dataObbjDelete.usuario_id = id;
    this.dataObbjDelete.estudiante_id = student_id;
    this.adminService.deleteSolicitud(this.dataObbjDelete).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Solicitud Eliminada.', 'Listo');
          this.getUserInfo();
          this.getStudents();
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
