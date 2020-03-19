import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { GymnastDataService } from '../gymnast-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  @Input() public gymnastId: number
  private _fetchTrainings$: Observable<Training[]> = this._gymnastService.allTrainings$

  constructor(private _gymnastService: GymnastDataService) { 
    
  }

  ngOnInit(): void {

  }

  get trainings$(): Observable<Training[]>{
    return this._fetchTrainings$
  }
  

}
