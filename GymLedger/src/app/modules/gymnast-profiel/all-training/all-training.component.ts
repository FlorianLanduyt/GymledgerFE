import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { GymnastDataService } from '../gymnast-data.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../user/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training-list',
  templateUrl: './all-training.component.html',
  styleUrls: ['./all-training.component.css']
})
export class AllTrainingComponent implements OnInit {
  //@Input() public gymnastId: string
  private _showDetails: boolean = false;
  private _clickedTraining: Training;
  public errorMessage: string = ""
  public newTrainingForm: boolean = false;

  // private _fetchTrainings$: Observable<Training[]>
  private _trainingList$: Observable<Training[]>;

  constructor(
    private _gymnastService: GymnastDataService,
    private _authService: AuthenticationService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this._gymnastService.refreshTrainingList$.subscribe(() => {
      this.getAllTrainings()
    });
    this.getAllTrainings()
  }


  private getAllTrainings() {
    // this._authService.user$.subscribe((email: string) => {
    //   if (email) {
    //     this._gymnastService.getTrainings$(email).subscribe((t: Training[]) => {
    //       this._trainingList = t;
    //     });
    //   }
    // }
    // )

    this._trainingList$ =  this._gymnastService.getTrainings$('florian.landuyt@hotmail.com')

  }

  // )
  // this.fetchTrainings()


  // private fetchTrainings(){
  //   this._gymnastService.allTrainings$.subscribe((t: []) => {
  //     this._trainings = t
  //   })

  // this._fetchTrainings$ = this._gymnastService.allTrainings$.pipe(
  //   catchError(err => {
  //     this.errorMessage = err;
  //     return EMPTY
  //   })
  // )




  get trainings$(): Observable<Training[]> {
    return this._trainingList$
  }

  public showDetails(selected: Training) {

    this._showDetails = true;
    this._clickedTraining = selected
  }

  get show() {
    return this._showDetails;
  }

  get selectedTraining() {
    return this._clickedTraining;
  }


  cancelNewTraining(continueForm: boolean){
    this.newTrainingForm = continueForm 
  }

  addTraining(newTraining: Training){
    this._gymnastService.addNewTraining("florian.landuyt#@hotmail.com", newTraining)
    this._toastr.success("De training is toegevoegd","Succes")
    this.newTrainingForm = false;
  }

  scroll(el: HTMLElement){
    this.newTrainingForm = true
    if(this.newTrainingForm){
      el.scrollIntoView({behavior: "smooth"})
    } else {
      el.scrollIntoView({behavior: "smooth"})

      this.newTrainingForm = true;
    }
  }

}
