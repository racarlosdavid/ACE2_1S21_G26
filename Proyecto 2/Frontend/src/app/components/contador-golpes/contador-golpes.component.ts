import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-golpes',
  templateUrl: './contador-golpes.component.html',
  styleUrls: ['./contador-golpes.component.css']
})
export class ContadorGolpesComponent implements OnInit {
  
  contador:number = 0;
  constructor() { }

  ngOnInit(): void {
  
  }

}
