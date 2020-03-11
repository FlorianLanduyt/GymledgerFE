import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingComponent } from './training/training.component';
import { GymnastProfileComponent } from './gymnast-profile/gymnast-profile.component';


@NgModule({
  declarations: [
    TrainingListComponent,
    TrainingComponent,
    GymnastProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], exports : [
    GymnastProfileComponent
  ]
})
export class GymnastModule { }
