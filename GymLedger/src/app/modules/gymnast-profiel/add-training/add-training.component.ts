import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.model';
import { Observable, EMPTY, of } from 'rxjs';
import { CategoryDataService } from '../category-data.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { GymnastDataService } from '../gymnast-data.service';
import { AuthenticationService } from '../../user/authentication.service';
import { Gymnast } from 'src/app/models/gymnast.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

function checkOneFilled(control: AbstractControl): ValidationErrors {
  const input = control.get('categoryInput');
  const select = control.get('confirmPassword');

  if ((!input.value && !select.value)) {
    return { 'notOneFilled': true }
  } else {
    console.log("niet oeps")
  }
}

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})


export class AddTrainingComponent implements OnInit {
  public training: Training;
  public title: string;
  public subTitle: string;

  public isEdit: boolean = false;

  public trainingFg: FormGroup;
  private _fetchCategories$: Observable<Category[]> = this._catService.categories$;


  constructor(private fb: FormBuilder,
    private _catService: CategoryDataService,
    private _toastr: ToastrService,
    private _gymnastService: GymnastDataService,
    private _authService: AuthenticationService,
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if (data) {
      this.training = data.training
    }



  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.title = "Pas de gekozen training aan";
      this.subTitle = "Pas de velden van de gekozen training aan";
    } else {
      this.title = "Creëer een nieuwe training";
      this.subTitle = "Maak een nieuwe training door de velden op een juiste manier in te vullen";
    }

    this.initTrainingForm();
    this.disableCategoryField()
  }


  private initTrainingForm() {
    this.trainingFg = this.fb.group({
      date: [this.isEdit ? this.training.date : '', Validators.required],
      feelingBefore: [this.isEdit ? this.training.feelingBeforeTraining : '', [Validators.min(0), Validators.max(10)]],
      feelingAfter: [this.isEdit ? this.training.feelingAfterTraining : '', [Validators.min(0), Validators.max(10)]],
      categoryGroup: this.fb.group({
        categorySelect: [this.isEdit ? this.training.category : ''],
        categoryInput: ['']
      }
      // , { validator: checkOneFilled }
      )
    }
      // ,
      // { validator: validateCategory}
      // 
    )
  }

  public disableCategory() {

  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  onSubmit() {
    this.closeForm();

    if (!this.isEdit) { //nieuwe training
      var newTraining: Training = this.createNewTraining();
      this._authService.user$.subscribe((email: string) => {
        if (email) {
          this._gymnastService.addNewTraining(email, newTraining).subscribe();
        }
      })
    } else {
      this.editTraining();
      this._gymnastService.putTraining(this.training).subscribe()
      this._gymnastService.refreshSingleTraining$.next();
    }

  }

  private editTraining() {
    this.training.category = this.trainingFg.value.categorySelect;
    this.training.date = this.trainingFg.value.date;


    if (this.trainingFg.value.feelingBefore == null) {
      this.training.feelingBeforeTraining = "0";
    } else {
      this.training.feelingBeforeTraining = this.trainingFg.value.feelingBefore;
    }

    if (this.trainingFg.value.feelingAfter == null) {
      this.training.feelingAfterTraining = "0";
    } else {
      this.training.feelingAfterTraining = this.trainingFg.value.feelingAfter;
    }

  }

  private createNewTraining() {
    const newTraining = new Training();
    if(this.trainingFg.value.categoryGroup.categorySelect !=  ""){
      console.log(this.trainingFg.value.categoryGroup.categorySelect)
      console.log("oldcat")
      newTraining.category = this.trainingFg.value.categoryGroup.categorySelect;
    } else {
      console.log("new cat");
      console.log(this.trainingFg.value.categoryGroup.categoryInput)
      var newCategory = new Category()
      newCategory.name = this.trainingFg.value.categoryGroup.categoryInput;
      newCategory.description = ""; // tijdelijk geen beschrijving 
      newTraining.category = newCategory;
    }
    newTraining.date = this.trainingFg.value.date;
    newTraining.feelingBeforeTraining = this.trainingFg.value.feelingBefore;
    newTraining.feelingAfterTraining = this.trainingFg.value.feelingAfter;

    this.dialogRef.close()

    return newTraining;
  }

  closeForm() {
    this.dialogRef.close()
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'Dit veld is verplicht'
    } else if (errors.min) {
      return `Kies een getal hoger dan ${errors.min.min}`
    } else if (errors.max) {
      return `Kies een getal lager of gelijk ${errors.max.max}`
    } else if (errors.bothFilled) {
      return 'Enkel 1 mag ingevuld worden'
    }
  }

  disableCategoryField() {
    const inputControl = this.trainingFg.get("categoryGroup").get("categoryInput");

    this.trainingFg.get("categoryGroup").get("categorySelect").valueChanges.subscribe(
      value => {
        if (value != "") {
          document.getElementById('catItem').setAttribute('disabled', '');
          inputControl.setValue('');
        } else {
          document.getElementById('catItem').removeAttribute('disabled');
        }
      }
    )
  }


}
