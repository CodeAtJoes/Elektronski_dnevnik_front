import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Student } from '../../../models/Student';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  studenti$: Observable<Student[]>;
  private searchTerm = new Subject<string>();

  constructor(private studentService: StudentService,
     private authService: AuthService,
    private router:Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.studenti$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.studentService.searchStudenti(term))
    );
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(student: Student) {
    this.studentService.deleteStudent(student).subscribe(
      _ => {
         alert('Student ' + student.firstName + ' ' + student.lastName + ' je izbrisan!');
        this.router.navigate(['/hROLE_ADMIN/studenti']);
      }
    );
  }

}
