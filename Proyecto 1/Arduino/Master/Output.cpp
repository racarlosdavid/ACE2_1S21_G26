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


Output::Output(int buzzer_pin) { 
  BUZZER_PASIVO_PIN = buzzer_pin;
  pinMode(BUZZER_PASIVO_PIN, OUTPUT);	// pin 8 como salida 
}

void Output::playBuzzer() {
  for (int i=0; i<12; i+=1) {
    if (notes[i] != SILENCE) {
      tone(BUZZER_PASIVO_PIN, notes[i], 102);
    }
    delay(150);
  }
}
