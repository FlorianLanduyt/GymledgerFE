import { Component, OnInit } from '@angular/core';
import { ExerciseDataService } from '../exercise-data.service';
import { Observable, Subject } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { Router, ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  private _exercises$: Observable<Exercise[]>;
  //public exercises: Exercise[];
  public filterTitle: string = '';
  public filterExercise$ = new Subject<string>();

  constructor(
    private _exerciseService: ExerciseDataService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { 

      this.filterExercise$
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => (this.filterTitle = val));
    
  }

  ngOnInit(): void {
    this._exercises$ = this._exerciseService.exercises$
  }

  public get exercises$() {
    return this._exercises$;
  }

  applyFilter(filter: string) {
    this.filterTitle = filter;
  }


}
