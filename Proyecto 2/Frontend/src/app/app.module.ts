import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{ HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavigationSesionComponent } from './components/navigation-sesion/navigation-sesion.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
import { RitmoComponent } from './components/ritmo/ritmo.component';
import { FuerzaComponent } from './components/fuerza/fuerza.component';
import { UsuarioService } from './services/usuarioServices/usuario.service';
import { LecturaService } from './services/lecturaServices/lectura.service';
import { CoachService } from './services/coachServices/coach.service';
import { TemporizadorComponent } from './components/temporizador/temporizador.component';
import { ContadorGolpesComponent } from './components/contador-golpes/contador-golpes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    PerfilComponent,
    NavigationSesionComponent,
    TemperaturaComponent,
    RitmoComponent,
    FuerzaComponent,
    TemporizadorComponent,
    ContadorGolpesComponent,
    NavigationSesionComponent,
    ReportesComponent,
    DashboardPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    CoachService,
    LecturaService

    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
