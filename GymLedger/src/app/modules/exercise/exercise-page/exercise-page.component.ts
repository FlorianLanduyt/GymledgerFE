import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  public filterExercise$ = new Subject<string>();
  public filterTitle: string = '';
  public heading: string;
  @Input() trainingId: number = 0;
  @Input() isAnAddExerciseToTraining: boolean;


  constructor(
    public dialog: MatDialog

  ) {
    this.isAnAddExerciseToTraining = false;

    this.filterExercise$
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => (this.filterTitle = val));
  }

  ngOnInit(): void {
    if (this.trainingId == 0) {
      this.heading = "Alle Oefeningen"
    } else {
      this.heading = "Klik de gewenste oefening"
    }
  }

  applyFilter(filter: string) {
    this.filterTitle = filter;
  }

  initNewExercise() {
    const config = new MatDialogConfig();

    //config.height = "400px"
    config.autoFocus = true;
    config.data = {

    }

    const dialogRef = this.dialog.open(AddExerciseComponent, config);

    // dialogRef.afterClosed().subscribe(() => {
      
    // })
  }








}
