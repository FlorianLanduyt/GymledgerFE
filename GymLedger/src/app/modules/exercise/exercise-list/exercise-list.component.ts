import { Component, OnInit, Input } from '@angular/core';
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
  @Input() public filterTitle: string = '';
  
  
  @Input() public listOfGymnast: boolean = false;

  constructor(
    private _exerciseService: ExerciseDataService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { 
  }

  ngOnInit(): void {
    if (this.listOfGymnast === false){
      this._exercises$ = this._exerciseService.exercises$
    } else {
      //this._exercises$ = this._exerciseService.getExercisesOfTraining$;
    }
  }

  public get exercises$() {
    return this._exercises$;
  }

  


}
