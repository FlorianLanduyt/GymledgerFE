import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.model';
import { CategoryDataService } from '../category-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GymnastDataService } from '../gymnast-data.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  @Input() public training: Training;
  @Output() public selectedTraining = new EventEmitter<Training>()
  private _category: Category;
  private _beforeFeeling: string;
  private _afterFeeling: string;


  constructor(private _categoryService: CategoryDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const cat = Category[this.training.category.name].toLowerCase();
    // this._category = cat.charAt(0).toUpperCase() + cat.slice(1)

    this._beforeFeeling = this.checkZero(this.training.feelingBefore)
    this._afterFeeling = this.checkZero(this.training.feelingAfter);
  }

  private checkZero(feeling: string): string {
    return feeling == '0'? "/": feeling
  }

  public get category(): Category {
    return this._category;
  }



  public get beforeFeeling(): string {
    return this._beforeFeeling;
  }

  public get afterFeeling(): string {
    return this._afterFeeling
  }

  public clickedTraining(){
    this.selectedTraining.emit(this.training)
  }

  

  
}
