import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { SignupComponent } from './components/signup/signup.component'
import { SigninComponent } from './components/signin/signin.component'
import { ProfileComponent } from './components/profile/profile.component';
import { OxigenoComponent } from './components/oxigeno/oxigeno.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
