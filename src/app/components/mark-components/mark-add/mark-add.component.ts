import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MarkTypeService } from '../../../services/mark-type.service';
import { MarkDto } from '../../../models/MarkDto';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkType } from '../../../models/MarkType';
import { AuthService } from '../../../services/auth.service';
import { MarkService } from '../../../services/mark.service';


@Component({
  selector: 'app-mark-add',
  templateUrl: './mark-add.component.html',
  styleUrls: ['./mark-add.component.css']
})
export class MarkAddComponent implements OnInit {
  markTypes: MarkType[];
  mark: MarkDto;
  constructor(private markTypeService: MarkTypeService,
              private markService: MarkService,
              private location: Location,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router,
              ) {this.mark= new MarkDto() }

  ngOnInit() {
    this.getMarkTypes();
  }

  getMarkTypes(): void {
    this.markTypeService.getMarkType().subscribe(
      t => { this.markTypes = t;}
    );
  }

  submitMark(mv:number,mtt:number,me: string,n:string):void{
    this.mark.markValue=""+mv;
    this.mark.markTypeId=""+mtt;
    //console.log(mtt);
    this.mark.markEarned="16-10-2017";
    this.mark.note=n;
    this.mark.studentId=this.route.snapshot.paramMap.get("stId");
    this.mark.timetableId=this.route.snapshot.paramMap.get("ttId");
    this.markService.addMark(this.mark).subscribe(_ => {
    alert('Ocena je upisana!');
    this.router.navigate(['/hROLE_TEACHER']);
    });
  }
  goBack() {
    this.location.back();
  }

  // private df(inDate:string): string {

  // }
}
