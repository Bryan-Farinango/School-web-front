import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public message: string;
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;
  responseProcess: any;
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
      rol: [null, Validators.required],
      phone: [null, Validators.required],
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
  async submit() {
    const {
      name,
      lastName,
      email,
      rol,
      phone,
    } = this.verticalAccountFormGroup.value;

    const { password, passwordConfirm } = this.verticalPasswordFormGroup.value;

    this.dataObjRegister.nombres = name;
    this.dataObjRegister.apellidos = lastName;
    this.dataObjRegister.email = email;
    this.dataObjRegister.rol = rol;
    this.dataObjRegister.telefono = phone;
    this.dataObjRegister.password = passwordConfirm;
    this.dataObjRegister.api_key_admin = environment.apiKeyAdmin;
    this.dataObjRegister.origen = 'admin';
    this.dataObjRegister.temporal_password = passwordConfirm;

    try {
      const user = await this.authSvc.register(email, passwordConfirm);

      if (user.code == 'auth/email-already-in-use') {
        this.showAlert('El usuario ya existe', 'Error');
      } else if (user) {
        this.dataObjRegister.firebase_uid = user.user.uid;

        this.adminService.createUser(this.dataObjRegister).subscribe(
          (result) => {
            if (result.resultado == true) {
              this.showSuccess('Usuario creado correctamente.', 'Listo');
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
    } catch (error) {}
  }
}
