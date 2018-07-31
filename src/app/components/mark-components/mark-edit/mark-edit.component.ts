import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Mark } from '../../../models/Mark';
import { MarkType } from '../../../models/MarkType';
import { MarkService } from '../../../services/mark.service';
import { MarkTypeService } from '../../../services/mark-type.service';

@Component({
  selector: 'app-mark-edit',
  templateUrl: './mark-edit.component.html',
  styleUrls: ['./mark-edit.component.css']
})
export class MarkEditComponent implements OnInit {

  mark: Mark;
  markTypes: MarkType[]=[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private markService: MarkService,
              private markTypeService: MarkTypeService) {
                this.mark = new Mark();
               }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.markService.getMark(id).subscribe(a => this.mark = a);
    this.getMarkTypes();
  }

  getMarkTypes(){
    this.markTypeService.getMarkType().subscribe(t => this.markTypes = t)
  }

  editMark(){
    this.markService.updateMark(this.mark).subscribe(
      (mark:Mark) =>{alert('Ocena sa id: ' + mark.id + ' je uspešno izmenjena!');
     this.router.navigate(['/hROLE_TEACHER']);
    }
    );
  }

  delete() {
    this.markService.deleteMark(this.mark).subscribe(
      _ => {
         alert('Ocena sa id: ' +this.mark.id +' je izbrisana!');
        this.router.navigate(['/hROLE_TEACHER']);
      }
    );
  }
  goBack() {
    this.location.back();
  }

}
