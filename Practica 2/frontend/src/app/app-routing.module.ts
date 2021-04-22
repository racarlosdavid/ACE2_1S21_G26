import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component'
import { HistorialComponent } from './Component/historial/historial.component'


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
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
