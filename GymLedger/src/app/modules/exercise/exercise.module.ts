import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { ExerciseFilterPipe } from './exercise-filter.pipe';
import { MaterialModule } from "../material/material.module";
import { ExercisePageComponent } from './exercise-page/exercise-page.component';
import { AddExerciseToTrainingComponent } from './add-exercise-to-training/add-exercise-to-training.component';
import { TrainingExercisesListComponent } from './training-exercises-list/training-exercises-list.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from "../general/general.module";
import { AddExerciseComponent } from './add-exercise/add-exercise.component';



const routes: Routes = [
  { path: '', canActivate: [AuthGuard],  redirectTo: 'exercises', pathMatch: 'full'},
  { path: 'exercises', canActivate: [AuthGuard], component: ExercisePageComponent},
  
] 


@NgModule({
  declarations: [ExerciseListComponent, ExerciseComponent, ExerciseFilterPipe, ExercisePageComponent, AddExerciseToTrainingComponent, TrainingExercisesListComponent, EvaluationComponent, AddExerciseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    GeneralModule
  ],
   exports: [
     ExerciseListComponent,
     TrainingExercisesListComponent,
   ]
})
export class ExerciseModule { }
