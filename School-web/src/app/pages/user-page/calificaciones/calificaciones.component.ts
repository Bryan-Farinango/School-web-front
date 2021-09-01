import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss'],
})
export class CalificacionesComponent implements OnInit {
  public responseNotas: any;
  dataObjGetStudents = {
    usuario_id: '',
  };
  dataObjGetCalificaciones = {
    grado_id: 'todos',
    profesor_id: 'todos',
    estudiante_id: 'todos',
    materia_id: 'todos',
    estado: 'todos',
    usuario_id: '',
  };
  searchForm = new FormGroup({
    student: new FormControl(''),
  });
  public responseStudents: any;
  constructor(
    public adminService: AdminApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.search();
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
  getStudents() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjGetStudents.usuario_id = id;
    this.adminService.getStudents(this.dataObjGetStudents).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseStudents = result.objeto;
          console.log(this.responseStudents);
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    const { student } = this.searchForm.value;

    if (student == '') {
      this.dataObjGetCalificaciones.estudiante_id = 'todos';
    } else {
      this.dataObjGetCalificaciones.estudiante_id = student;
    }

    this.dataObjGetCalificaciones.usuario_id = localStorage.getItem(
      'usuario_id'
    );
    console.log('filtro de busqueda', this.dataObjGetCalificaciones);
    this.adminService.getNotas(this.dataObjGetCalificaciones).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseNotas = result.calificaciones;
          console.log('notas finales: ', this.responseNotas);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
