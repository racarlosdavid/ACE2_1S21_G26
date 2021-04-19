#include <SoftwareSerial.h>

const int sensorPin = 2;
const int sensorPinExhala = 3;
const int SelectorPin = 9;
const int measureInterval = 1000;
volatile int pulseConter;
volatile int pulseConterExhala;
bool inhala = true;
bool exhala = false;
bool bandera_inhala = false;
bool bandera_exhala = false;
float anterior = 0;
float frequency = 0;
float frequencyExhala = 0;
// YF-S401
const float factorK = 98;

SoftwareSerial mySerial(10, 11); // RX, TX
 
void ISRCountPulse(){
   pulseConter++;
}

void ISRCountPulseExhala(){
   pulseConterExhala++;
}

float GetFrequency(){
   pulseConter = 0;
 
   interrupts();
   delay(measureInterval);
   noInterrupts();
 
   return (float)pulseConter * 1000 / measureInterval;
}

float GetFrequencyExhala(){
   pulseConterExhala = 0;
 
   interrupts();
   delay(measureInterval);
   noInterrupts();
 
   return (float)pulseConterExhala * 1000 / measureInterval;
}
 
void setup(){
   Serial.begin(9600);
   mySerial.begin(9600);
   pinMode(SelectorPin , OUTPUT); 
   digitalWrite(SelectorPin , HIGH); 
   attachInterrupt(digitalPinToInterrupt(sensorPin), ISRCountPulse, RISING);
   attachInterrupt(digitalPinToInterrupt(sensorPinExhala), ISRCountPulseExhala, RISING);
}
 
void loop(){
   while(inhala){
      Serial.println("PUEDES INHALAR");
      // obtener frecuencia en Hz
      frequency = GetFrequency();

      if(frequency>0){ //Si detecto que se esta exhalando espero a que la frecuencia regrese a 0 y cambio la bandera de inhala a true
         bandera_inhala = true;
         // calcular caudal L/min
         float flow_Lmin = frequency / factorK;
         printdata(flow_Lmin,frequency); 
         anterior = frequency;
         
         while(anterior>0){
            // obtener frecuencia en Hz
            frequency = GetFrequency();
            // calcular caudal L/min
            float flow_Lmin = frequency / factorK;
            printdata(flow_Lmin,frequency);
            String data_inhla = String(flow_Lmin);
            eviadrdataBluethoot(data_inhla,"0");
            anterior = frequency;
         }
  
      }
      if(bandera_inhala == true){
         Serial.println("Dejo de inhalar");
         exhala = true;
         inhala = false;
         bandera_inhala = false;
         digitalWrite(SelectorPin , HIGH); 
      }
   }

   while(exhala){
      Serial.println("PUEDES EXHALAR");
      // obtener frecuencia en Hz
      frequency = GetFrequencyExhala();
      

      if(frequency>0){ //Si detecto que se esta exhalando espero a que la frecuencia regrese a 0 y cambio la bandera de exhala a true
         bandera_exhala = true;
         // calcular caudal L/min
         float flow_Lmin = frequency / factorK;
         printdata(flow_Lmin,frequency);
         anterior = frequency;
         
         while(anterior>0){
            // obtener frecuencia en Hz
            frequency = GetFrequencyExhala();
            // calcular caudal L/min
            float flow_Lmin = frequency / factorK;
            printdata(flow_Lmin,frequency);
            String data_exhala = String(flow_Lmin);
            eviadrdataBluethoot("0",data_exhala);
            anterior = frequency;
         }
  
      }
      if(bandera_exhala == true){
         Serial.println("Dejo de exhalar");
         inhala = true;
         exhala = false;
         bandera_exhala = false;
         digitalWrite(SelectorPin , LOW); 
      }
   }   
}

void printdata(float flow_Lmin,float frequency){
   Serial.print("Frecuencia: "); Serial.print(frequency, 0);
   Serial.print(" (Hz)\tCaudal: ");
   Serial.print(flow_Lmin, 3); Serial.println(" (L/min)"); 
}

void eviadrdataBluethoot(String inhala, String exhala){
   String data = inhala + "," + exhala + ",";
   mySerial.println(data);
}
