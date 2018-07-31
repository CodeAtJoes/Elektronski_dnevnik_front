import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Parent } from '../../../models/Parent';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'app-parent-add',
  templateUrl: './parent-add.component.html',
  styleUrls: ['./parent-add.component.css']
})
export class ParentAddComponent implements OnInit {

  parent: Parent;


  constructor(private router: Router,
    private location: Location,
    private parentService: ParentService) {
    this.parent = new Parent();
  }

  ngOnInit() {

  }




  addParent(firstName: string, lastName: string, email: string, password: string) {
    this.parent.firstName = firstName;
    this.parent.lastName = lastName;
    this.parent.email = email;
    this.parent.password = password;


    this.parentService.addParent(this.parent)
      .subscribe((parent: Parent) => {
        alert('Roditelj ' + parent.firstName + ' ' + parent.lastName + ' je uspešno dodat!');
        this.router.navigate(['/hROLE_ADMIN/parenti']);
      });
  }

  goBack() {
    this.location.back();
  }

}
