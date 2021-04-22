import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Component/home/home.component';
import { NavigationComponent } from './Component/navigation/navigation.component';
import { NavigationSesionComponent } from './Component/navigation-sesion/navigation-sesion.component';
import { IniciarSesionComponent } from './Component/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './Component/registrarse/registrarse.component';
import { FormsModule } from '@angular/forms';
import { RealTimeComponent } from './Component/real-time/real-time.component';
import { PanelRealTimeComponent } from './Component/panel-real-time/panel-real-time.component';
import { HistorialComponent } from './Component/historial/historial.component';
import { GraphestaticaComponent } from './Component/graphestatica/graphestatica.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    NavigationSesionComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    RealTimeComponent,
    PanelRealTimeComponent,
    HistorialComponent,
    GraphestaticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
