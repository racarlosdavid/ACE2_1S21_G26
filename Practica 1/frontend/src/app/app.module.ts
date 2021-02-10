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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AtletaService,
    CouchService,
    LecturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
