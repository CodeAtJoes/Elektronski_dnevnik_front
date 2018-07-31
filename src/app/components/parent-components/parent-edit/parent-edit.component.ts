import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Parent } from '../../../models/Parent';
import { ParentService } from '../../../services/parent.service';


@Component({
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.css']
})
export class ParentEditComponent implements OnInit {

  parent: Parent;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private parentService: ParentService) {
    this.parent = new Parent();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.parentService.getParent(id).subscribe(a => this.parent = a);
  }


  editParent() {
    this.parentService.updateParent(this.parent)
    .subscribe((parent: Parent) =>  {
      alert('Roditelj ' + parent.firstName + ' ' + parent.lastName + ' je uspešno izmenjen!');
      this.router.navigate(['/hROLE_ADMIN/parenti']);
    });
  }

  goBack() {
    this.location.back();
  }

}

