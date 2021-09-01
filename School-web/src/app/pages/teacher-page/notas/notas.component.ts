import {
  ChangeDetectorRef,
  Component,
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent implements OnInit {
  @ViewChild('contentCreate', { static: false }) modalCreate: TemplateRef<void>;
  @ViewChild('contentEdit', { static: false }) modalEdit: TemplateRef<void>;
  @ViewChild('contentEditQuimestral', { static: false })
  modalEditQuimestral: TemplateRef<void>;
  dataObjQuimestra = {
    calificacion_id: '',
    nota_final: '',
  };
  dataObjGetGrades = {
    api_key_admin: '',
  };
  dataObjGetMateriaFromTeacher = {
    grado_id: '',
    usuario_id: '',
  };
  dataObjGetMateriaFromOnlyTeacher = {
    usuario_id: '',
  };
  dataObjEst = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: '',
  };

  dataObjEstAlone = {
    usuario_id: '',
    asignatura_id: 'todos',
    grado_id: 'todos',
  };

  dataObjGetStudentCalificaciones = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: 'todos',
  };
  dataObjRegistro = {
    grado_id: '',
    fecha: <string>'',
    descripcion: '',
    materia_id: '',
    estudiante_id: '',
    usuario_id: '',
    quimestre: '',
  };

  dataObjGetCalificaciones = {
    grado_id: 'todos',
    profesor_id: '',
    estudiante_id: 'todos',
    materia_id: 'todos',
    estado: 1,
    usuario_id: 'todos',
  };

  dataObjDelNota = {
    calificacion_id: '',
  };

  dataObjNotasByParcial = {
    estudiante_id: '',
    parcial: '',
  };

  dataObjUpdateNota = {
    calificacion_id: '',
    parcial: 0,
    nota_1: 0,
    nota_2: 0,
    nota_3: 0,
    nota_4: 0,
    nota_5: 0,
    nota_6: 0,
    total: 0,
  };
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;
  public auxIdNotas: any;
  public auxNotaFinal: any;
  passwordInputType = 'password';
  roleOptions = ['Administrador', 'Profesor'];
  parcialOptions = environment.parcialOptions;
  quimestreOptions = environment.quimestreOption;
  public responseNotas: any;
  public responseGrades: any;
  public responseSubjects: any;
  public responseSubjectsFromOnlyTeacher: any;
  public responseStudents: any;
  public responseStudentsFromOnlyTeacher: any;
  public responseOnlyStudents: any;
  public btnDisabled: boolean;
  public dateAux: any;
  public auxParcialValue: any;
  searchForm = new FormGroup({
    studentSearch: new FormControl(''),
    subjectSearch: new FormControl(''),
    grade: new FormControl(''),
  });

  editNotasForm = new FormGroup({
    parcial: new FormControl(''),
    nota1: new FormControl(''),
    nota2: new FormControl(''),
    nota3: new FormControl(''),
    nota4: new FormControl(''),
    nota5: new FormControl(''),
    nota6: new FormControl(''),
    total: new FormControl(''),
  });

  editNotasFormQuimestrar = new FormGroup({
    notaFinal: new FormControl(''),
  });

  constructor(
    public adminService: AdminApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.btnDisabled = false;
  }

  ngOnInit(): void {
    this.getAllGrades();
    this.getMyStudents();
    this.getMateriasFromOnlyTeacher();
    this.searchCalificaciones();
    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      grade: [null, Validators.required],
      date: [null, Validators.required],
      description: [null, Validators.required],
      quimestre: [null, Validators.required],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      subject: [null, Validators.required],
      student: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });
  }

  getNotas() {}

  getMyStudents() {
    this.dataObjEstAlone.usuario_id = localStorage.getItem('usuario_id');
    this.adminService.getMyStudents(this.dataObjEstAlone).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseOnlyStudents = result.estudiantes;
          /*
          this.responseStudents.forEach((myObject) => {
            this.responseMaterias.push(myObject.materias);
          });
          */

          console.log('solo estudiantes', this.responseOnlyStudents);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllGrades() {
    this.dataObjGetGrades.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getGrades(this.dataObjGetGrades).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseGrades = result.grados;
        }
      },
      (error) => {
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

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  openModalCrear(): void {
    this.modalService.open(this.modalCreate, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'teacher-modal',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openModalEditar(): void {
    this.modalService.open(this.modalEdit, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'teacher-modal',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openModalEditarQuimestral(): void {
    this.modalService.open(this.modalEditQuimestral, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'teacher-modal',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  onCreate() {
    this.openModalCrear();
  }

  onEditNota(value: any) {
    this.auxIdNotas = value;
    this.openModalEditar();
  }

  onEditQuimestral(value: any, nota: any) {
    this.auxIdNotas = value;
    this.auxNotaFinal = nota;
    console.log('que paza: ', nota);
    this.editNotasFormQuimestrar.get('notaFinal').reset(this.auxNotaFinal);
    this.openModalEditarQuimestral();
  }

  submit() {
    console.log('correct');
    const {
      grade,
      date,
      description,
      quimestre,
    } = this.verticalAccountFormGroup.value;
    const { subject, student } = this.verticalPasswordFormGroup.value;
    this.dateAux = date;
    this.dateAux = this.datepipe.transform(this.dateAux, 'yyyy-MM-dd');

    this.dataObjRegistro.usuario_id = localStorage.getItem('usuario_id');
    this.dataObjRegistro.materia_id = subject;
    this.dataObjRegistro.grado_id = grade;
    this.dataObjRegistro.fecha = this.dateAux;
    this.dataObjRegistro.descripcion = description;
    this.dataObjRegistro.estudiante_id = student;
    this.dataObjRegistro.quimestre = quimestre;
    console.log('datos listos a crearse: ', this.dataObjRegistro);

    this.adminService.createRegistroNotas(this.dataObjRegistro).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Registro creado correctamente.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fistQuery() {
    const { grade } = this.verticalAccountFormGroup.value;

    this.dataObjGetMateriaFromTeacher.grado_id = grade;
    this.dataObjGetMateriaFromTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );

    this.adminService
      .getMateriaFromGradeAndTeacher(this.dataObjGetMateriaFromTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjects = result.materias;
            if (this.responseSubjects.length == 0) {
              this.showAlert(
                'No existe Materias para el grado seleccionado.',
                'Error'
              );
            } else {
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeExtra(value: any) {
    this.dataObjGetMateriaFromTeacher.grado_id = value;
    this.dataObjGetMateriaFromTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );
    this.adminService
      .getMateriaFromGradeAndTeacher(this.dataObjGetMateriaFromTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjects = result.materias;
            if (this.responseSubjects.length == 0) {
              this.showAlert(
                'No existe Materias para el grado seleccionado.',
                'Error'
              );

              return;
            } else {
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getMateriasFromOnlyTeacher() {
    this.dataObjGetMateriaFromOnlyTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );
    this.adminService
      .getMateriasFromOnlyTeacher(this.dataObjGetMateriaFromOnlyTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjectsFromOnlyTeacher = result.materias;
            console.log(
              'materias only from teacher: ',
              this.responseSubjectsFromOnlyTeacher
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChange(deviceValue: any) {
    const event = deviceValue;
    const { grade } = this.verticalAccountFormGroup.value;
    this.dataObjEst.usuario_id = localStorage.getItem('usuario_id');
    this.dataObjEst.grado_id = grade;
    this.dataObjEst.asignatura_id = event;

    this.adminService.getMyStudents(this.dataObjEst).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseStudents = result.estudiantes;
          console.log(this.responseStudents);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange2(deviceValue: any) {
    const event = deviceValue;
    this.dataObjGetStudentCalificaciones.asignatura_id = event;
    this.dataObjGetStudentCalificaciones.usuario_id = localStorage.getItem(
      'usuario_id'
    );

    this.adminService
      .getMyStudents(this.dataObjGetStudentCalificaciones)
      .subscribe(
        (result) => {
          if (result.resultado == true) {
            this.responseStudentsFromOnlyTeacher = result.estudiantes;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  auxSearch() {
    this.searchCalificaciones();
  }
  searchCalificaciones() {
    const { studentSearch, subjectSearch } = this.searchForm.value;
    this.dataObjGetCalificaciones.profesor_id = localStorage.getItem(
      'usuario_id'
    );

    if (subjectSearch == '') {
      this.dataObjGetCalificaciones.materia_id = 'todos';
    } else {
      this.dataObjGetCalificaciones.materia_id = subjectSearch;
    }

    if (studentSearch == '') {
      this.dataObjGetCalificaciones.estudiante_id = 'todos';
    } else {
      this.dataObjGetCalificaciones.estudiante_id = studentSearch;
    }

    console.log(
      'datos listo pa buscar calificaciones: ',
      this.dataObjGetCalificaciones
    );
    this.adminService.getNotas(this.dataObjGetCalificaciones).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseNotas = result.calificaciones;
          console.log('notas finales: ', this.responseNotas);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNotas(value: any) {
    this.dataObjDelNota.calificacion_id = value;
    this.adminService.delNotas(this.dataObjDelNota).subscribe(
      (result) => {
        if (result.resultado) {
          this.searchCalificaciones();
          this.showSuccess('Registro borrado con éxito.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeNotas(value: any) {
    this.dataObjDelNota.calificacion_id = value;
    this.adminService.closeNotas(this.dataObjDelNota).subscribe(
      (result) => {
        if (result.resultado) {
          this.searchCalificaciones();
          this.showSuccess('Registro cerrado con éxito.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangeEdit(value: any) {
    const event = value;
    this.auxParcialValue;
    this.dataObjNotasByParcial.estudiante_id = this.auxIdNotas;
    this.dataObjNotasByParcial.parcial = value;
    this.auxChange();
  }

  auxChange() {
    this.adminService.getNotasByParcial(this.dataObjNotasByParcial).subscribe(
      (result) => {
        if (result.resultado) {
          this.editNotasForm.get('nota1').reset(result.calificaciones.nota1);
          this.editNotasForm.get('nota2').reset(result.calificaciones.nota2);
          this.editNotasForm.get('nota3').reset(result.calificaciones.nota3);
          this.editNotasForm.get('nota4').reset(result.calificaciones.nota4);
          this.editNotasForm.get('nota5').reset(result.calificaciones.nota5);
          this.editNotasForm.get('nota6').reset(result.calificaciones.nota6);
          this.editNotasForm.get('total').reset(result.calificaciones.total);

          console.log('notas by parcial: ', result);
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCalificacion(form: any) {
    if (form.invalid) {
      this.showAlert('Selecciona un parcial', 'Error');
      return;
    }

    this.dataObjUpdateNota.calificacion_id = this.auxIdNotas;
    const {
      parcial,
      nota1,
      nota2,
      nota3,
      nota4,
      nota5,
      nota6,
      total,
    } = this.editNotasForm.value;

    if (nota1 == null) {
      this.dataObjUpdateNota.nota_1 = 0;
    } else {
      this.dataObjUpdateNota.nota_1 = nota1;
    }

    if (nota2 == null) {
      this.dataObjUpdateNota.nota_2 = 0;
    } else {
      this.dataObjUpdateNota.nota_2 = nota2;
    }

    if (nota3 == null) {
      this.dataObjUpdateNota.nota_3 = 0;
    } else {
      this.dataObjUpdateNota.nota_3 = nota3;
    }

    if (nota4 == null) {
      this.dataObjUpdateNota.nota_4 = 0;
    } else {
      this.dataObjUpdateNota.nota_4 = nota4;
    }

    if (nota5 == null) {
      this.dataObjUpdateNota.nota_5 = 0;
    } else {
      this.dataObjUpdateNota.nota_5 = nota5;
    }
    if (nota6 == null) {
      this.dataObjUpdateNota.nota_6 = 0;
    } else {
      this.dataObjUpdateNota.nota_6 = nota6;
    }
    if (total == null) {
      this.dataObjUpdateNota.total = 0;
    } else {
      this.dataObjUpdateNota.total = total;
    }

    this.dataObjUpdateNota.parcial = parcial;

    console.log('listo para acutalizar potter: ', this.dataObjUpdateNota);
    this.adminService.updateNotas(this.dataObjUpdateNota).subscribe(
      (result) => {
        if (result.resultado) {
          this.showSuccess('Calificaciones actualizadas', 'Listo');
          this.searchCalificaciones();
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCalificacionQuimestral(form: any) {
    this.dataObjQuimestra.calificacion_id = this.auxIdNotas;
    const { notaFinal } = this.editNotasFormQuimestrar.value;

    this.dataObjQuimestra.nota_final = notaFinal;

    this.adminService.updateNotaQuimestral(this.dataObjQuimestra).subscribe(
      (result) => {
        if (result.resultado) {
          this.showSuccess('Calificacion Quimestral Actualizada', 'Listo');
          this.searchCalificaciones();
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
