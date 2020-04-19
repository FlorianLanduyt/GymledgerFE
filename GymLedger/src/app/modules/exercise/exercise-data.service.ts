import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Training } from 'src/app/models/training.model';
import { Exercise } from 'src/app/models/exercise.model';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDataService {

 
  constructor(
    private http: HttpClient
    ) {}


  get exercises$(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiUrl}/Exercise`)
    .pipe(
      tap((json: any) => {
        // console.log(json)
      }),
      catchError(this.handleError),
      map((list : any): Exercise[] => list.map(Exercise.fromJson))
    );
  }

  // getExercisesOfTraining$(trainingId: number){
  //   return this.http.get<Exercise[]>(`${environment.apiUrl}/Training/`)
  // }

  addExerciseToTraining(trainingId: number, exerciseId: number){
    return this.http
    .post(`${environment.apiUrl}/Exercise/${trainingId}/${exerciseId}`, null)
    .pipe(
      catchError(this.handleError)
    )
    
    .subscribe(() => {
     // this.exercises$.next();
    })
  }



  handleError(err: any) : Observable<never>{
    let errorMsg: any;
    if (err instanceof HttpErrorResponse) {
      errorMsg = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMsg = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMsg)
  }




}
