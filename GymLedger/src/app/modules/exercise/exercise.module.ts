import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard],  redirectTo: 'exercises', pathMatch: 'full'},
  { path: 'exercises', canActivate: [AuthGuard], component: ExerciseListComponent},
  
] 


@NgModule({
  declarations: [ExerciseListComponent, ExerciseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
   exports: [
     ExerciseListComponent
   ]
})
export class ExerciseModule { }
