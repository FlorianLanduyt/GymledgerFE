import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmptyListPlaceholderComponent } from './empty-list-placeholder/empty-list-placeholder.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    EmptyListPlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports: [
    NavbarComponent,
    PageNotFoundComponent,
    EmptyListPlaceholderComponent
  ]
})
export class GeneralModule { }
