import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  public isLogged = false;
  public user: any;
  responseInfo: any;
  dataObjGetUserInfo = {
    usuario_id: '',
    api_key_admin: '',
  };
  showRol: any;
  nameHeader: any;
  lastNameHeader: any;
  nameInitial: any;
  lastNameInitial: any;
  displayName: any;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public adminService: AdminApiService
  ) {
    this.showRol = false;
  }

  async ngOnInit() {
    this.userInfo();
    this.user = await this.authSvc.getCurrentUser();

    if (this.user) {
      this.isLogged = true;
    }
  }
  async onLogout() {
    try {
      await this.authSvc.logout();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {}
  }

  userInfo() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjGetUserInfo.usuario_id = id;
    this.dataObjGetUserInfo.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getUserInfo(this.dataObjGetUserInfo).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseInfo = result.objeto;
          this.showRol = true;
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
