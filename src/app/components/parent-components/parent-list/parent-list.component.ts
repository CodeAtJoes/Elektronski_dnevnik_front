import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Parent } from '../../../models/Parent';
import { ParentService } from '../../../services/parent.service';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {

  parenti$: Observable<Parent[]>;
  private searchTerm = new Subject<string>();

  constructor(private parentService: ParentService,
              private authService: AuthService,
              private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.parenti$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.parentService.searchParenti(term))
    );
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(parent: Parent) {
    this.parentService.deleteParent(parent).subscribe(
      _ => {
         alert('Parent ' + parent.firstName + ' ' + parent.lastName + ' je izbrisan!');
        this.router.navigate(['/hROLE_ADMIN/parenti']);
      }
    );
  }


}
