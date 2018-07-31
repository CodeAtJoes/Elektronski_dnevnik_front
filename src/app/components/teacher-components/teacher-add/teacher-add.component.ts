import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Teacher } from '../../../models/Teacher';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  teacher: Teacher;

  constructor(
    private router: Router,
    private location: Location,
    private teacherService: TeacherService) {
    this.teacher = new Teacher(); }

  ngOnInit() {
  }

  addTeacher(firstName: string, lastName: string, email: string, password: string) {
    this.teacher.firstName = firstName;
    this.teacher.lastName = lastName;
    this.teacher.email = email;
    this.teacher.password = password;

    this.teacherService.addTeacher(this.teacher)
      .subscribe((teacher: Teacher) => {
        alert('Nastavnik ' + teacher.firstName + ' ' + teacher.lastName + ' je uspešno dodat!');
        this.router.navigate(['/hROLE_ADMIN/teacheri']);
      });
  }

  goBack() {
    this.location.back();
  }

}
