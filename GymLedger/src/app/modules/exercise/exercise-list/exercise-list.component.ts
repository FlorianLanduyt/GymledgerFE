import { Component, OnInit } from '@angular/core';
import { ExerciseDataService } from '../exercise-data.service';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  private _exercises$: Observable<Exercise[]>;


  constructor(private _exerciseService: ExerciseDataService) { 
    this._exercises$ = this._exerciseService.exercises$
  }

  ngOnInit(): void {
  }

  public get exercises$() {
    return this._exercises$;
  }


}
