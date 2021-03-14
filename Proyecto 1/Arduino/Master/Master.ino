#include <MPU6050_tockn.h>
#include <Wire.h>
#include "Output.h"

unsigned long tiempo_anterior = 0;
unsigned long tiempo_actual = 0;
unsigned long tiempo_anterior2 = 0;
unsigned long tiempo_actual2 = 0;
unsigned long segundos = 0;   //Variablel que lleva conteo de los segundos
unsigned long aux = 0;        //Variable auxiliar para llevar control de cuando pasaron 60 segundos
unsigned repeticiones = 0;    //Almacena las repeticiones cuantas veces a sonado la alarma o cuantos minutos an pasado desde que se inicio

int pasos = 0;
float zancada = 30;          //Distancia entre las piernas en cm
float distancia;             //Distancia recorrida en m
float velocidad;             //Velocidad a la que va el atleta m/s
float distancias[20];        //Almaceno las posiciones, solo necesito posicion 0 y la final despues de 5 segundos.
int cont = 0;                //Auxiliar para guardar los datos en el arreglo de distancias.
Output accion = Output(8,2); //buzzer conectado al pin 8, relay conectado al pin 2
MPU6050 mpu6050(Wire);

void setup() {
  Serial.begin(9600);
  Wire.begin();
  mpu6050.begin();
  mpu6050.setGyroOffsets(71.61, 1.76, -0.09);
}

void loop() {
//Temporizador 60 segundos y contador de repeticiones
  tiempo_actual = millis();
  if((tiempo_actual-tiempo_anterior) >= 60000){ 
    repeticiones++;
    tiempo_anterior = tiempo_actual;
    accion.playBuzzer(); //Como ya se cumplio un minuto suena el buzzer
  }

  //Contador de pasos
  mpu6050.update();

  if(mpu6050.getAccY()>1){
      pasos++;
      delay(350);
   }
   
  float distancia_anterior = distancia;  
  distancia = (pasos*zancada)/100; //La distancia me queda en metros
  
  if(distancia > distancia_anterior){
    Serial.print("Distancia : ");Serial.println(distancia);
    distancias[cont] = distancia;
    cont++;
  }

  //Cada 5 segundos calculo la velocidad a la que se mueve el atleta
  tiempo_actual2 = millis();
  if((tiempo_actual2-tiempo_anterior2) >= 5000){ 
    //velocidad = ((distancia-distancias[0])*3600000)/5000000; //Para convertir a metros distancia m * 3600000 segundos / 5000 s * 1000 metros
    velocidad = (distancia-distancias[0])*0.72; //Simplificado distancia por 0.72 y obtengo km/h
    Serial.print("Velocidad : ");Serial.println(velocidad);
    cont = 0;
    tiempo_anterior2 = tiempo_actual2;
  }
  delay(100);
}
