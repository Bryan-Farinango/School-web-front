import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificacionCorreoComponent } from './pages/registro-process/verificacion-correo/verificacion-correo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro-process/registro/registro.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena-process/recuperar-contrasena/recuperar-contrasena.component';
import { MensajeContrasenaComponent } from './pages/recuperar-contrasena-process/mensaje-contrasena/mensaje-contrasena.component';
import { FormularioRecuperarContrasenaComponent } from './pages/recuperar-contrasena-process/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { MensajeExitosoCambioContrasenaComponent } from './pages/recuperar-contrasena-process/mensaje-exitoso-cambio-contrasena/mensaje-exitoso-cambio-contrasena.component';
import { VerificacionCuentaComponent } from './pages/registro-process/verificacion-cuenta/verificacion-cuenta.component';
import { AccionesFirebaseComponent } from './components/acciones-firebase/acciones-firebase.component';
import { ErrorPage404Component } from './pages/error/error-page404/error-page404.component';
import { ErrorPage500Component } from './pages/error/error-page500/error-page500.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { RegisterGuardGuard } from './guards/register/register-guard.guard';
import { VerificationGuardGuard } from './guards/verification-account/verification-guard.guard';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { CreateGradeComponent } from './pages/create-grade/create-grade.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CreateRutaComponent } from './pages/create-ruta/create-ruta.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { CreateDriverComponent } from './pages/create-driver/create-driver.component';
import { SolicitudRegistroTransporteComponent } from './pages/solicitud-registro-transporte/solicitud-registro-transporte.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { SignaturesComponent } from './pages/signatures/signatures.component';
import { HomeUserComponent } from './pages/user-page/home-user/home-user.component';
import { HomeTeacherComponent } from './pages/teacher-page/home-teacher/home-teacher.component';
import { BoyInscriptionComponent } from './pages/user-page/boy-inscription/boy-inscription.component';
import { AdminStudentsComponent } from './pages/admin-students/admin-students.component';
import { StudentsTeacherComponent } from './pages/teacher-page/students-teacher/students-teacher.component';
import { NotificationsComponent } from './pages/user-page/notifications/notifications.component';
import { NotasComponent } from './pages/teacher-page/notas/notas.component';
import { CalificacionesComponent } from './pages/user-page/calificaciones/calificaciones.component';
import { UserTransporteComponent } from './pages/user-page/user-transporte/user-transporte.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['info-school']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'verificacion-correo',
    component: VerificacionCorreoComponent,
    canActivate: [VerificationGuardGuard],
  },
  {
    path: 'validacion-cuenta',
    component: VerificacionCuentaComponent,
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenaComponent,
  },
  {
    path: 'info-school',
    component: InfoPageComponent,
  },
  //HOME ADMIN
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard, RegisterGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'create-subject', // child route path
        component: CreateSubjectComponent, // child route component that the router renders
      },
      {
        path: 'create-grade', // child route path
        component: CreateGradeComponent, // child route component that the router renders
      },
      {
        path: 'create-user', // child route path
        component: CreateUserComponent, // child route component that the router renders
      },
      {
        path: 'admin-dashboard', // child route path
        component: AdminDashboardComponent, // child route component that the router renders
      },

      {
        path: 'create-ruta', // child route path
        component: CreateRutaComponent, // child route component that the router renders
      },
      {
        path: 'rutas', // child route path
        component: RutasComponent, // child route component that the router renders
      },
      {
        path: 'create-driver', // child route path
        component: CreateDriverComponent, // child route component that the router renders
      },
      {
        path: 'solicitud-registro', // child route path
        component: SolicitudRegistroTransporteComponent, // child route component that the router renders
      },
      {
        path: 'drivers', // child route path
        component: DriversComponent, // child route component that the router renders
      },
      {
        path: 'signatures', // child route path
        component: SignaturesComponent, // child route component that the router renders
      },
      {
        path: 'students-request', // child route path
        component: AdminStudentsComponent, // child route component that the router renders
      },
    ],
  },
  {
    path: 'user-page',
    component: HomeUserComponent,
    canActivate: [AngularFireAuthGuard, RegisterGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'create-inscription', // child route path
        component: BoyInscriptionComponent, // child route component that the router renders
      },
      {
        path: 'notifications', // child route path
        component: NotificationsComponent, // child route component that the router renders
      },
      {
        path: 'calificaciones', // child route path
        component: CalificacionesComponent, // child route component that the router renders
      },
      {
        path: 'user-transporte', // child route path
        component: UserTransporteComponent, // child route component that the router renders
      },
    ],
  },
  {
    path: 'teacher-page',
    component: HomeTeacherComponent,
    canActivate: [AngularFireAuthGuard, RegisterGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'techer-students', // child route path
        component: StudentsTeacherComponent, // child route component that the router renders
      },
      {
        path: 'teacher-notes', // child route path
        component: NotasComponent, // child route component that the router renders
      },
    ],
  },
  {
    path: "home/error-404'",
    component: ErrorPage404Component,
  },
  {
    path: 'contrasena-enviada',
    component: MensajeContrasenaComponent,
  },
  {
    path: 'nueva-contrasena',
    component: FormularioRecuperarContrasenaComponent,
  },
  {
    path: 'constrasena-exitosa',
    component: MensajeExitosoCambioContrasenaComponent,
  },
  {
    path: 'acciones',
    component: AccionesFirebaseComponent,
  },
  {
    path: 'error-404',
    component: ErrorPage404Component,
  },
  {
    path: 'error-500',
    component: ErrorPage500Component,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPage404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
