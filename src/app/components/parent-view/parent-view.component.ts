import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from '../../services/parent.service';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {

  children$: Observable<any>;
  sm$: Observable<any>;
  selectedChild: any;
  constructor(private parentService: ParentService, private studentService: StudentService) { }

  ngOnInit() {
    this.getChildren(localStorage.getItem('id'));
  }

  getChildren(id: string): Observable<any> {
    return this.children$=this.parentService.getChildren(id);
  }
  
  onSelect(a:any):void {
    this.selectedChild=a;
    this.sm$ = this.studentService.getSubjectMarks(a.id);
  }

}
