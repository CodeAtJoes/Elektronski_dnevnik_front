import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../../../models/Student';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  student: Student;


  constructor(private router: Router,
    private location: Location,
    private studentService: StudentService) {
    this.student = new Student();
  }


  ngOnInit() {
  }

  addStudent(firstName: string, lastName: string, email: string, password: string) {
    this.student.firstName = firstName;
    this.student.lastName = lastName;
    this.student.email = email;
    this.student.password = password;

    this.studentService.addStudent(this.student)
      .subscribe((student: Student) => {
        alert('Učenik ' + student.firstName + ' ' + student.lastName + ' je uspešno dodat!');
        this.router.navigate(['/hROLE_ADMIN/studenti']);
      });
  }

  goBack() {
    this.location.back();
  }


}
