import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  //@Input() public training: Training
  public training:Training;

  constructor(
    private _gymnastService: GymnastDataService,
    private router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => 
      this.training = item['training'])
    }

    public removeTraining(){
      this._gymnastService.deleteTraining(this.training.id)
      .subscribe((response: Training) => {
          if(response)
            this._toastr.success("De training is verwijderd", "Succes")
            this.router.navigate([''])
      }
      )
      
    }

}
