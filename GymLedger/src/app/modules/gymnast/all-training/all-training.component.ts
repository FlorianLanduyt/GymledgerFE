import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { GymnastDataService } from '../gymnast-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-list',
  templateUrl: './all-training.component.html',
  styleUrls: ['./all-training.component.css']
})
export class AllTrainingComponent implements OnInit {
  @Input() public gymnastId: number
  private _showDetails: boolean = false;
  private _clickedTraining: Training;

  private _fetchTrainings$: Observable<Training[]> = this._gymnastService.allTrainings$

  constructor(private _gymnastService: GymnastDataService) { 
    
  }

  ngOnInit(): void {

  }

  get trainings$(): Observable<Training[]>{
    return this._fetchTrainings$
  }

  public showDetails(selected: Training){
    
      this._showDetails = true;
    this._clickedTraining = selected
  }
 
  get show(){
    return this._showDetails;
  }

  get selectedTraining(){
    return this._clickedTraining;
  }
  

}
