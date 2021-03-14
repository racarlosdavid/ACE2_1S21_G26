#include "Output.h"

#define SILENCE  0
#define NOTE_B7  3951
#define NOTE_D8  4699
#define NOTE_E8  5274

static const int notes[] = {
  NOTE_D8, SILENCE,  NOTE_D8, SILENCE,
  NOTE_B7,  NOTE_D8, SILENCE,  NOTE_E8,
  SILENCE,  NOTE_D8, SILENCE,  SILENCE
};


Output::Output(int buzzer_pin, int relay_pin) { 
  BUZZER_PASIVO_PIN = buzzer_pin;
  RELAY_PIN = relay_pin;
  pinMode(BUZZER_PASIVO_PIN, OUTPUT);	// pin 8 como salida 
  pinMode(RELAY_PIN, OUTPUT);	// pin 2 como salida 
}

void Output::playBuzzer() {
  for (int i=0; i<12; i+=1) {
    if (notes[i] != SILENCE) {
      tone(BUZZER_PASIVO_PIN, notes[i], 102);
    }
    delay(150);
  }
}

void Output::inflarBolsa(int tiempo) {
  T = tiempo;
  digitalWrite(RELAY_PIN, HIGH); // RELAY_PIN a uno logico
  delay(T); //Tiempo que voy a dejar la bomba encendida para que se infle la membrana
  digitalWrite(RELAY_PIN, LOW);  // RELAY_PIN a cero logico
}
