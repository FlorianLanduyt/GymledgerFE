import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { ExerciseFilterPipe } from './exercise-filter.pipe';
import { MaterialModule } from "../material/material.module";


const routes: Routes = [
  { path: '', canActivate: [AuthGuard],  redirectTo: 'exercises', pathMatch: 'full'},
  { path: 'exercises', canActivate: [AuthGuard], component: ExerciseListComponent},
  
] 


@NgModule({
  declarations: [ExerciseListComponent, ExerciseComponent, ExerciseFilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
   exports: [
     ExerciseListComponent
   ]
})
export class ExerciseModule { }
