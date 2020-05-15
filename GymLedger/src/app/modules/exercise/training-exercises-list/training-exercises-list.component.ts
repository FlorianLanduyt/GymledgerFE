import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseDataService } from '../exercise-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-training-exercises-list',
  templateUrl: './training-exercises-list.component.html',
  styleUrls: ['./training-exercises-list.component.css']
})
export class TrainingExercisesListComponent implements OnInit {
  @Input() public trainingId: number;
  public exerciseEvaulation: FormGroup

  private _exercises: Exercise[];

  public element = "oefening aan training"


  constructor(
    private _exerciseService: ExerciseDataService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._exerciseService.refreshExercises$.subscribe(() => {
      this.fetchExercises$();
    })
    this.fetchExercises$();
    
  }

  fetchExercises$(){
    this._exerciseService.getExercisesOfTraining$(this.trainingId).subscribe(list => {
      this._exercises = list;
    })
  }

  get exercises(): Exercise[]{
    return this._exercises;
  }

  get isListEmpty(){
    return this._exercises.length == 0? true: false;
  }

}



