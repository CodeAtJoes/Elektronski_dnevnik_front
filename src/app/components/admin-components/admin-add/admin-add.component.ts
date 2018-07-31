import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Admin } from '../../../models/Admin';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  admin: Admin;


  constructor(private router: Router,
    private location: Location,
    private adminService: AdminService) {
    this.admin = new Admin();
  }

  ngOnInit() {

  }




  addAdmin(firstName: string, lastName: string, email: string, password: string) {
    this.admin.firstName = firstName;
    this.admin.lastName = lastName;
    this.admin.email = email;
    this.admin.password = password;


    this.adminService.addAdmin(this.admin)
      .subscribe((admin: Admin) => {
        alert('Admin ' + admin.firstName + ' ' + admin.lastName + ' je uspešno dodat!');
        this.router.navigate(['/hROLE_ADMIN/admini']);
      });
  }

  goBack() {
    this.location.back();
  }

}
