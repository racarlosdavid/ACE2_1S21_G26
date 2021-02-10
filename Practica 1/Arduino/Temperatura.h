#ifndef TEMPERATURA_H
#define TEMPERATURA_H

#if defined(ARDUINO) && ARDUINO >= 100
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif
//#include "pins_arduino.h"

#include <inttypes.h>

class Temperatura {
public:
  
  Temperatura();
  int get_temperatura();

private:
  int sensor; //Variable para alamacenar el valor obtenido por el sensor LM35 conectado al pin A1
  float temperatura; //Variable que almacena la temperatura calculada con la formula
  float acumulador; //Variable que acumula 5 datos sensados para luego calcular el promedio
};
#endif