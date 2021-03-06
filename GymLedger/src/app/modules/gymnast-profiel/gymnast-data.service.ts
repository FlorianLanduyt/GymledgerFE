import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { Gymnast } from 'src/app/models/gymnast.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay, catchError, tap } from 'rxjs/operators';
import { Training } from 'src/app/models/training.model';
import { JsonPipe } from '@angular/common';
import { AuthenticationService } from '../user/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GymnastDataService {
  private gymnastId: string;
  private gymnastEmail: string;

  // private _trainings$ = new BehaviorSubject<Training[]>([]);
  private _refreshTrainingList$ = new Subject<void>();
  private _refreshSingleTraining$ = new Subject<void>();



  constructor(private http: HttpClient) { 
  }

  get refreshSingleTraining$(){
    return this._refreshSingleTraining$;
  }


  get refreshTrainingList$() {
    return this._refreshTrainingList$;
  }

  get gymnast$(): Observable<Gymnast> {
    return this.http.get(`${environment.apiUrl}/Gymnast/gymnastsWithTraining/${this.gymnastId}`)
    .pipe(
      tap((jsonG: any) => {
        console.log(jsonG)
      }),
      catchError(this.handleError),
      map((jsonGymnast: any): Gymnast => Gymnast.fromJson(jsonGymnast))
    );
  }

  getGymnastByEmail$(email:string): Observable<Gymnast> {
    return this.http.get(`${environment.apiUrl}/Gymnast/gymnast/${email}`)
    .pipe(
      catchError(this.handleError),
      map((jsonGymnast: any): Gymnast => Gymnast.fromJson(jsonGymnast)),
      
    );
  }

  getTrainings$(email:string): Observable<Training[]> {
    return this.http.get<Training[]>(`${environment.apiUrl}/Training/${email}/trainings`)
        .pipe(catchError(this.handleError) )
  }

   getTraining$(id: string): Observable<Training> {
    return this.http.get(`${environment.apiUrl}/Training/${id}`)
      .pipe(
        catchError(this.handleError),
        map((jsonTraining: any): Training => Training.fromJson(jsonTraining))
      )
  }

  addNewTraining(email: string, training: Training){
    return this.http
      .post(`${environment.apiUrl}/Training/${email}`, training.toJson())
      .pipe(
        tap((trainingJson: any) => {
          this._refreshTrainingList$.next()
        }),
        catchError(this.handleError), 
        map(Training.fromJson))
  }

  deleteTraining(trainingId: number){
    return this.http.delete(`${environment.apiUrl}/Training/${trainingId}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  putTraining(training: Training){
    return this.http.put(`${environment.apiUrl}/Training/edit`,training.toJsonEdit())
    .pipe(
      tap((trainingJson: any) => {
        this._refreshSingleTraining$.next()
      }),
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
