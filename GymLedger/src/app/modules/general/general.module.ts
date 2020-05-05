import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    PdfGeneratorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports: [
    NavbarComponent,
    PageNotFoundComponent
  ]
})
export class GeneralModule { }
