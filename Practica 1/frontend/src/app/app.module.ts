import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AtletaService } from './services/atleta-services/atleta.service';
import { CouchService } from './services/couch-services/couch.service';
import { LecturaService } from './services/lectura-services/lectura.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationLoggedInComponent } from './components/navigation-logged-in/navigation-logged-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OxigenoComponent } from './components/oxigeno/oxigeno.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    NavigationLoggedInComponent,
    ProfileComponent,
    OxigenoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AtletaService,
    CouchService,
    LecturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
