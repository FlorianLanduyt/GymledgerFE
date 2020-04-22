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

  public exercises$: Observable<Exercise[]>

  constructor(
    private _exerciseService: ExerciseDataService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._exerciseService.refreshExercises$.subscribe(() => {
      this.exercises$ = this._exerciseService.getExercisesOfTraining$(this.trainingId)

      // const exercises = this._exerciseService.getExercisesOfTraining$(this.trainingId)
      // const evaluations = this._exerciseService.getEvaluationsOfTraining$(this.trainingId)

      // const newExercises = combineLatest(exercises, evaluations);
      // // console.log(exercises);
      // // console.log(evaluations);

      // newExercises.subscribe(ex => {
      //   console.log(ex)
      // })
    })
  }
}

