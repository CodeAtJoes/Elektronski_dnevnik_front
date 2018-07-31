import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminListComponent } from './components/admin-components/admin-list/admin-list.component';
import { AdminItemComponent } from './components/admin-components/admin-item/admin-item.component';
import { AdminAddComponent } from './components/admin-components/admin-add/admin-add.component';
import { AdminEditComponent } from './components/admin-components/admin-edit/admin-edit.component';
import { MessageService } from './services/message.service';
import { MessageListComponent } from './components/message-component/message-list/message-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AdminDashComponent } from './components/admin-components/admin-dash/admin-dash.component';
import { TeacherListComponent } from './components/teacher-components/teacher-list/teacher-list.component';
import { TeacherItemComponent } from './components/teacher-components/teacher-item/teacher-item.component';
import { TeacherAddComponent } from './components/teacher-components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './components/teacher-components/teacher-edit/teacher-edit.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentListComponent } from './components/student-components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-components/student-edit/student-edit.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ParentViewComponent } from './components/parent-view/parent-view.component';
import { TeacherViewComponent } from './components/teacher-view/teacher-view.component';
import { MarkAddComponent } from './components/mark-components/mark-add/mark-add.component';
import { ParentListComponent } from './components/parent-components/parent-list/parent-list.component';
import { ParentAddComponent } from './components/parent-components/parent-add/parent-add.component';
import { ParentEditComponent } from './components/parent-components/parent-edit/parent-edit.component';
import { MarkEditComponent } from './components/mark-components/mark-edit/mark-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminListComponent,
    AdminItemComponent,
    AdminAddComponent,
    AdminEditComponent,
    MessageListComponent,
    LoginComponent,
    AdminDashComponent,
    TeacherListComponent,
    TeacherItemComponent,
    TeacherAddComponent,
    TeacherEditComponent,
    StudentViewComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    UserHeaderComponent,
    UserProfilComponent,
    ChangePasswordComponent,
    ParentViewComponent,
    TeacherViewComponent,
    MarkAddComponent,
    ParentListComponent,
    ParentAddComponent,
    ParentEditComponent,
    MarkEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
