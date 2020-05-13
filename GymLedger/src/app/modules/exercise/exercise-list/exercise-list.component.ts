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
  public exercises: Exercise[];

  @Input() public filterTitle: string = '';
  @Input() public trainingId: number = 0;
  @Input() public isAnAddExerciseToTraining: boolean;
  @Input() public isHomepage: boolean;

  public oefeningElement: string = "oefening"
  public addOefeningLink: string = ""

  constructor(
    private _exerciseService: ExerciseDataService,
    private _toastr: ToastrService
  ) {
    this.isAnAddExerciseToTraining = false;
  }

  ngOnInit(): void {
    this._exerciseService.refreshExercises$.subscribe(() => {
      if (this.trainingId == 0) {                   //The list of all the existing exercises on the ExercisePage
        this._exerciseService.exercises$.subscribe(list => {
          this.exercises = list;
          if(this.isHomepage)
            this.initListForHomepage()
        });
      } else {                                 // The list of exercises whereout to choose from for in an exercise
        this._exerciseService.getExercisesNotInTraining$(this.trainingId).subscribe(list => {
          this.exercises = list;
        });
      }
    })

    if(this.isHomepage){
      
    }
  }

  AddExistingExerciseToTraining(eId: number) {
    if (this.isAnAddExerciseToTraining) {
      this._exerciseService.addExerciseToTraining(this.trainingId, eId)
        .subscribe(
          (response: Exercise) => {
            if (response) {
              this._exerciseService.getExercisesNotInTraining$(this.trainingId).subscribe(list => {
                this.exercises = list
              });
              this._toastr.success(`\"${response.description}\" is toegevoegd aan de lijst van trainingen`, 'Success')
              this._exerciseService.refreshExercises$.next([])
            }
          },
          err => { // Kon enkel maar gebeuren bij een vorige versie
            if (err) {
              this._toastr.info("Deze oefening staat al in de lijst van trainingen", "Dubbele oefening")
              return EMPTY
            }
          }
        );
    }
  }

  get isListEmpty() {
    return this.exercises.length == 0? true:false;
  }

  initListForHomepage(){
    this.exercises = this.exercises.slice(0, 3);
  }

}
