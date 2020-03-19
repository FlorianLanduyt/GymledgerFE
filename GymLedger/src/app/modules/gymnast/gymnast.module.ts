import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingComponent } from './training/training.component';
import { GymnastProfileComponent } from './gymnast-profile/gymnast-profile.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { TrainingFormComponent } from './training-form/training-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrainingListComponent,
    TrainingComponent,
    GymnastProfileComponent,
    AddTrainingComponent,
    TrainingFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ], exports : [
    GymnastProfileComponent,
    TrainingComponent
  ]
})
export class GymnastModule { }
