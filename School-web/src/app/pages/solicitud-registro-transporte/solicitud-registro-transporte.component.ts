import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';
@Component({
  selector: 'app-solicitud-registro-transporte',
  templateUrl: './solicitud-registro-transporte.component.html',
  styleUrls: ['./solicitud-registro-transporte.component.scss'],
})
export class SolicitudRegistroTransporteComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
}
