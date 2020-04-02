import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/models/gymnast.model';
import { Observable } from 'rxjs';
import { GymnastDataService } from '../gymnast-data.service';
import { Training } from 'src/app/models/training.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gymnast-profile',
  templateUrl: './gymnast-profile.component.html',
  styleUrls: ['./gymnast-profile.component.css']
})
export class GymnastProfileComponent implements OnInit {
  private _gymnast: Gymnast
  public newTrainingForm: boolean = true;

  constructor(private _gymnastService: GymnastDataService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._gymnastService.gymnast$.subscribe(
      g => this._gymnast = g
    )
  }

  get gymnast(): Gymnast{
    return this._gymnast;
  }

  cancelNewTraining(continueForm: boolean){
    this.newTrainingForm = continueForm 
  }

  addTraining(newTraining: Training){
    this._gymnastService.addNewTraining(newTraining)
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
