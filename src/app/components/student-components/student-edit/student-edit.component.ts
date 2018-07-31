import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/Student';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student: Student;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private studentService: StudentService,
              private classService: ClassService) {
    this.student = new Student();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id).subscribe(a => this.student = a);
    //this.classService.getClass()
  }


  editStudent() {
    this.studentService.updateStudent(this.student)
    .subscribe((student: Student) =>  {
      alert('Učenik ' + student.firstName + ' ' + student.lastName + ' je uspešno izmenjen!');
      this.router.navigate(['/hROLE_ADMIN/studenti']);
    });
  }

  goBack() {
    this.location.back();
  }

  //  addToClass(clsId:number):void{
  //     const id = +this.route.snapshot.paramMap.get('id');
  //     this.studentService.AddStudentToClass(""+id,""+clsId).subscribe((student: Student) =>  {
  //       alert('Učenik je uspešno izmenjen!');
  //       this.router.navigate(['/hROLE_ADMIN/studenti']);
  //     });
  // }

}
