import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exercise-to-training',
  templateUrl: './add-exercise-to-training.component.html',
  styleUrls: ['./add-exercise-to-training.component.css']
})
export class AddExerciseToTrainingComponent implements OnInit {
  private _trainingId: number;
  public isAddForm = true;

  constructor(
    public dialogRef: MatDialogRef<AddExerciseToTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this._trainingId = this.data.trainingId
  }

  get trainingId(): number{
    return this._trainingId;
  }

}
