#include "Temperatura.h"
//ESTO FUNCIONA CON EL MODULO LM35

Temperatura::Temperatura() {  
}


int Temperatura::get_temperatura() {
  acumulador = 0;
  //Obtengo una muestra de 5 datos para calcular un promedio
  for(int i=0; i<5; i++){
    sensor = analogRead(A1);
    temperatura = ((sensor * 5000.0) / 1023)/10;
    acumulador = acumulador + temperatura;
    delay(500);
  }
  //Calculo el promedio y retorno el resultado
  return acumulador/5.0;
}


