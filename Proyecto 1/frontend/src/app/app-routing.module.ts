import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletaComponent } from './components/atleta/atleta.component';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';
import { DistanciaRepeticionComponent } from './components/distancia-repeticion/distancia-repeticion.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HomeComponent } from './components/home/home.component';
import { OxigenoComponent } from './components/oxigeno/oxigeno.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepeticionesFechaComponent } from './components/repeticiones-fecha/repeticiones-fecha.component';
import { ReporteFalladoComponent } from './components/reporte-fallado/reporte-fallado.component';
import { ReporteRendidoComponent } from './components/reporte-rendido/reporte-rendido.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
import { VelocidadAlcanzadaComponent } from './components/velocidad-alcanzada/velocidad-alcanzada.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent, pathMatch: 'full'
  },
  {
    path:'user/signup',
    component: SignupComponent
  },
  {
    path:'user/signin',
    component: SigninComponent
  },
  {
    path:'user/profile',
    component: ProfileComponent
  },
  {
    path:'oxigeno',
    component: OxigenoComponent
  },
  {
    path:'principal',
    component: DashboardPrincipalComponent
  },
  {
    path:'temperatura',
    component: TemperaturaComponent
  },
  {
    path:'repeticionesFecha',
    component: RepeticionesFechaComponent
  },
  {
    path:'historial',
    component: HistorialComponent
  },
  {
    path:'reportes',
    component: ReportesComponent
  },
  {
    path:'atletas',
    component: AtletaComponent
  },
  {
    path:'atletas/:idUser',
    component:AtletaComponent
  },
  {
    path:'reportVelocidad',
    component:VelocidadAlcanzadaComponent
  },
  {
    path:'reportDistancia',
    component:DistanciaRepeticionComponent
  },
  {
    path:'reportFallado',
    component:ReporteFalladoComponent
  },
  {
    path:'reportRendido',
    component:ReporteRendidoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

