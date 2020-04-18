import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { ExerciseFilterPipe } from './exercise-filter.pipe';
import { MaterialModule } from "../material/material.module";
import { ExercisePageComponent } from './exercise-page/exercise-page.component';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard],  redirectTo: 'exercises', pathMatch: 'full'},
  { path: 'exercises', canActivate: [AuthGuard], component: ExercisePageComponent},
  
] 


@NgModule({
  declarations: [ExerciseListComponent, ExerciseComponent, ExerciseFilterPipe, ExercisePageComponent],
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
