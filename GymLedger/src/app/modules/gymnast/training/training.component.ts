import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  @Input() public training: Training;
  private _category: string;


  constructor() { }

  ngOnInit(): void {
    const cat = Category[this.training.category].toLowerCase();
    this._category = cat.charAt(0).toUpperCase() + cat.slice(1)
  }

  public get category(): string {
    return this._category;
  }
 

}
