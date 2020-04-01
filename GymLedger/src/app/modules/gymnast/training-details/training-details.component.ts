import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  //@Input() public training: Training
  public training:Training;

  constructor(
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => 
      this.training = item['training'])
   
    }

}
