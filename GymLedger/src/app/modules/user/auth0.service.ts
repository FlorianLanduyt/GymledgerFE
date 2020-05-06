import { Injectable } from '@angular/core';
import { from, Observable, throwError, BehaviorSubject, of, combineLatest } from 'rxjs';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { shareReplay, catchError, concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  // loggedIn: boolean = null;
  // private userProfileSubject$ = new BehaviorSubject<any>(null);
  // userProfile$ = this.userProfileSubject$.asObservable();

  // auth0Client$ = // observable van instance van eigen auth0 acc
  //   (from( 
  //     createAuth0Client({
  //       domain: "dev-krp3h00i.eu.auth0.com",
  //       client_id: "ctm71np2uY92yccq34CObulcFUIWyqGS",
  //       redirect_uri: `${window.location.origin}`
  //     })
  //   ) as Observable<Auth0Client>).pipe(
  //     shareReplay(1), // preventin duplicate http req
  //     catchError(err => throwError(err))
  //   );

  //   isAuthenticated$ = this.auth0Client$.pipe(
  //     concatMap((client: Auth0Client) => from(client.isAuthenticated())),
  //     tap(res => this.loggedIn = res)
  //   );

  //   handleRedirectCallback$ = this.auth0Client$.pipe(
  //     concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  //   );

  // constructor(private router: Router) { 
  //   this.localAuthSetup();
  //   // Handle redirect from Auth0 login
  //   this.handleAuthCallback();
  // }

  // // When calling, options can be passed if desired
  // getUser$(options?): Observable<any> {
  //   return this.auth0Client$.pipe(
  //     concatMap((client: Auth0Client) => from(client.getUser(options))),
  //     tap(user => this.userProfileSubject$.next(user))
  //   );
  // }

  // private localAuthSetup() {
  //   // local authentication streams
  //   const checkAuth$ = this.isAuthenticated$.pipe(
  //     concatMap((loggedIn: boolean) => {
  //       if (loggedIn) {
  //         // If authenticated, get user and set in app
  //         // NOTE: you could pass options here if needed
  //         return this.getUser$();
  //       }
  //       // If not authenticated, return stream that emits 'false'
  //       return of(loggedIn);
  //     })
  //   );
  //   checkAuth$.subscribe();
  // }

  // public login(redirectPath: string = '/') {
  //   // A desired redirect path can be passed to login method
  //   // (e.g., from a route guard)
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log in
  //     client.loginWithRedirect({
  //       redirect_uri: `${window.location.origin}`,
  //       appState: { target: redirectPath }
  //     });
  //   });
  // }

  // private handleAuthCallback() {
  //   // Call when app reloads after user logs in with Auth0
  //   const params = window.location.search;
  //   if (params.includes('code=') && params.includes('state=')) {
  //     let targetRoute: string; // Path to redirect to after login processsed
  //     const authComplete$ = this.handleRedirectCallback$.pipe(
  //       // Have client, now call method to handle auth callback redirect
  //       tap(cbRes => {
  //         // Get and set target redirect route from callback results
  //         targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
  //       }),
  //       concatMap(() => {
  //         // Redirect callback complete; get user and login status
  //         return combineLatest([
  //           this.getUser$(),
  //           this.isAuthenticated$
  //         ]);
  //       })
  //     );
  //     // Subscribe to authentication completion observable
  //     // Response will be an array of user and login status
  //     authComplete$.subscribe(([user, loggedIn]) => {
  //       // Redirect to target route after callback processing
  //       this.router.navigate([targetRoute]);
  //     });
  //   }
  // }

  // public logout() {
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log out
  //     client.logout({
  //       client_id: "ctm71np2uY92yccq34CObulcFUIWyqGS",
  //       returnTo: `${window.location.origin}`
  //     });
  //   });
  // }
}
