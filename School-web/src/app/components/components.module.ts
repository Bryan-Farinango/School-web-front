import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutLoginHeaderComponent } from './layout/layout-login-header/layout-login-header.component';
import { LayoutLoginFooterComponent } from './layout/layout-login-footer/layout-login-footer.component';
import { AccionesFirebaseComponent } from './acciones-firebase/acciones-firebase.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TeacherMenuComponent } from './teacher/teacher-menu/teacher-menu.component';
@NgModule({
  declarations: [
    LayoutLoginHeaderComponent,
    LayoutLoginFooterComponent,
    AccionesFirebaseComponent,
    AdminHeaderComponent,
    AdminMenuComponent,
    TeacherMenuComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
  ],
  exports: [
    LayoutLoginFooterComponent,
    LayoutLoginHeaderComponent,
    AdminHeaderComponent,
    AdminMenuComponent,
    TeacherMenuComponent,
  ],
})
export class ComponentsModule {}
