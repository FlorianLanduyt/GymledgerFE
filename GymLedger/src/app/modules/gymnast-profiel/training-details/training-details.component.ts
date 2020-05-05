import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExerciseToTrainingComponent } from '../../exercise/add-exercise-to-training/add-exercise-to-training.component';
import { ExerciseDataService } from '../../exercise/exercise-data.service';
import { AddTrainingComponent } from '../add-training/add-training.component';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  public training: Training;
  private _isEdit = false;

  public feelingBefore: string;
  public feelingAfter: string;

  public trainingFg: FormGroup

  constructor(
    private _gymnastService: GymnastDataService,
    private _exerciseService: ExerciseDataService,
    private router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this._route.data.subscribe(item => this.training = item['training'])


    this.feelingBefore = this.training.feelingBeforeTraining;
    this.feelingAfter = this.training.feelingAfterTraining;
  }

  // private checkZero(feeling: string): string {
  //   return feeling == '0' ? "/" : feeling
  // }


  public removeTraining() {
    this._gymnastService.deleteTraining(this.training.id)
      .subscribe((response: Training) => {
        this._toastr.success("De training is verwijderd", "Succes")
        this.router.navigate(['list'])
      })
  }

  public changeToEdit() {
    this._isEdit = !this._isEdit;
  }



  public get isEdit() {
    return this._isEdit;
  }
  public set isEdit(value) {
    this._isEdit = value;
  }


  initAddToTrainingForm() {
    const config = new MatDialogConfig();

    // config.disableClose = true;
    // config.width = "60%";
    config.height = "800px"
    config.autoFocus = true;
    config.data = {
      trainingId: this.training.id
    }

    const dialogRef = this.dialog.open(AddExerciseToTrainingComponent, config);

    dialogRef.afterClosed().subscribe(() => {
      //this.exercises$ = this._exercisService.getExercisesOfTraining$(this.training.id);
      this._exerciseService.refreshExercises$.next
    })
  }

  initEditTraining() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.width = "80%";
    config.autoFocus = true;
    config.data = {
      training: this.training
    }

    const dialogRef = this.dialog.open(AddTrainingComponent, config);

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
