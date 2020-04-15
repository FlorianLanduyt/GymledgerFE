import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/general/page-not-found/page-not-found.component';
import { AuthGuard } from './modules/user/auth.guard';

const routes: Routes = [
  { 
    path: 'training',
    loadChildren: () => 
      import('./modules/gymnast-profiel/gymnast.module')
      .then(mod => mod.GymnastModule)
  },
  {
    path: 'user',
    loadChildren: () => 
      import('./modules/user/user.module')
      .then(mod => mod.UserModule)
  },
  { path: '**', component: PageNotFoundComponent }
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
