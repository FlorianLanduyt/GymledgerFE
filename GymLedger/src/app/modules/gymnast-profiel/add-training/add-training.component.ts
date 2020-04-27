import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.model';
import { Observable, EMPTY, of } from 'rxjs';
import { CategoryDataService } from '../category-data.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { GymnastDataService } from '../gymnast-data.service';
import { AuthenticationService } from '../../user/authentication.service';
import { Gymnast } from 'src/app/models/gymnast.model';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})


export class AddTrainingComponent implements OnInit {
  @Output() public newTrainingForm = new EventEmitter<boolean>();
  @Input() public training: Training;

  public isEdit: boolean = false;

  public trainingFg: FormGroup;
  private _fetchCategories$: Observable<Category[]> = this._catService.categories$;

  private currentUser: Gymnast


  constructor(private fb: FormBuilder,
    private _catService: CategoryDataService,
    private _toastr: ToastrService,
    private _gymnastService: GymnastDataService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this._authService.currentGymnast$.subscribe((user) => {
      this.currentUser = user;
    })

    if (this.training) {
      this.isEdit = true;
    }

    this.initTrainingForm();
  }


  private initTrainingForm() {
    this.trainingFg = this.fb.group({
      category: [this.isEdit ? this.training.category : '', Validators.required],
      date: [this.isEdit ? this.training.date : '', Validators.required],
      feelingBefore: [this.isEdit ? this.training.feelingBeforeTraining : ''],
      feelingAfter: [this.isEdit ? this.training.feelingAfterTraining : '']
    }
      // ,
      // { validator: validateCategory}
      // 
    )
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  onSubmit() {
    this.closeForm();

    if (!this.isEdit) {
      var newTraining: Training = this.createNewTraining();
      this._authService.user$.subscribe((email: string) => {
        if(email){
          this._gymnastService.addNewTraining(email, newTraining).subscribe();
        }
      })
    } else {
      this.editTraining();
      this._gymnastService.putTraining(this.training).subscribe()
    }

  }

  private editTraining() {
    this.training.category = this.trainingFg.value.category;
    this.training.date = this.trainingFg.value.date;
    this.training.feelingBeforeTraining = this.trainingFg.value.feelingBefore;
    this.training.feelingAfterTraining = this.trainingFg.value.feelingAfter;
  }

  private createNewTraining() {
    const newTraining = new Training();
    newTraining.category = this.trainingFg.value.category;
    newTraining.date = this.trainingFg.value.date;
    newTraining.feelingBeforeTraining = this.trainingFg.value.feelingBefore;
    newTraining.feelingAfterTraining = this.trainingFg.value.feelingAfter;
    return newTraining;
  }

  closeForm() {
    this.newTrainingForm.emit(false);
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'moet ingevuld zijn'
    }
  }
}
