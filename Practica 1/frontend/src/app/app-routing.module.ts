import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { SignupComponent } from './components/signup/signup.component'
import { SigninComponent } from './components/signin/signin.component'
import { ProfileComponent } from './components/profile/profile.component';
import { OxigenoComponent } from './components/oxigeno/oxigeno.component';
import { RitmoComponent } from './components/ritmo/ritmo.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component'
import { HistorialComponent } from './components/historial/historial.component'
import { ReportesComponent } from './components/reportes/reportes.component'
import { AtletasComponent } from './components/atletas/atletas.component'

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
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
  }
  ,
  {
    path:'ritmo',
    component: RitmoComponent
  }
  ,
  {
    path:'temperatura',
    component: TemperaturaComponent
  },
  {
    path:'principal',
    component: DashboardPrincipalComponent
  },
  {
    path:'historial',
    component:HistorialComponent
  },
  {
    path:'reportes',
    component:ReportesComponent
  },
  {
    path:'atletas',
    component:AtletasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
