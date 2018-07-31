import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Teacher } from '../../../models/Teacher';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  teacher: Teacher;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private teacherService: TeacherService) {
    this.teacher = new Teacher(); }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacher(id).subscribe(a => this.teacher = a);
  }

  editTeacher() {
    this.teacherService.updateTeacher(this.teacher)
    .subscribe((teacher: Teacher) =>  {
      alert('Nastavnik ' + teacher.firstName + ' ' + teacher.lastName + ' je uspešno izmenjen!');
      this.router.navigate(['/hROLE_ADMIN/teacheri']);
    });
  }

  goBack() {
    this.location.back();
  }

}
