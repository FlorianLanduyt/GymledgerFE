import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";


const routes: Routes = [
  {
    path: 'register', 
    component: RegisterComponent
   },
   {
     path: 'login',
     component: LoginComponent
   }
]


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
    ],
  exports: [
    RegisterComponent
  ]
})
export class UserModule { }
