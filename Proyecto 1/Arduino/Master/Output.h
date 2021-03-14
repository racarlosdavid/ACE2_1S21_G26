#ifndef OUTPUT_H
#define OUTPUT_H

#if defined(ARDUINO) && ARDUINO >= 100
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif
//#include "pins_arduino.h"

#include <inttypes.h>

class Output {
  public:
    Output(int buzzer_pin,int relay_pin);
    void playBuzzer();
    void inflarBolsa(int tiempo);
    
  private:
    int BUZZER_PASIVO_PIN; //Pin al que esta conectado el buzzer
    int RELAY_PIN; //Pin al que esta conectado el relay
    int T = 1000; //Pin al que esta conectado el relay
 
    
};
#endif
