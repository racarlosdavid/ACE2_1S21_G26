#include <SoftwareSerial.h>
#include "Temperatura.h"

SoftwareSerial bluetooth(9,10);   //Crea conexion al bluetooth - PIN 9 a TX y PIN 10 a RX
Temperatura temp = Temperatura();

void setup() {   
  Serial.begin(9600);         
  bluetooth.begin(9600); // inicialmente la comunicacion serial a 9600 Baudios.
}

void loop() {  
  float t = temp.get_temperatura();
  print_temp_consola(t);   
  send_temp_bluetooth(t);                   

  //Codigo solo para probar si recibe data enviada desde el telefono.
  if(bluetooth.available()){ 
    Serial.println(bluetooth.read());
  }
}

//PRINTS DE PRUEBA BORRAR CUANDO YA SE TENGA UN JSON O CUALQUIER OTRA ESTRUCTURA PARA MANDAR AL TELEFONO
void print_temp_consola(float t){
  bluetooth.write("La temperatura es:");
  bluetooth.write(t);
  bluetooth.write("\n"); 
}

void send_temp_bluetooth(float t){
  Serial.print("La temperatura es:");
  Serial.println(t);
}
