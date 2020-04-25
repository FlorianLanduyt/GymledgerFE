import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


function parseJwt(token) {
  if (!token) {
    return null
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64))
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>
  public redirectUrl: string = null;

  constructor(
    private http: HttpClient,
    private _router: Router) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date()
      if (expires) {
        localStorage.removeItem(this._tokenKey)
        parsedToken = null
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name)
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get user$(): BehaviorSubject<string> {
    return this._user$
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(
      `${environment.apiUrl}/account`,
      { email, password },
      { responseType: 'text' }
    ).pipe(
      tap((token) => {
        console.log(token)
      }),
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

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isCoach: boolean,
    birthDay: Date): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          firstName, lastName,
          email, password,
          passwordConfirmation: password,
          isCoach, birthDay
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
      this._router.navigate(['/user/login']);
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    ).pipe(
      tap((respons: any) => {
        console.log(respons)
      })
    )
  }



}
