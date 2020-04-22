import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseDataService } from '../exercise-data.service';
import { ExerciseEvaluation } from 'src/app/models/exerciseEvaluation.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  @Input() public trainingId: number;
  @Input() public exerciseId: number;

  public evaluation:ExerciseEvaluation
  public evaluationFg: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _exerciseService: ExerciseDataService) {

  }

  ngOnInit(): void {
    this._exerciseService.getExerciseEvaluation$(this.trainingId, this.exerciseId)
      .subscribe(
        (evaluation: ExerciseEvaluation) => {
          this.evaluation = evaluation;
          //if (this.evaluation != null) {
            this.initEvaluationForm();
          //}
        },
        err => {
          this.evaluation == null;
        });


    this.initEvaluationForm();
  }


  initEvaluationForm() {
    this.evaluationFg = this._fb.group({
      score: [this.evaluation? this.evaluation.difficultyScore:''],
      repetitions: [this.evaluation? this.evaluation.repetitions: ''],
      sets: [this.evaluation? this.evaluation.series: ''],
      weight: [this.evaluation? this.evaluation.weight: ''],
      note: [this.evaluation? this.evaluation.note: '']
    }
    )
  }

}
