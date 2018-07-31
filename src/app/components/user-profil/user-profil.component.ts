import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudentService } from '../../services/student.service';
import { Observable } from 'rxjs';
import { Student } from '../../models/Student';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/Parent';
import { Teacher } from '../../models/Teacher';
import { TeacherService } from '../../services/teacher.service';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/Admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: any;
  constructor(private authService:AuthService,private studentService: StudentService,
  private parentService:ParentService, private teacherService: TeacherService,
  private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if(this.authService.role == 'ROLE_STUDENT'){
      this.getStudentById(this.authService.id).subscribe(_ => (this.user=_));
    }
    if(this.authService.role == 'ROLE_PARENT'){
      this.getParentById(this.authService.id).subscribe(_ => (this.user=_));
    }
    if(this.authService.role == 'ROLE_TEACHER'){
      this.getTeacherById(this.authService.id).subscribe(_ => (this.user=_));
    }
    if(this.authService.role == 'ROLE_ADMIN'){
      this.getAdminById(this.authService.id).subscribe(_ => (this.user=_));
    }
  }
  getStudentById(id:string): Observable <Student> {
    return this.studentService.getStudent(+id);

  }

  getParentById(id:string): Observable <Parent> {
    return this.parentService.getParent(+id);

  }

  getTeacherById(id:string): Observable <Teacher> {
    return this.teacherService.getTeacher(+id);

  }
  getAdminById(id:string): Observable <Admin> {
    return this.adminService.getAdmin(+id);

  } 
  goBack():void{
    this.router.navigate([`/h${localStorage.getItem("role")}`]);
  }
}
