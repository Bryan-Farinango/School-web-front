import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-transporte',
  templateUrl: './user-transporte.component.html',
  styleUrls: ['./user-transporte.component.scss'],
})
export class UserTransporteComponent implements OnInit {
  @ViewChild('contentTransporte', { static: false })
  modalCreate: TemplateRef<void>;
  dataObjMovileUser = {
    usuario_id: '',
  };
  dataObjGetStudent = {
    usuario_id: '',
  };
  dataObGetRutas = {
    api_key_admin: '',
  };

  dataObjMatricular = {
    estudiante_id: '',
    ruta_id: '',
  };
  step: any;
  responseMovile: any;
  responseRutas: any;
  currentDate = new Date();
  responseInscritos: any;
  userMobile: boolean;
  transporteForm = new FormGroup({
    student: new FormControl(''),
  });
  public auxRutaId: any;
  responseStudents: any;
  constructor(
    private datePipe: DatePipe,
    public adminService: AdminApiService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.getUserMovileInfo();
  }

  ngOnInit(): void {
    this.getStudents();
    this.getRutas();
  }

  openModalCrear(): void {
    this.modalService.open(this.modalCreate, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'teacher-modal',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  onCreate(idRuta: any) {
    this.auxRutaId = idRuta;
    this.openModalCrear();
  }

  getUserMovileInfo() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjMovileUser.usuario_id = id;
    this.adminService.getMovilUser(this.dataObjMovileUser).subscribe(
      (result) => {
        if (result.resultado == true) {
          if (result.objeto.usuario_existe === false) {
            this.step = 1;
          } else {
            this.step = 2;
          }
          this.responseMovile = result.objeto;

          console.log(this.responseMovile);
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStudents() {
    this.dataObjGetStudent.usuario_id = localStorage.getItem('usuario_id');
    this.adminService.getStudentTransporte(this.dataObjGetStudent).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseStudents = result.estudiantes;
          console.log(this.responseStudents);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRutas() {
    this.dataObGetRutas.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getRutasForUser(this.dataObGetRutas).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseRutas = result.rutas;
          this.responseInscritos = result.inscritos;
          console.log(this.responseRutas);
          console.log('estos son los inscritos', result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

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
  onMatricular(form: any) {
    if (form.invalid) {
      this.showAlert('Seleccione un estudiante ', 'Error');
      return;
    }

    const { student } = this.transporteForm.value;
    console.log('student', student);
    this.dataObjMatricular.estudiante_id = student;
    this.dataObjMatricular.ruta_id = this.auxRutaId;

    this.adminService.matricularEstudiante(this.dataObjMatricular).subscribe(
      (result) => {
        if (result.resultado) {
          this.showSuccess('Estudiante Matriculado.', 'Listo');
          this.showSuccess(
            'Comunicate con el número de contacto de la Ruta para horarios y pagos.',
            'Listo'
          );
          this.transporteForm.get('student').reset('');
          this.getRutas();
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
