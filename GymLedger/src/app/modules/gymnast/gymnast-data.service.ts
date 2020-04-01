import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Gymnast } from 'src/app/models/gymnast.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay, catchError } from 'rxjs/operators';
import { Training } from 'src/app/models/training.model';

@Injectable({
  providedIn: 'root'
})
export class GymnastDataService {
  private gymnastId: number;
  private _trainings$ = new BehaviorSubject<Training[]>([]);
  private _trainings: Training[]

  constructor(private http: HttpClient) { 
    this.gymnastId = 2;
    this.trainings$.subscribe((trainings: Training[]) => {
      this._trainings = trainings;
      this._trainings$.next(this._trainings)
    })
  }

  get allTrainings$(): Observable<Training[]> {
    return this._trainings$;
  }

  get gymnast$(): Observable<Gymnast> {
    return this.http.get(`${environment.apiUrl}/Gymnast/gymnastsWithTraining/${this.gymnastId}`).pipe(
      catchError(this.handleError),
      map((jsonGymnast: any): Gymnast => Gymnast.fromJson(jsonGymnast))
    );
  }

  get trainings$(): Observable<Training[]> {
    return this.http.get(`${environment.apiUrl}/Training/${this.gymnastId}/trainings`)
        .pipe(
          catchError(this.handleError),
          map((list: any): Training[] => list.map(Training.fromJson)
        ))
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
      .pipe(catchError(this.handleError), map(Training.fromJson))
      .subscribe((t: Training) => {
        this._trainings = [...this._trainings, t]
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
