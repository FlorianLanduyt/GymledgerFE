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
import { AuthGuard } from '../user/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard],  redirectTo: 'gymnast', pathMatch: 'full'},
  { path: 'gymnast', canActivate: [AuthGuard], component: GymnastProfileComponent},
  { path: 'list', canActivate: [AuthGuard], component: AllTrainingComponent},
  { 
    path: 'details/:id', canActivate: [AuthGuard], 
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
