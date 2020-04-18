import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDataService } from '../exercise-data.service';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  //private _exercises$: Observable<Exercise[]>;
  @Input() public exercises: Exercise[];
  @Input() public filterTitle: string = '';

  constructor(
    private _exerciseService: ExerciseDataService
    ) { 
  }

  ngOnInit(): void {
    if (!this.exercises){
      this._exerciseService.exercises$.subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      })
    }
  }

  

  


}
