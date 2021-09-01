import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';

import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class RutasComponent implements OnInit {
  @ViewChild('contentEdit', { static: false }) modalEdit: TemplateRef<void>;
  @ViewChild('contentEditAll', { static: false })
  modalEditAll: TemplateRef<void>;
  public idAux: any;
  public idAuxRuta: any;
  public driverArr: any;
  rutaOptions = [];
  public responseProcess: any;
  public message: Boolean;
  public message2: Boolean;
  public sinTransporte: boolean;
  dataObjGetRutas = {
    api_key_admin: '',
  };

  dataObJdeleteDriver = {
    api_key_admin: '',
    transportista_id: '',
    ruta_id: ' ',
  };
  dataObjAddDriver = {
    api_key_admin: '',
    ruta_id: '',
    nombre_transportista: '',
  };

  rutaOptionsForm = new FormGroup({
    name: new FormControl(''),
  });

  dataObjUpdateAll = {
    api_key_admin: '',
    ruta_id: '',
    titulo_ruta: '',
    numero_ruta: '',
    ciudad: '',
    sector_1: '',
    sector_2: '',
    sector_3: '',
  };

  dataObjDeleteRuta = {
    api_key_admin: '',
    ruta_id: '',
  };

  editAllForm = new FormGroup({
    title: new FormControl(''),
    number: new FormControl(''),
    city: new FormControl(''),
    sector1: new FormControl(''),
    sector2: new FormControl(''),
    sector3: new FormControl(''),
  });
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private AdminService: AdminApiService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.message = false;
    this.sinTransporte = false;
    this.message2 = false;
  }

  ngOnInit(): void {
    this.getAllRutas();
    this.getAllDrivers();
  }

  getAllRutas() {
    this.dataObjGetRutas.api_key_admin = environment.apiKeyAdmin;
    this.AdminService.getRutas(this.dataObjGetRutas).subscribe(
      (result) => {
        if (result.resultado) {
          //si existe
          this.responseProcess = result.rutas;
          //map

          if (this.responseProcess == '') {
            this.message = true;
          }

          //const resp = respProcess.usuarios.original;
          // that.processList = resp.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllDrivers() {
    this.dataObjGetRutas.api_key_admin = environment.apiKeyAdmin;
    this.AdminService.getDrivers(this.dataObjGetRutas).subscribe(
      (result) => {
        if (result.resultado) {
          //map
          this.driverArr = result;
          let drivers = this.driverArr.transportistas;
          let arr = [];
          Object.keys(drivers).map(function (key) {
            arr.push(drivers[key]['nombres']);
            return arr;
          });
          this.rutaOptions = arr;
          if (result.transportistas == '') {
            this.message2 = true;
          }

          //const resp = respProcess.usuarios.original;
          // that.processList = resp.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteTransportista(id: any, rutaId: any) {
    console.log('repeat: ', id, rutaId);
    this.dataObJdeleteDriver.api_key_admin = environment.apiKeyAdmin;
    this.dataObJdeleteDriver.transportista_id = id;
    this.dataObJdeleteDriver.ruta_id = rutaId;
    this.AdminService.delDriverFromRuta(this.dataObJdeleteDriver).subscribe(
      (result) => {
        if (result.resultado) {
          this.getAllRutas();
          this.showSuccess('Transportista Desvinculado.', 'Listo');
        } else if (!result.resultado) {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModalEditar(
    id: any,
    titulo: any,
    numero: any,
    ciudad: any,
    sector_1: any,
    sector_2: any,
    sector_3: any
  ) {
    this.idAuxRuta = id;
    this.editAllForm.reset({
      title: titulo,
      number: numero,
      city: ciudad,
      sector1: sector_1,
      sector2: sector_2,
      sector3: sector_3,
    });

    this.openModalEditAll();
  }
  onAddTransportista(id: any): void {
    this.idAux = id;
    this.openModalEdit();
  }

  openModalEdit(): void {
    this.modalService.open(this.modalEdit, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openModalEditAll(): void {
    this.modalService.open(this.modalEditAll, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  onUpdate(form: any, id: any) {
    if (form.invalid) {
      this.showAlert('Campos Vacíos', 'Error');
      return;
    }
    console.log(form);
    const {
      title,
      number,
      city,
      sector1,
      sector2,
      sector3,
    } = this.editAllForm.value;

    this.dataObjUpdateAll.api_key_admin = environment.apiKeyAdmin;
    this.dataObjUpdateAll.titulo_ruta = title;
    this.dataObjUpdateAll.numero_ruta = number;
    this.dataObjUpdateAll.ciudad = city;
    this.dataObjUpdateAll.sector_1 = sector1;
    this.dataObjUpdateAll.sector_2 = sector2;
    this.dataObjUpdateAll.sector_3 = sector3;
    this.dataObjUpdateAll.ruta_id = this.idAuxRuta;

    this.AdminService.updateRutas(this.dataObjUpdateAll).subscribe(
      (result) => {
        if (result.resultado) {
          this.getAllRutas();
          this.showSuccess('Ruta Actualizada.', 'Listo');
        } else if (!result.resultado) {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        this.showAlert(error, 'Error');
        console.log(error);
      }
    );
  }

  ondeleteRuta(id: any) {
    this.dataObjDeleteRuta.api_key_admin = environment.apiKeyAdmin;
    this.dataObjDeleteRuta.ruta_id = id;
    this.AdminService.deleteRuta(this.dataObjDeleteRuta).subscribe(
      (result) => {
        if (result.resultado) {
          this.getAllRutas();
          this.showSuccess('Ruta Eliminada.', 'Listo');
        } else if (!result.resultado) {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        this.showAlert(error, 'Error');
        console.log(error);
      }
    );
  }
  onUpdateTransportista(form: any) {
    const { name } = this.rutaOptionsForm.value;
    if (name == '') {
      this.showAlert('No selecciono un transportista', 'Error');
      return;
    }

    this.dataObjAddDriver.api_key_admin = environment.apiKeyAdmin;
    this.dataObjAddDriver.ruta_id = this.idAux;
    this.dataObjAddDriver.nombre_transportista = name;

    this.AdminService.addDriverToRuta(this.dataObjAddDriver).subscribe(
      (result) => {
        if (result.resultado) {
          this.getAllRutas();
          this.showSuccess('Transportista Agregado.', 'Listo');
        } else if (!result.resultado) {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        this.showAlert(error, 'Error');
        console.log(error);
      }
    );
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
}
