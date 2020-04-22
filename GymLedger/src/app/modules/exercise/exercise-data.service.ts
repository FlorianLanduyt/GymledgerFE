import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { Training } from 'src/app/models/training.model';
import { Exercise } from 'src/app/models/exercise.model';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { ExerciseEvaluation } from 'src/app/models/exerciseEvaluation.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDataService {
  private exerciseEvaluationsUrl: string = `${environment.apiUrl}/ExerciseEvaluations`
  private exercisesUrl: string = `${environment.apiUrl}/Exercise`



  private _refreshExercises = new BehaviorSubject([])

  constructor(
    private http: HttpClient
  ) { }

  get refreshExercises$() {
    return this._refreshExercises;
  }


  get exerciseEvaluations$(): Observable<ExerciseEvaluation[]> {
    return this.http.get(`${environment.apiUrl}/ExerciseEvaluation`)
      .pipe(
        catchError(this.handleError),
        map((json: any): ExerciseEvaluation[] => json.map(ExerciseEvaluation.fromJson))
      )
  }

  getEvaluationsOfTraining$(trainingId: number): Observable<ExerciseEvaluation[]> {
    return this.http.get(`${environment.apiUrl}/ExerciseEvaluation/${trainingId}`)
      .pipe(
        catchError(this.handleError),
        map((json: any): ExerciseEvaluation[] => json.map(ExerciseEvaluation.fromJson))
      )
  }

  getExerciseEvaluation$(trainingId: number, exerciseId: number): Observable<ExerciseEvaluation> {
    return this.http.get(`${environment.apiUrl}/ExerciseEvaluation/${trainingId}/${exerciseId}`)
    .pipe(
      catchError(this.handleError),
      map((evalJson: any) : ExerciseEvaluation => ExerciseEvaluation.fromJson(evalJson)),
      tap((evalu:ExerciseEvaluation) => {
        // console.log(evalu)
      })
    )
  }

  get exercises$(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiUrl}/Exercise`)
      .pipe(
        tap((json: any) => {
          // console.log(json)
        }),
        catchError(this.handleError),
        map((list: any): Exercise[] => list.map(Exercise.fromJson))
      );
  }

  getExercisesOfTraining$(trainingId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiUrl}/Exercise/${trainingId}`)
      .pipe(
        catchError(this.handleError),
        map((list: any): Exercise[] => list.map(Exercise.fromJson))
      )
  }

  getExercisesNotInTraining$(trainingId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiUrl}/Exercise/oefeningNietInTraining/${trainingId}`)
      .pipe(
        catchError(this.handleError),
        map((list: any): Exercise[] => list.map(Exercise.fromJson))
      )
  }

  addExerciseToTraining(trainingId: number, exerciseId: number) {
    return this.http
      .post(`${environment.apiUrl}/Exercise/${trainingId}/${exerciseId}`, null)
      .pipe(
        tap(() => this.refreshExercises$.next([])),
        catchError(this.handleError),
        map((exerciseJson: any): Exercise => Exercise.fromJson(exerciseJson))
      )
  }



  handleError(err: any): Observable<never> {
    let errorMsg: any;
    if (err instanceof HttpErrorResponse) {
      errorMsg = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMsg = `an unknown error occurred ${err}`;
    }
    return throwError(errorMsg)
  }




}
