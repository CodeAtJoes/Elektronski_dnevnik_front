import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../services/student.service";
import { Observable } from "rxjs";
import { ParentService } from "../../services/parent.service";
import { TeacherService } from "../../services/teacher.service";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private teacherService: TeacherService,
    private adminService: AdminService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {}

  changePassword(oldPassword, newPassword): void {
    if (localStorage.getItem("role") == "ROLE_STUDENT") {
      this.studentService
        .changePassword(oldPassword, newPassword)
        .subscribe(_ => {
          alert("Lozinka je uspešno izmenjena!");
          this.router.navigate(["/login"]);
        });
    }
    if (localStorage.getItem("role") == "ROLE_PARENT") {
      this.parentService
        .changePassword(oldPassword, newPassword)
        .subscribe(_ => {
          alert("Lozinka je uspešno izmenjena!");
          this.router.navigate(["/login"]);
        });
    }
    if (localStorage.getItem("role") == "ROLE_TEACHER") {
      this.teacherService
        .changePassword(oldPassword, newPassword)
        .subscribe(_ => {
          alert("Lozinka je uspešno izmenjena!");
          this.router.navigate(["/login"]);
        });
    }
    if (localStorage.getItem("role") == "ROLE_ADMIN") {
      this.adminService
        .changePassword(oldPassword, newPassword)
        .subscribe(_ => {
          alert("Lozinka je uspešno izmenjena!");
          this.router.navigate(["/login"]);
        });
    }
  }
  goBack() {
    this.location.back();
  }
}
