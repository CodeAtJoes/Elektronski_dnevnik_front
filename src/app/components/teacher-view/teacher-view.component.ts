import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherService } from '../../services/teacher.service';
import { MarkService } from '../../services/mark.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {
  timetables$:Observable<any>;
  studentMarks$:Observable<any>;
  selectedTimetable:any;
  pickTT:any;
  pickST:any;
  constructor(private teacherService: TeacherService,
              private markService: MarkService) { }

  ngOnInit() {
    this.getTimetables(localStorage.getItem('id'));
  }

  getTimetables(id: string): Observable<any> {
    return this.timetables$=this.teacherService.getTimetables(id);
  }
  getStudentMarks(id: string): void {
    this.studentMarks$=this.teacherService.getStudentMarks(id);
  }  
  makeFinal(c:string,d:string):void {
    console.log(c);
    console.log(d);
    this.markService.postFinal(c,d).subscribe(_ => {
      alert('Ocena je upisana!');
     // this.router.navigate(['/hROLE_TEACHER']);
      });
  }
  onSelect(a:any):void {
    this.selectedTimetable=a;
    this.getStudentMarks(""+a.id);
  }
  onPick(a:any,b:any):void {
    //this.pickST=a;
    //this.pickTT=b;
    console.log(a);
    console.log(b);
    this.makeFinal(""+a,""+b);
  }
  

}
