import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTrainingComponent } from '../add-training/add-training.component';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.css']
})
export class TrainingPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  initNewTraining() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.width = "60%";
    // config.height = "600px"
    config.autoFocus = true;

    const dialogRef = this.dialog.open(AddTrainingComponent, config);

    dialogRef.afterClosed().subscribe(() => {
      //this.exercises$ = this._exercisService.getExercisesOfTraining$(this.training.id);
      // this._exerciseService.refreshExercises$.next
    })
  }



}
