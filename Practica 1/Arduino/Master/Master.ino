#include <SoftwareSerial.h>
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MLX90614.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MAX30105 particleSensor;

SoftwareSerial bluetooth(11,10);   //Crea conexion al bluetooth - PIN 11 a TX y PIN 10 a RX

const byte RATE_SIZE = 10; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;
int contador = 0;

long previousMillis = 0;        // almacena la ultima vez de captura de la temperatura y envio de datos
long interval = 2000;           // Intervalo de captura de la temperatura y envio de datos

double T; //Valor de la temperatura a enviar a la app
int R;    //Valor del ritmo cardiaco a enviar a la app
int O;    //Valor del oxigeno a enviar a la app


void setup()
{
  Serial.begin(115200);
  bluetooth.begin(9600); // inicialmente la comunicacion serial a 9600 Baudios.
  Serial.println("Initializing...");
  

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
  mlx.begin();  
}

void loop(){
  //Codigo solo para probar si recibe data enviada desde el telefono.
  
  if (Serial.available()) { //Recibo el oxigeno en la sangre desde el otro arduino
    O = Serial.read();
    Serial.println(O);
  }
  
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;   
    T = mlx.readObjectTempC();
    enviarDataBluetooth();
    limpiarVariables();
 
    //Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC()); 
    //Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");
    //Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF()); 
    //Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); Serial.println("*F");
    //Serial.println();
    //delay(500);
  }
  
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true)
  {
    //We sensed a beat!
    long delta = millis() - lastBeat;
    lastBeat = millis();

    beatsPerMinute = 60 / (delta / 1000.0);

    if (beatsPerMinute < 255 && beatsPerMinute > 20)
    {
      rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
      rateSpot %= RATE_SIZE; //Wrap variable

      //Take average of readings
      beatAvg = 0;
      for (byte x = 0 ; x < RATE_SIZE ; x++)
        beatAvg += rates[x];
      beatAvg /= RATE_SIZE;
    }
  }

  //Serial.print("IR=");
  //Serial.print(irValue);
  //Serial.print(", BPM=");
  //Serial.print(beatsPerMinute);
  //Serial.print(", Avg BPM=");
  //Serial.print(beatAvg);
  R = beatAvg;

  if (irValue < 50000){
    R = 0;
    //Serial.print("Aproxime su dedo al sensor");
  }

  Serial.println();
  
 
}

void enviarDataBluetooth(){
  String datos = (String)T + ", " + R + ", " + O;
  bluetooth.println(datos);
  Serial.println(datos);
}

void limpiarVariables(){
  T = 0.0;
  R = 0;
  O = 0;
}
