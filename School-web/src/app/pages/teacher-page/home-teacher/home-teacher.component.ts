import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss'],
})
export class HomeTeacherComponent implements OnInit {
  public isLogged = false;
  public user: any;
  responseInfo: any;
  email: any;
  dataObjGetUserInfo = {
    usuario_id: '',
    api_key_admin: '',
  };

  nameHeader: any;
  lastNameHeader: any;
  nameInitial: any;
  lastNameInitial: any;
  displayName: any;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public adminService: AdminApiService
  ) {}

  ngOnInit(): void {
    this.userInfo();
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
          this.email = this.responseInfo.email;
          this.nameHeader = this.responseInfo.nombres.split(' ');
          this.lastNameHeader = this.responseInfo.apellidos.split(' ');

          this.nameInitial = this.nameHeader[0].substring(0, 1);
          this.lastNameInitial = this.lastNameHeader[0].substring(0, 1);

          this.displayName = this.nameInitial.concat(
            this.lastNameInitial.toString()
          );
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
