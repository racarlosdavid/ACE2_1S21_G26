import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'iniciarSesion', component: IniciarSesionComponent },
  { path:'registrarse', component: RegistrarseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
