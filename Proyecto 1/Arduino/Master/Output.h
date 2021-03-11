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
    Output(int buzzer_pin);
    void playBuzzer();
    
  private:
    int BUZZER_PASIVO_PIN ;//Pin al que esta conectado el buzzer
 
    
};
#endif
