import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExerciseToTrainingComponent } from '../../exercise/add-exercise-to-training/add-exercise-to-training.component';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  //@Input() public training: Training
  public training: Training;
  private _isEdit = false;

  public trainingFg: FormGroup

  constructor(
    private _gymnastService: GymnastDataService,
    private router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe(item =>
      this.training = item['training'])
  }

  public removeTraining() {
    this._gymnastService.deleteTraining(this.training.id)
      .subscribe((response: Training) => {

        this._toastr.success("De training is verwijderd", "Succes")
        this.router.navigate([''])
      }
      )
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
    config.width = "80%";
    config.height = "600px"
    config.autoFocus = true;
    config.data = {
      trainingId: this.training.id
    }

    const dialogRef = this.dialog.open(AddExerciseToTrainingComponent, config);
  }

}
