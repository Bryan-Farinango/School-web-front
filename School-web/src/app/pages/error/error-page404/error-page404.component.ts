import { Component, OnInit } from '@angular/core';
// import { DataService} from '../../../services/data.service';

@Component({
  selector: 'app-error-page404',
  templateUrl: './error-page404.component.html',
  styleUrls: ['./error-page404.component.scss'],
})
export class ErrorPage404Component implements OnInit {
  constructor() {
    // this.dataService.errorPage = true;
  }

  ngOnInit(): void {}
}
