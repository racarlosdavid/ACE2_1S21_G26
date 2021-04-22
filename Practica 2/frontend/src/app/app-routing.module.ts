import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component'
import { IniciarSesionComponent } from './Component/iniciar-sesion/iniciar-sesion.component';
import { HistorialComponent } from './Component/historial/historial.component'
import { PanelRealTimeComponent } from './Component/panel-real-time/panel-real-time.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'iniciarSesion',
    component: IniciarSesionComponent
  },
  {
    path:'realTime',
    component: PanelRealTimeComponent
  },
  {
    path:'historial',
    component: HistorialComponent
  },
  {
    path:'historial/:idtest',
    component: HistorialComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
