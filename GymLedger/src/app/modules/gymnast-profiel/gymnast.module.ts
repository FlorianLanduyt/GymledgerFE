import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { AllTrainingComponent } from "./all-training/all-training.component";
import { TrainingComponent } from './training/training.component';
import { GymnastProfileComponent } from './gymnast-profile/gymnast-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTrainingComponent } from "./add-training/add-training.component";
import { TrainingDetailsComponent } from "./training-details/training-details.component";
import { Routes, RouterModule } from '@angular/router';
import { TrainingResolver } from './training-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'gymnast', pathMatch: 'full'},
  { path: 'gymnast' , component: GymnastProfileComponent},
  { path: 'list', component: AllTrainingComponent},
  { 
    path: 'details/:id', 
    component: TrainingDetailsComponent, 
    resolve: { training: TrainingResolver}},
  // { path: '**', component: PageNotFoundComponent }, 
] 


@NgModule({
  declarations: [
    AllTrainingComponent,
    TrainingComponent,
    GymnastProfileComponent,
    AddTrainingComponent,
    TrainingDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ], exports : [
    GymnastProfileComponent,
    TrainingComponent,
    AddTrainingComponent,
    TrainingDetailsComponent
  ]
})
export class GymnastModule { }
