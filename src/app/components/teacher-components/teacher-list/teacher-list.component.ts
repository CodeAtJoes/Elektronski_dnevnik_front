import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Teacher } from '../../../models/Teacher';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit, AfterViewInit {

  teacheri$: Observable<Teacher[]>;
  private searchTerm = new Subject<string>();

  constructor(private teacherService: TeacherService,
    private router:Router, private authService: AuthService) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.teacheri$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.teacherService.searchTeacheri(term))
    );
  }

  ngAfterViewInit(): void {
    this.search('');
  }

  delete(teacher: Teacher) {
    this.teacherService.deleteTeacher(teacher).subscribe(
      _ => {
         alert('Teacher ' + teacher.firstName + ' ' + teacher.lastName + ' je izbrisan!');
        this.router.navigate(['/hROLE_ADMIN/teacheri']);
      }
    );
  }

}


