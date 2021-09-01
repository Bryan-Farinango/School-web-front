import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { RegistroComponent } from './registro-process/registro/registro.component';
import { VerificacionCorreoComponent } from './registro-process/verificacion-correo/verificacion-correo.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RecuperarContrasenaComponent } from './recuperar-contrasena-process/recuperar-contrasena/recuperar-contrasena.component';
import { MensajeContrasenaComponent } from './recuperar-contrasena-process/mensaje-contrasena/mensaje-contrasena.component';
import { FormularioRecuperarContrasenaComponent } from './recuperar-contrasena-process/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { MensajeExitosoCambioContrasenaComponent } from './recuperar-contrasena-process/mensaje-exitoso-cambio-contrasena/mensaje-exitoso-cambio-contrasena.component';
import { VerificacionCuentaComponent } from './registro-process/verificacion-cuenta/verificacion-cuenta.component';
import { ErrorPage500Component } from './error/error-page500/error-page500.component';
import { ErrorPage404Component } from './error/error-page404/error-page404.component';
import { RegisterGuardGuard } from '../guards/register/register-guard.guard';
import { VerificationGuardGuard } from '../guards/verification-account/verification-guard.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { InfoPageComponent } from './info-page/info-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatListModule } from '@angular/material/list';
import { CreateSubjectComponent } from './create-subject/create-subject.component';

//news

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateGradeComponent } from './create-grade/create-grade.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { CreateRutaComponent } from './create-ruta/create-ruta.component';
import { RutasComponent } from './rutas/rutas.component';

import { CreateDriverComponent } from './create-driver/create-driver.component';
import { SolicitudRegistroTransporteComponent } from './solicitud-registro-transporte/solicitud-registro-transporte.component';
import { DriversComponent } from './drivers/drivers.component';

import { SignaturesComponent } from './signatures/signatures.component';

import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { HomeUserComponent } from './user-page/home-user/home-user.component';
import { HomeTeacherComponent } from './teacher-page/home-teacher/home-teacher.component';
// For MDB Angular Free
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BoyInscriptionComponent } from './user-page/boy-inscription/boy-inscription.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { StudentsTeacherComponent } from './teacher-page/students-teacher/students-teacher.component';
import { DatePipe } from '@angular/common';
import { NotificationsComponent } from './user-page/notifications/notifications.component';
import { NotasComponent } from './teacher-page/notas/notas.component';
import { CalificacionesComponent } from './user-page/calificaciones/calificaciones.component';
import { UserTransporteComponent } from './user-page/user-transporte/user-transporte.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    VerificacionCorreoComponent,
    HomeComponent,
    RecuperarContrasenaComponent,
    MensajeContrasenaComponent,
    FormularioRecuperarContrasenaComponent,
    MensajeExitosoCambioContrasenaComponent,
    VerificacionCuentaComponent,
    ErrorPage404Component,
    ErrorPage500Component,
    InfoPageComponent,
    CreateUserComponent,
    CreateSubjectComponent,
    CreateGradeComponent,
    AdminDashboardComponent,

    CreateRutaComponent,
    RutasComponent,

    CreateDriverComponent,
    SolicitudRegistroTransporteComponent,
    DriversComponent,

    SignaturesComponent,

    HomeUserComponent,

    HomeTeacherComponent,

    BoyInscriptionComponent,

    AdminStudentsComponent,

    StudentsTeacherComponent,

    NotificationsComponent,

    NotasComponent,

    CalificacionesComponent,

    UserTransporteComponent,
  ],
  imports: [
    MDBBootstrapModule,
    ButtonsModule,
    WavesModule,
    NavbarModule,
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    MatTooltipModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatStepperModule,
    MatRippleModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    ToastrModule.forRoot(),
    DataTablesModule,
  ],

  providers: [RegisterGuardGuard, VerificationGuardGuard, DatePipe],
  exports: [
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRippleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    FlexLayoutModule,
    MatDividerModule,
    MatBadgeModule,
  ],
})
export class PagesModule {}
