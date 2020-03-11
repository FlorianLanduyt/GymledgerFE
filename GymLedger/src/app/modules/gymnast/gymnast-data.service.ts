import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Gymnast } from 'src/app/models/gymnast.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GymnastDataService {
  private gymnastId: number;

  constructor(private http: HttpClient) { 
    this.gymnastId = 2;
  }

  get gymnast$(): Observable<Gymnast> {
    return this.http.get(`${environment.apiUrl}/Gymnast/gymnastsWithTraining/${this.gymnastId}`).pipe(
      //catchError(handleError),
      map((jsonGymnast: any): Gymnast => Gymnast.fromJson(jsonGymnast))
    );
  }

  handleError(err: any) : Observable<never>{
    let errorMsg;
    if (err instanceof HttpErrorResponse) {
      errorMsg = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMsg = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMsg)
  }

}
