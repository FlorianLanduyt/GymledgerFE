import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Gymnast } from 'src/app/models/gymnast.model';
import { GlobalsService } from 'src/app/globals.service';


function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64))
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly _tokenKey = `currentUser`;
  private _user$: BehaviorSubject<string>

  public redirectUrl: string = null;

  private auth0Domain: string = 'dev-krp3h00i.eu.auth0.com'
  private auth0Id: string = 'ctm71np2uY92yccq34CObulcFUIWyqG'


  constructor(
    private http: HttpClient,
    private _router: Router) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    console.log(parsedToken)

    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date()
      if (expires) {
        localStorage.removeItem(this._tokenKey)
        parsedToken = null
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.sub)
    // console.log(this.userinfo)

    // this.initWebAuth0();
    console.log("Ctor: ", this.token)
  }

  // initWebAuth0(){
  //   var webAuth = new auth0.WebAuth({
  //     domain:       'dev-krp3h00i.eu.auth0.com',
  //     clientID:     'ctm71np2uY92yccq34CObulcFUIWyqGS'
  //   });
  
  //   // Trigger login with google
  //   webAuth.authorize({
  //     connection: 'google-oauth2'
  //   });
  // }



  
  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get user$(): BehaviorSubject<string> {
    return this._user$
  }

  get currentGymnast$(): Observable<Gymnast> {
    let loggedInUserEmail = this._user$.getValue();
     return this.http
      .get(`${environment.apiUrl}/Gymnast/gymnast/${loggedInUserEmail}`)
      .pipe(map((json: any): Gymnast => Gymnast.fromJson(json))
      )
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
          console.log("Email gebruiker: ", email)
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
    if (this.user$.getValue()) {
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
      tap((response: any) => {
        console.log(response)
      })
    )
  }

  userNameExists$(email: string, password: string): Observable<boolean>{
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/userNameExists`,
      {
        params: {email, password}
      }
    )
  }



}
