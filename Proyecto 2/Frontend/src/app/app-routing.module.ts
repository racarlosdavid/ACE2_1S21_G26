import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { DashboardPrincipalComponent } from './components/dashboard-principal/dashboard-principal.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'iniciarSesion', component: IniciarSesionComponent },
  { path:'registrarse', component: RegistrarseComponent },
  { path:'principal', component: DashboardPrincipalComponent},
  { path:'perfil', component: PerfilComponent},
  { path:'reportes', component: ReportesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
