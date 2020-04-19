import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDataService } from '../exercise-data.service';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  //private _exercises$: Observable<Exercise[]>;
  @Input() public exercises: Exercise[];
  @Input() public filterTitle: string = '';
  @Input() public trainingId: number = 0;
  @Input() public isAnAddExerciseToTraining = false;

  constructor(
    private _exerciseService: ExerciseDataService
    ) { 
  }

  ngOnInit(): void {
    if (!this.exercises){
      this._exerciseService.exercises$.subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      })
    }
  }

  AddExistingExerciseToTraining(eId: number) {
    console.log('oefening:', eId);
    console.log('training:', this.trainingId);
    if(this.trainingId != 0){
      this._exerciseService.addExerciseToTraining(this.trainingId, eId)
    }
    

    
    
  }

  

  

  


}
