import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GymnastModule } from "./modules/gymnast-profiel/gymnast.module";
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GeneralModule } from "./modules/general/general.module";
import { UserModule } from './modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GymnastModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    GeneralModule,
    AppRoutingModule,
    UserModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
