import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/models/gymnast.model';
import { Observable } from 'rxjs';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../user/authentication.service';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-gymnast-profile',
  templateUrl: './gymnast-profile.component.html',
  styleUrls: ['./gymnast-profile.component.css']
})
export class GymnastProfileComponent implements OnInit {
  private _gymnast$: Observable<Gymnast>
  public isHomepage: boolean = true;

  constructor(
    private _authService: AuthenticationService,
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe((user) => {
      if(user){
        this._gymnast$ = this._authService.currentGymnast$;
      }
      
    })
  }

  get gymnast$(): Observable<Gymnast>{
    return this._gymnast$;
  }


  

}
