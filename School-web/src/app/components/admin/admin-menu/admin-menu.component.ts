import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { environment } from 'src/environments/environment';
import { AdminApiService } from 'src/app/services/admin-api.service';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class AdminMenuComponent implements OnInit {
  public subDashboard = false;
  public transporteDashboard = false;
  responseInfo: any;
  dataObjGetUserInfo = {
    usuario_id: '',
    api_key_admin: '',
  };
  constructor(public adminService: AdminApiService) {}

  ngOnInit(): void {}

  userInfo() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjGetUserInfo.usuario_id = id;
    this.dataObjGetUserInfo.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getUserInfo(this.dataObjGetUserInfo).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseInfo = result.objeto;
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
