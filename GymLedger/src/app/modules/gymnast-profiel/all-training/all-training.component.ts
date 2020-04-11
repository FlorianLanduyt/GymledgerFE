import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { GymnastDataService } from '../gymnast-data.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './all-training.component.html',
  styleUrls: ['./all-training.component.css']
})
export class AllTrainingComponent implements OnInit {
  @Input() public gymnastId: number
  private _showDetails: boolean = false;
  private _clickedTraining: Training;
  public errorMessage: string = ""

  // private _fetchTrainings$: Observable<Training[]>
  private _trainingList: Training[];

  constructor(
    private _gymnastService: GymnastDataService,
    private _authService: AuthenticationService) { 
    
  }

  ngOnInit(): void {
    this._gymnastService.refreshTrainingList$.subscribe(() => {
      this.getAllTrainings()
      });

      this.getAllTrainings()
    }
  

  private getAllTrainings() {
    this._authService.user$.subscribe((email: string) => {
      this._gymnastService.getTrainings$(email).subscribe((t: Training[]) => {
        this._trainingList = t;
      });
    }
    )
    
  }
  
    // )
    // this.fetchTrainings()
  

  // private fetchTrainings(){
  //   this._gymnastService.allTrainings$.subscribe((t: []) => {
  //     this._trainings = t
  //   })

  // this._fetchTrainings$ = this._gymnastService.allTrainings$.pipe(
  //   catchError(err => {
  //     this.errorMessage = err;
  //     return EMPTY
  //   })
  // )



  
  get trainings(): Training[]{
    return this._trainingList
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
