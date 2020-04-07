import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingDetailsComponent } from './modules/gymnast-profiel/training-details/training-details.component';
import { GymnastProfileComponent } from './modules/gymnast-profiel/gymnast-profile/gymnast-profile.component';
import { AllTrainingComponent } from './modules/gymnast-profiel/all-training/all-training.component';
import { TrainingResolver } from './modules/gymnast-profiel/training-resolver.service';
import { PageNotFoundComponent } from './modules/general/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: 'training',
    loadChildren: () => import('./modules/gymnast-profiel/gymnast.module').then(mod => mod.GymnastModule)
  },
  //{ path: '', redirectTo: 'gymnast', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
