import { AdminApiService } from 'src/app/services/admin-api.service';
import { ExcelService } from '../../services/excel.service';
import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { env } from 'process';
declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss'],
  providers: [NgbModal],
  encapsulation: ViewEncapsulation.None,
})
export class SignaturesComponent implements OnInit {
  @ViewChild('content', { static: false }) modalDownload: TemplateRef<void>;
  @ViewChild('contentEdit', { static: false }) modalEdit: TemplateRef<void>;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  processList: any;
  processStatus: number;
  url = environment.apiUrl;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  fileName: string;
  currentDate = formatDate(new Date(), '_ddMMyyyy_Hmmss', 'en');
  showAdvancedSearch: boolean;
  dataObjProcessData = {
    api_key_admin: environment.apiKeyAdmin,
  };
  fileList: any;
  files = {
    document: '',
  };

  editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    year: new FormControl(''),
    grade: new FormControl(''),
    teacher: new FormControl(''),
  });

  roleOptions = [];
  yearOptions = ['2021', '2022', '2023', '2024', '2025', '2026'];
  updateObj = {
    api_key_admin: '',
    materia_id: '',
    nombre_asignatura: '',
    descripcion: '',
    anio_escolar: '',
    grado: '',
    usuario_id: '',
  };

  dataDeleteObj = {
    api_key_admin: '',
    materia_id: '',
  };
  public idAux: any;
  public responseProcess: any;
  public responseTeacher: any;
  public driverArr: any;
  constructor(
    private adminService: AdminApiService,
    private http: HttpClient,
    public dataService: DataService,
    private authSvc: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private excelService: ExcelService
  ) {
    this.processStatus = -1;
    this.fileName = 'Reporte_usuarios' + this.currentDate;
    this.showAdvancedSearch = false;
  }

  ngOnInit(): void {
    this.getAllProcessData();
    this.getAllSubjects();
  }
  filterByStatus(state: number): void {
    this.processStatus = state;
    this.showAdvancedSearch = false;
    this.reloadTable();
  }

  getAllSubjects() {
    this.dataDeleteObj.api_key_admin = environment.apiKeyAdmin;

    this.adminService.getGrades(this.dataDeleteObj).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseProcess = result;
          let grades = this.responseProcess.grados;
          let arr = [];
          Object.keys(grades).map(function (key) {
            arr.push(grades[key]['nombre_grado']);
            return arr;
          });
          this.roleOptions = arr;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.adminService.getProfesor(this.dataDeleteObj).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseTeacher = result.profesores;
          console.log(this.responseTeacher);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private async reloadTable() {
    const dtIntance = await this.dtElement.dtInstance;
    dtIntance.ajax.reload();
  }

  getAllProcessData(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      lengthChange: false,
      info: false,
      paging: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.url + '/get-asignaturas',
            this.getInputData(dataTablesParameters),
            this.httpHeader
          )
          .subscribe((respProcess) => {
            // const resp = respProcess.procesos.original;
            const resp = respProcess.materias.original;

            that.processList = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      // columns: [{ data: 'titulo' }, { data: 'estado' }, { data: 'created_at' }, { data: 'tipo' }, { data: '_id' }],
      columns: [{ data: 'nombres' }],
      language: this.dataService.spanishDatatables,
    };
  }

  getInputData(dataTable: any): any {
    dataTable['api_key_admin'] = environment.apiKeyAdmin;
    dataTable['formato_datatable'] = true;
    return dataTable;
  }

  exportExcel(): void {
    this.excelService.exportAsExcelFile(this.processList, this.fileName);
  }

  showFilterAdvancedSearch(): void {
    this.showAdvancedSearch = true;
  }
  hideFilterAdvancedSearch(): void {
    this.showAdvancedSearch = false;
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

  openModalDownload(): void {
    this.modalService.open(this.modalDownload, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
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

  openEditModal(
    id: any,
    nombre: any,
    descripcion: any,
    anio: any,
    grado: any
  ): void {
    this.openModalEdit();
    this.idAux = id;
    this.editForm.reset({
      name: nombre,
      description: descripcion,
      year: anio,
      grade: grado,
    });

    console.log('reseteado', this.editForm);
  }

  onUpdate(form: any, id: any) {
    if (form.invalid) {
      this.showAlert('Campos Vacíos', 'Error');
      return;
    }

    const { name, description, year, grade, teacher } = this.editForm.value;
    this.updateObj.materia_id = this.idAux;
    this.updateObj.api_key_admin = environment.apiKeyAdmin;
    this.updateObj.nombre_asignatura = name;
    this.updateObj.descripcion = description;
    this.updateObj.anio_escolar = year;
    this.updateObj.grado = grade;
    this.updateObj.usuario_id = teacher;
    this.adminService.updateSubject(this.updateObj).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.reloadTable();
          this.showSuccess('Datos Actualizados.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUset(id: any) {
    this.dataDeleteObj.api_key_admin = environment.apiKeyAdmin;
    this.dataDeleteObj.materia_id = id;
    this.adminService.deleteSubject(this.dataDeleteObj).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Materia eliminada.', 'Listo');
          this.reloadTable();
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
