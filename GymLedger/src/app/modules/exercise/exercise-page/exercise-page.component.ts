import { Component, OnInit, Input } from '@angular/core';
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
  public heading: string;
  @Input() trainingId: number = 0;
  @Input() isAnAddExerciseToTraining;
   

  constructor() { 
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
    if(this.trainingId == 0){
      this.heading = "Alle Oefeningen"
    } else {
      this.heading = "Selecteer een of meerdere oefeningen"
    }
  }

  applyFilter(filter: string) {
    this.filterTitle = filter;
  }

  




  

}
