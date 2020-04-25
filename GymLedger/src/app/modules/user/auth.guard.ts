import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authenticationService.user$.getValue()) {
      return true;
    }
    
    this._authenticationService.redirectUrl = state.url;
    this._router.navigate(['/user/login']);
    return false;
  }
  
}
