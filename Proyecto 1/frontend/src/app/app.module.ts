import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuarioServices/usuario.service';
import { CouchService } from './services/couchServices/couch.service';
import { LecturaService } from './services/lecturaServices/lectura.service';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationLoggedInComponent } from './components/navigation-logged-in/navigation-logged-in.component';
import { OxigenoComponent } from './components/oxigeno/oxigeno.component';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
import { RitmoComponent } from './components/ritmo/ritmo.component';
import { VelocidadComponent } from './components/velocidad/velocidad.component';
import { DistanciaActualComponent } from './components/distancia-actual/distancia-actual.component';
import { DistanciaAcumuladaComponent } from './components/distancia-acumulada/distancia-acumulada.component';
import { RepeticionComponent } from './components/repeticion/repeticion.component';
import { RepeticionesFechaComponent } from './components/repeticiones-fecha/repeticiones-fecha.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AtletaComponent } from './components/atleta/atleta.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { VelocidadAlcanzadaComponent } from './components/velocidad-alcanzada/velocidad-alcanzada.component';
import { DistanciaRepeticionComponent } from './components/distancia-repeticion/distancia-repeticion.component';
import { ReporteFalladoComponent } from './components/reporte-fallado/reporte-fallado.component';
import { ReporteRendidoComponent } from './components/reporte-rendido/reporte-rendido.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    NavigationLoggedInComponent,
    OxigenoComponent,
    DashboardPrincipalComponent,
    TemperaturaComponent,
    RitmoComponent,
    VelocidadComponent,
    DistanciaActualComponent,
    DistanciaAcumuladaComponent,
    RepeticionComponent,
    RepeticionesFechaComponent,
    HistorialComponent,
    AtletaComponent,
    ReportesComponent,
    VelocidadAlcanzadaComponent,
    DistanciaRepeticionComponent,
    ReporteFalladoComponent,
    ReporteRendidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UsuarioService,
    CouchService,
    LecturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
