import { Component, OnInit } from '@angular/core';
import { createPublicKey } from 'crypto';
import { $ } from 'protractor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.desplegarMenu()
  }

  desplegarMenu(){
    let element = document.querySelector(".dropdown-toggle")
    let lista = document.querySelector(".dropdown-menu")
    element?.addEventListener('click',function(){
     if (element != null && lista != null && !element.classList.contains('show')){
        console.log(element)
        console.log(lista)
        element.classList.add('show')
        lista.classList.add('show')
     }else if(element != null && lista != null && element.classList.contains('show')){
      element.classList.remove('show')
      lista.classList.remove('show')
     }
    });
  }

}
