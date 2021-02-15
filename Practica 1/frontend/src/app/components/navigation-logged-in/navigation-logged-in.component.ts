import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-logged-in',
  templateUrl: './navigation-logged-in.component.html',
  styleUrls: ['./navigation-logged-in.component.css']
})
export class NavigationLoggedInComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['']);
  }
}
