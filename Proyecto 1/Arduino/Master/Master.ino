#include "Output.h"
Output accion = Output(8); //buzzer conectado al pin 8

void setup() {

}

void loop() {
accion.playBuzzer();
delay(10000);
}
