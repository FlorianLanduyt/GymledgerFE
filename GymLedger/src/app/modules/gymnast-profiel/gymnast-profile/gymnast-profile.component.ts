import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/models/gymnast.model';
import { Observable } from 'rxjs';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-gymnast-profile',
  templateUrl: './gymnast-profile.component.html',
  styleUrls: ['./gymnast-profile.component.css']
})
export class GymnastProfileComponent implements OnInit {
  private _gymnast$: Observable<Gymnast>
  public newTrainingForm: boolean = true;
  private _email: string

  constructor(
    private _gymnastService: GymnastDataService,
    private _authService: AuthenticationService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    // this._authService.user$.subscribe((email: string) => {
    //   console.log("email: ", email)
    //   if(email){
    //     this._gymnastService.getGymnastByEmail$(email).subscribe(
    //       g => this._gymnast = g
    //     )
    //   }
    // })

    this._gymnast$ = this._gymnastService.getGymnastByEmail$('florian.landuyt@hotmail.com')
  }

  get gymnast$(): Observable<Gymnast>{
    return this._gymnast$;
  }

  cancelNewTraining(continueForm: boolean){
    this.newTrainingForm = continueForm 
  }

  addTraining(newTraining: Training){
    this._gymnastService.addNewTraining(this._email, newTraining)
    this._toastr.success("De training is toegevoegd","Succes")
    this.newTrainingForm = false;
  }

  scroll(el: HTMLElement){
    //this.newTrainingForm = !this.newTrainingForm
    if(this.newTrainingForm){
      el.scrollIntoView({behavior: "smooth"})
    } else {
      el.scrollIntoView({behavior: "smooth"})

      this.newTrainingForm = true;
    }
  }

}
