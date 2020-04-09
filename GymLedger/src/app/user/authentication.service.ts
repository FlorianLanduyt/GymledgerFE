import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


function parseJwt(token) {
  if (!token){
    return null
  }
  const base64token = token.split('.')[1];
  const base64 = base64token.replace(/_/g, '/');
  return JSON.parse(window.atob(base64))
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly _tokenKey= 'currentUser';
  private _user$: BehaviorSubject<string>

  constructor(private http:HttpClient) { 
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if(parsedToken){
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date()
      if(expires) {
        localStorage.removeItem(this._tokenKey)
        parsedToken = null
      }
    }
     this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name)
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(
        `${environment.apiUrl}/account`,
        { email, password },
        { responseType: 'text' }
      ).pipe(
      map((token: any) => {
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(email);
          return true;
        } else {
          return false;
        }
      })
    );
  }   
  
  register(firstname: string, lastname: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          firstname, lastname,
          email, password, 
          passwordConfirmation: password
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account.checkusername`,
      {
        params: {email}
      }
    )
  }


  
}
