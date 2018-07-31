import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Admin } from '../../../models/Admin';
import { AdminService } from '../../../services/admin.service';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, AfterViewInit {

  admini$: Observable<Admin[]>;
  private searchTerm = new Subject<string>();

  constructor(private adminService: AdminService,
              private authService: AuthService,
              private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.admini$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.adminService.searchAdmini(term))
    );
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(admin: Admin) {
    this.adminService.deleteAdmin(admin).subscribe(
      _ => {
         alert('Admin ' + admin.firstName + ' ' + admin.lastName + ' je izbrisan!');
        this.router.navigate(['/hROLE_ADMIN/admini']);
      }
    );
  }

}
