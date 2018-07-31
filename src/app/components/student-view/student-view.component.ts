import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectMarks } from '../../models/SubjectMarks';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  sm$: Observable<SubjectMarks[]>;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getSM(localStorage.getItem("id"));
  }
   getSM(id: string): void {
     this.sm$ = this.studentService.getSubjectMarks(id)
   }
}
