import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminListComponent } from './components/admin-components/admin-list/admin-list.component';
import { AdminFilterService } from './services/filters/admin-filter.service';
import { AdminAddComponent } from './components/admin-components/admin-add/admin-add.component';
import { AdminEditComponent } from './components/admin-components/admin-edit/admin-edit.component';
import { AdminDashComponent } from './components/admin-components/admin-dash/admin-dash.component';
import { TeacherListComponent } from './components/teacher-components/teacher-list/teacher-list.component';
import { TeacherAddComponent } from './components/teacher-components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './components/teacher-components/teacher-edit/teacher-edit.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentFilterService } from './services/filters/student-filter.service';
import { StudentListComponent } from './components/student-components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-components/student-edit/student-edit.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ParentViewComponent } from './components/parent-view/parent-view.component';
import { ParentFilterService } from './services/filters/parent-filter.service';
import { TeacherViewComponent } from './components/teacher-view/teacher-view.component';
import { TeacherFilterService } from './services/filters/teacher-filter.service';
import { MarkAddComponent } from './components/mark-components/mark-add/mark-add.component';
import { ParentEditComponent } from './components/parent-components/parent-edit/parent-edit.component';
import { ParentListComponent } from './components/parent-components/parent-list/parent-list.component';
import { ParentAddComponent } from './components/parent-components/parent-add/parent-add.component';
import { MarkEditComponent } from './components/mark-components/mark-edit/mark-edit.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'hROLE_ADMIN', component: AdminDashComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/admini', component: AdminListComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/admini/add', component: AdminAddComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/admini/edit/:id', component: AdminEditComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/teacheri', component: TeacherListComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/teacheri/add', component: TeacherAddComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/teacheri/edit/:id', component: TeacherEditComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/studenti', component: StudentListComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/studenti/add', component: StudentAddComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/studenti/edit/:id', component: StudentEditComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_STUDENT', component: StudentViewComponent, canActivate : [StudentFilterService]},
  { path: 'profil', component: UserProfilComponent},
  { path: 'changePassword', component: ChangePasswordComponent},
  //{ path: 'profil', component: UserProfilComponent, canActivate : [StudentFilterService] }
  { path: 'hROLE_PARENT', component: ParentViewComponent, canActivate : [ParentFilterService]},
  { path: 'hROLE_TEACHER', component: TeacherViewComponent, canActivate : [TeacherFilterService]},
  { path: 'addMark/:stId/:ttId', component: MarkAddComponent, canActivate : [TeacherFilterService]},
  { path: 'hROLE_ADMIN/parenti', component: ParentListComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/parenti/add', component: ParentAddComponent, canActivate : [AdminFilterService]},
  { path: 'hROLE_ADMIN/parenti/edit/:id', component: ParentEditComponent, canActivate : [AdminFilterService]},
  { path: 'editMark/:id', component: MarkEditComponent, canActivate : [TeacherFilterService]},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
