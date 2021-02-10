#include <SoftwareSerial.h>

SoftwareSerial bluetooth(9,10);   //Crea conexion al bluetooth - PIN 9 a TX y PIN 10 a RX

int sensor; //Variable para alamacenar el valor obtenido por el sensor LM35 conectado al pin A1
float temperatura; //Variable que almacena la temperatura calculada con la formula
float acumulador; //Variable que acumula 5 datos sensados para luego calcular el promedio


void setup() {   
  Serial.begin(9600);         
  bluetooth.begin(9600); // inicialmente la comunicacion serial a 9600 Baudios.
}



void loop() {  
  float t = get_temperatura();
  print_temp_consola(t);   
  send_temp_bluetooth(t);                   

  //Codigo solo para probar si recive data enviada desde el telefono.
  if(bluetooth.available()){ 
    Serial.println(bluetooth.read());
  }
}



int get_temperatura() {
  acumulador = 0;
  //Obtengo una muestra de 5 datos para calcular un promedio
  for(int i=0; i<5; i++){
    sensor = analogRead(A1);
    temperatura = ((sensor * 5000.0) / 1023)/10;
    acumulador = acumulador + temperatura;
    delay(500);
  }
  //saco el promedio y retorno el resultado
  return acumulador/5.0;
}

void print_temp_consola(float temp){
  bluetooth.write("La temperatura es:");
  bluetooth.write(temp);
  bluetooth.write("\n"); 
}

void send_temp_bluetooth(float temp){
  Serial.print("La temperatura es:");
  Serial.println(temp);
}

  
