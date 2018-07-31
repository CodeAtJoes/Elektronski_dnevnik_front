import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Admin } from '../../../models/Admin';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  admin: Admin;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private adminService: AdminService) {
    this.admin = new Admin();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.adminService.getAdmin(id).subscribe(a => this.admin = a);
  }


  editAdmin() {
    this.adminService.updateAdmin(this.admin)
    .subscribe((admin: Admin) =>  {
      alert('Admin ' + admin.firstName + ' ' + admin.lastName + ' je uspešno izmenjen!');
      this.router.navigate(['/hROLE_ADMIN/admini']);
    });
  }

  goBack() {
    this.location.back();
  }

}
