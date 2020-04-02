import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../category-data.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { GymnastDataService } from '../gymnast-data.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})


export class AddTrainingComponent implements OnInit {
  // @Output() public training: Training;
  @Output() public newTrainingForm = new EventEmitter <boolean>();
  //@Output() public newTraining = new EventEmitter<Training>()
  public trainingFg: FormGroup;
  private _fetchCategories$: Observable<Category[]> = this._catService.categories$;
  

  constructor(private fb: FormBuilder, 
      private _catService: CategoryDataService,
      private _toastr: ToastrService,
      private _gymnastService: GymnastDataService,
      ) { }

  ngOnInit(): void {

    this.initTrainingForm();
  }


  private initTrainingForm() {
    this.trainingFg = this.fb.group({
      category: ['', Validators.required],
      date: ['', Validators.required],
      feelingBefore: [''],
      feelingAfter: ['']
    }
    // ,
    // { validator: validateCategory}
    // 
    )
  }

  get categories$(): Observable<Category[]> {
    return this._fetchCategories$;
  }

  addTraining(){
    const training = new Training()

      training.category = this.trainingFg.value.category
      training.date = this.trainingFg.value.date
      training.feelingBefore = this.trainingFg.value.feelingBefore
      training.feelingAfter = this.trainingFg.value.feelingAfter

    this._gymnastService.addNewTraining(training).add(() => {
        this._toastr.success(`De training is toegevoegd`,"Succes")
      
    })
  }

  cancelForm(){
    this.newTrainingForm.emit(false);
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'moet ingevuld zijn'
    }
  }
}
