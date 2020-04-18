import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  public filterExercise$ = new Subject<string>();
  public filterTitle: string = '';

  constructor() { 

    this.filterExercise$
    .pipe(
      distinctUntilChanged(),
      debounceTime(200),
      map((val) => val.toLowerCase())
    )
    .subscribe((val) => (this.filterTitle = val));
  }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.filterTitle = filter;
  }

}
