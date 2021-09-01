import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
  public isLogged = false;
  public user: any;
  email: any;
  responseInfo: any;
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

  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();

    if (this.user) {
      this.isLogged = true;
    }

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
