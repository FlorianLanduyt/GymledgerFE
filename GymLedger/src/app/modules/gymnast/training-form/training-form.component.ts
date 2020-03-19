import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { CategoryDataService } from '../category-data.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {
  // @Output() public training: Training;
  @Output() public newTrainingForm = new EventEmitter <boolean>();
  @Output() public newTraining = new EventEmitter<Training>()
  public trainingFg: FormGroup;
  private _fetchCategories$: Observable<Category[]> = this._catService.categories$;
  

  constructor(private fb: FormBuilder, 
      private _catService: CategoryDataService) { }

  ngOnInit(): void {

    this.initTrainingForm();
  }


  private initTrainingForm() {
    this.trainingFg = this.fb.group({
      category: [''],
      date: [''],
      feelingBefore: [''],
      feelingAfter: ['']
    });
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
    this.newTraining.emit(training)
  }

  cancelForm(){
    this.newTrainingForm.emit(false);
  }
}
