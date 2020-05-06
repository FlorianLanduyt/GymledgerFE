import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Auth0Service } from '../../user/auth0.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthenticationService,
    public auth: Auth0Service
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout() 
  }

}
