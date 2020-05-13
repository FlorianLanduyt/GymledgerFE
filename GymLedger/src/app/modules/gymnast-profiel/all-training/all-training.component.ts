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

  public trainingElement: string = "training"
  public addTrainingLink: string = "/list"

  @Input() public isHomepage: boolean;

  // private _fetchTrainings$: Observable<Training[]>
  private _trainingList :Training[];

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
    this._authService.user$.subscribe((email: string) => {
      if (email) {
        this._gymnastService.getTrainings$(email).subscribe((list) => {
          this._trainingList = list;
          if(this.isHomepage){
            this.initListForHomepage();
          }
        })
      }
    })
  }

  get isListEmpty(){
    return this._trainingList.length == 0? true:false;
  }

  private initListForHomepage(): void{
    var threeInFuture: Training[] = null;
    threeInFuture = this._trainingList.filter(this.inFuture);

    this._trainingList = this._trainingList.slice(0, 3);
  }

  // WIP
  inFuture(training: Training) {
    const vandaag = new Date();

    var nVandaag: string = `${vandaag.getFullYear()}-${vandaag.getUTCMonth()}-${vandaag.getDay()}`
    return training.date.getDate < new Date().getDate;
  }

  get trainings():Training[] {
    return this._trainingList
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
