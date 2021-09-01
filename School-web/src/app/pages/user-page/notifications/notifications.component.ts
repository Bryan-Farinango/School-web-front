import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  dataObjGetNotificacion = {
    usuario_id: '',
  };

  dataObjDeleteNotificacion = {
    notificacion_id: '',
  };
  public responseProcess: any;
  constructor(
    public adminService: AdminApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
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

  getNotifications() {
    this.dataObjGetNotificacion.usuario_id = localStorage.getItem('usuario_id');
    this.adminService.getNotification(this.dataObjGetNotificacion).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseProcess = result.notificaciones;
          console.log('materias', this.responseProcess);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNotification(id: any) {
    this.dataObjDeleteNotificacion.notificacion_id = id;
    this.adminService
      .deleteNotificacion(this.dataObjDeleteNotificacion)
      .subscribe(
        (result) => {
          if (result.resultado == true) {
            this.getNotifications();
            this.showSuccess('Notificación Eliminada', 'Listo');
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
