#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#define REPORTING_PERIOD_MS     1000

PulseOximeter pox;
uint32_t tsLastReport = 0;

void onBeatDetected(){
    //Serial.println("Beat!");
}

void setup(){
    Serial.begin(115200);
\
    if (!pox.begin()) {
        //Serial.println("FAILED");
        for(;;);
    } else {
        //Serial.println("SUCCESS");
    }

    pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop(){
    pox.update();

    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        int oxigeno = (int)pox.getSpO2();
        float heart = pox.getHeartRate();
      if(oxigeno > 0 ){
        //Serial.print("Heart rate:");
        //Serial.print(heart);
        //Serial.print("bpm / SpO2:");
        //Serial.print(oxigeno);
        Serial.write(oxigeno);
        //Serial.println("%");
      }

        tsLastReport = millis();
    }
}
