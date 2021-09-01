import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {
  public isLogged = false;
  public user: any;
  objLogin = {
    usuario_id: '',
    api_key_admin: '',
  };
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private adminService: AdminApiService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {}

  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();

    if (this.user) {
      this.isLogged = true;
    }

    this.getUserInfo();
  }
  async onLogout() {
    try {
      await this.authSvc.logout();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {}
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
  getUserInfo() {
    const id = localStorage.getItem('usuario_id');
    this.objLogin.usuario_id = id;
    this.objLogin.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getUserInfo(this.objLogin).subscribe(
      (result) => {
        if (result.resultado == true) {
          if (result.objeto.matricula === true) {
            this.dataService.matricula = true;
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
}
