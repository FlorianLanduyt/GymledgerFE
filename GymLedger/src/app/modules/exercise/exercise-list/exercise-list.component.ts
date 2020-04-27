import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDataService } from '../exercise-data.service';
import { Observable, EMPTY } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  public exercises$: Observable<Exercise[]>;
  @Input() public filterTitle: string = '';
  @Input() public trainingId: number = 0;
  @Input() public isAnAddExerciseToTraining: boolean;

  constructor(
    private _exerciseService: ExerciseDataService,
    private _toastr: ToastrService
  ) {
    this.isAnAddExerciseToTraining = false;
  }

  ngOnInit(): void {
    this._exerciseService.refreshExercises$.subscribe(() => {
      if (this.trainingId == 0) {                   //The list of all the existing exercises on the ExercisePage
        this.exercises$ = this._exerciseService.exercises$;
      } else {                                 // The list of exercises whereout to choose from for in an exercise
        this.exercises$ = this._exerciseService.getExercisesNotInTraining$(this.trainingId);
      }
    })
  }

  AddExistingExerciseToTraining(eId: number) {
    if (this.isAnAddExerciseToTraining) {
      this._exerciseService.addExerciseToTraining(this.trainingId, eId)
        .subscribe(
          (response: Exercise) => {
            if (response) {
              this.exercises$ = this._exerciseService.getExercisesNotInTraining$(this.trainingId);
              this._toastr.success(`\"${response.description}\" is toegevoegd aan de lijst van trainingen`, 'Success')
              this._exerciseService.refreshExercises$.next([])
            }
          },
          err => {
            if (err) {
              this._toastr.info("Deze oefening staat al in de lijst van trainingen", "Dubbele oefening")
              return EMPTY
            }
          }
        );
    }
  }
}
