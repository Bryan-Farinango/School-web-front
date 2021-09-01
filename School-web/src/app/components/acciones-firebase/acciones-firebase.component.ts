import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-acciones-firebase',
  templateUrl: './acciones-firebase.component.html',
  styleUrls: ['./acciones-firebase.component.scss'],
})
export class AccionesFirebaseComponent implements OnInit {
  public mode: string;
  public code: string;
  public apiKey: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.mode = this.route.snapshot.queryParams.mode;
    this.code = this.route.snapshot.queryParams.oobCode;
    this.apiKey = this.route.snapshot.queryParams.apiKey;
    let url = '';
    if (this.mode == 'resetPassword') {
      this.router.navigate(['/nueva-contrasena'], {
        queryParams: {
          mode: this.mode,
          oobCode: this.code,
          apiKey: this.apiKey,
        },
      });
    }
    if (this.mode == 'verifyEmail') {
      this.router.navigate(['/validacion-cuenta'], {
        queryParams: {
          mode: this.mode,
          oobCode: this.code,
          apiKey: this.apiKey,
        },
      });
    }
  }

  ngOnInit(): void {}
}
