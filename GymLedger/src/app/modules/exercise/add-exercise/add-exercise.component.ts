import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseDataService } from '../exercise-data.service';
import { AuthenticationService } from '../../user/authentication.service';
import { Exercise } from 'src/app/models/exercise.model';


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  public exerciseFg: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _exerciseService: ExerciseDataService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.exerciseFg = this.fb.group({
      name: ['']
    })
  }

  cancel(){
    this.dialogRef.close()
  }

  submit(){
    const exercise = new Exercise();

    exercise.description = this.exerciseFg.value.name;
    exercise.image = "";

    this._authService.user$.subscribe(email => {
      if(email){
        this._exerciseService.addExercise(exercise, email).subscribe()
      }
    }).unsubscribe()

    this.dialogRef.close();

    
  }

}
