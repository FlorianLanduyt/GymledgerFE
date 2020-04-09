import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { Gymnast } from 'src/app/models/gymnast.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay, catchError, tap } from 'rxjs/operators';
import { Training } from 'src/app/models/training.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GymnastDataService {
  private gymnastId: string;

  // private _trainings$ = new BehaviorSubject<Training[]>([]);
  private _refreshTrainingList$ = new Subject<void>();


  private _trainings: Training[]

  constructor(private http: HttpClient) { 
    this.gymnastId = '23229b9b-d8f7-428c-9926-b0efa9096add';
    // this.trainings$.subscribe((trainings: Training[]) => {
    //   this._trainings = trainings;
    //   this._trainings$.next(this._trainings)
    // })
  }

  // get allTrainings$(): Observable<Training[]> {
  //   return this._trainings$;
  // }

  get refreshTrainingList$() {
    return this._refreshTrainingList$;
  }

  get gymnast$(): Observable<Gymnast> {
    return this.http.get(`${environment.apiUrl}/Gymnast/gymnastsWithTraining/${this.gymnastId}`).pipe(
      catchError(this.handleError),
      map((jsonGymnast: any): Gymnast => Gymnast.fromJson(jsonGymnast))
    );
  }

  get trainings$(): Observable<Training[]> {
    return this.http.get<Training[]>(`${environment.apiUrl}/Training/${this.gymnastId}/trainings`)
        .pipe(
          tap( training => console.log("Products: ", JSON.stringify(training))),
          catchError(this.handleError),
          //map((list: any): Training[] => list.map(Training.fromJson))
          )
  }

   getTraining$(id: string): Observable<Training> {
    return this.http.get(`${environment.apiUrl}/Training/${id}`)
      .pipe(
        catchError(this.handleError),
        map((jsonTraining: any): Training => Training.fromJson(jsonTraining))
      )
  }

  addNewTraining(training: Training){
    console.log(training.toJson())
    return this.http
      .post(`${environment.apiUrl}/Training/${this.gymnastId}`, training.toJson())
      .pipe(
        tap((trainingJson: any) => {
          this._refreshTrainingList$.next()
        }),
        catchError(this.handleError), map(Training.fromJson))
        .subscribe()
  }

  deleteTraining(trainingId: number){
    return this.http.delete(`${environment.apiUrl}/Training/${trainingId}`)
    .pipe(
      tap(() => {
        this._refreshTrainingList$.next();
      }),
      catchError(this.handleError),
      tap((jsonTraining: any) => {
        console.log(jsonTraining)
      }),
      //map((jsonTraining: any): Training => Training.fromJson(jsonTraining))
    )
  }

  putTraining(training: Training){
    console.log(training.toJson())
    return this.http.put(`${environment.apiUrl}/Training/edit`,training.toJsonEdit())
    .pipe(
      catchError(this.handleError),
      map((jsonTraining: any): Training => Training.fromJson(jsonTraining))
    )
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
