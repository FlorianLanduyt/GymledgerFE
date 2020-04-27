import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseDataService } from '../exercise-data.service';
import { ExerciseEvaluation } from 'src/app/models/exerciseEvaluation.model';
import { ToastrService } from 'ngx-toastr';
import { Exercise } from 'src/app/models/exercise.model';
import { catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  @Input() public trainingId: number;
  @Input() public exerciseId: number;
  public refreshEvaluation$ = new BehaviorSubject([])

  public evaluation: ExerciseEvaluation
  public evaluationFg: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _exerciseService: ExerciseDataService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log("test")

    this._exerciseService.getEvaluation$(this.trainingId, this.exerciseId)
      .subscribe(
        (evaluation: ExerciseEvaluation) => {
          this.evaluation = evaluation;
          this.initEvaluationForm();
        },
        err => {
          this.evaluation == null;
        });


    this.initEvaluationForm();
  }


  initEvaluationForm() {
    this.evaluationFg = this._fb.group({
      score: [this.evaluation ? this.checkZero(this.evaluation.difficultyScore) : ''],
      repetitions: [this.evaluation ? this.checkZero(this.evaluation.repetitions) : ''],
      sets: [this.evaluation ? this.checkZero(this.evaluation.series) : ''],
      weight: [this.evaluation ? this.checkZero(this.evaluation.weight) : ''],
      note: [this.evaluation ? this.evaluation.note : '']
    }
    )
  }

  onSubmit() {
    if (this.evaluation == undefined) { // Bij een nieuwe evaluatie van de oefening
      const evaluation = new ExerciseEvaluation();
      this.alterEvaluation(evaluation);
      this._exerciseService.createEvaluation(this.trainingId, this.exerciseId, evaluation)
        .subscribe(() => {
          this._toastr.success("Oefening opgeslagen")
          this.ngOnInit()}
      )
      
    } else { // Bij het aanpassen van de evaluatie van de oefening
      this.alterEvaluation(this.evaluation);
      this._exerciseService.editEvaluation(this.evaluation)
        .subscribe(() => {
          this._toastr.success("Oefening opgeslagen")
          this.ngOnInit()
        },
        err => {
          this._toastr.error(`${err}`,"Onbekende fout")
        });
    }
  }


  removeExerciseFromTraining() {
    this._exerciseService.removeExerciseFromTraining(this.trainingId, this.exerciseId)
      .subscribe(
        (ex: Exercise) => {
          this._toastr.success(`${ex.description} is uit de lijst verwijderd`, "Gelukt!")
        },
        err => {
          this._toastr.error("Er heeft zich een fout voorgedaan.", "Error")
        })
      
  }

  private alterEvaluation(evaluation: ExerciseEvaluation) {
    evaluation.difficultyScore = this.evaluationFg.value.score;
    evaluation.note = this.evaluationFg.value.note;
    evaluation.repetitions = this.evaluationFg.value.repetitions;
    evaluation.series = this.evaluationFg.value.sets;
    evaluation.weight = this.evaluationFg.value.weight;
  }

  private checkZero(getal: number){
    return (getal == 0? '' : getal)
  }

}
