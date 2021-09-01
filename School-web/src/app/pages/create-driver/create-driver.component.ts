import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class CreateDriverComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;
  public message: any;
  responseProcess: any;
  dataObjRegister = {
    nombres: '',
    apellidos: '',
    email: '',
    capacidad: '',
    telefono: '',
    rol: '',
    experiencia_laboral: '',
    password: '',
    api_key_admin: '',
    temporal_password: '',
    firebase_uid: '',
  };
  dataObjRegisterDriverFirebase = {
    email: '',
    password: '',
    returnSecureToken: true,
  };
  dataObjSendVerificationEmail = {
    requestType: '',
    idToken: '',
  };
  roleOptions = ['Administrador', 'Profesor'];

  passwordInputType = 'password';
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private adminService: AdminApiService,
    private toastr: ToastrService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      capacity: [null, Validators.required],
      phone: [null, Validators.required],
      experience: [null, Validators.required],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      passwordConfirm: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
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
  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    const {
      name,
      lastName,
      email,
      capacity,
      phone,
      experience,
    } = this.verticalAccountFormGroup.value;

    const { password, passwordConfirm } = this.verticalPasswordFormGroup.value;

    this.dataObjRegister.nombres = name;
    this.dataObjRegister.apellidos = lastName;
    this.dataObjRegister.email = email;
    this.dataObjRegister.capacidad = capacity;
    this.dataObjRegister.telefono = phone;
    this.dataObjRegister.experiencia_laboral = experience;
    this.dataObjRegister.password = passwordConfirm;
    this.dataObjRegister.temporal_password = passwordConfirm;
    this.dataObjRegister.rol = 'Transportista';
    this.dataObjRegister.api_key_admin = environment.apiKeyAdmin;

    this.dataObjRegisterDriverFirebase.email = email;
    this.dataObjRegisterDriverFirebase.password = passwordConfirm;
    this.dataObjRegisterDriverFirebase.returnSecureToken = true;
    try {
      const user = this.adminService
        .createDriverWithFirebaseApi(this.dataObjRegisterDriverFirebase)
        .subscribe(
          (result) => {
            if (result.message == 'EMAIL_EXISTS') {
              this.showAlert('El usuario ya existe', 'Error');
            } else if (result.email != '') {
              const localId = result.localId;
              const idToken = result.idToken;
              this.dataObjRegister.firebase_uid = localId;
              this.dataObjSendVerificationEmail.requestType = 'VERIFY_EMAIL';
              this.dataObjSendVerificationEmail.idToken = idToken;
              this.adminService
                .sendVerificationAccountDriverWithFirebase(
                  this.dataObjSendVerificationEmail
                )
                .subscribe(
                  (result) => {
                    if (result.email != '') {
                      this.adminService
                        .createDriver(this.dataObjRegister)
                        .subscribe(
                          (result) => {
                            if (result.resultado == true) {
                              this.showSuccess(
                                'Transportista creado correctamente.',
                                'Listo'
                              );
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
                  },
                  (error) => {
                    this.showAlert(
                      'Hubo un problema, intenta mas tarde',
                      'Error'
                    );
                  }
                );
            }
          },
          (error) => {
            this.showAlert('El transportista ya existe', 'Error');
          }
        );
    } catch (error) {}
  }
}
