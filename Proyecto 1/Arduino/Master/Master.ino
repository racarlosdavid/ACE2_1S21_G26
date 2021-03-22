#include <SoftwareSerial.h>
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MLX90614.h>
#include "Output.h"

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MAX30105 particleSensor;
Output accion = Output(8,2);  //buzzer conectado al pin 8, relay conectado al pin 2

SoftwareSerial bluetooth(9,10);   //Crea conexion al bluetooth - PIN 9 a TX y PIN 10 a RX

const byte RATE_SIZE = 10; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;
int contador = 0;

long previousMillis = 0;        // almacena la ultima vez de captura de la temperatura y envio de datos
long interval = 2000;           // Intervalo de captura de la temperatura y envio de datos

double T;   //Valor de la temperatura a enviar a la app
int R;      //Valor del ritmo cardiaco a enviar a la app
/*Variable para comparar si el atleta ya hizo demasiado esfuerzo y su ritmo se eleva demasiado, 
si se pasa de 150 se le recomiento abandonar el test inflando la bolsa tipo membrana*/
int ritmoPeligroso = 150; 
String dataDelMovimiento; //Valor de la distancia, velocidad y repeticiones que recibo el arduino esclavo.
int falloLaPrueba = 0;  //Variable que indica si el atleta se perdio la prueba o no, 1 es que se ha fallado el test y 0 es que no

/*Variables para manejar la interrupcion*/
int LED = 4; //Led para indicar que el atleta se rindio
int BOTON = 3;  //Boton para que el atleta se rinda
volatile int estado = LOW; //Estado del led
volatile int seRindio = 0; //Variable que indica si el atleta se rindio o no, 1 es que se rindio y 0 es que no

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
  pinMode(LED,OUTPUT);
  pinMode(BOTON,INPUT);
  attachInterrupt(digitalPinToInterrupt(BOTON),abandonarPrueba,RISING);
  digitalWrite(LED,estado);
}

void loop(){
  if (Serial.available()) { //Recibo el oxigeno en la sangre desde el otro arduino
    dataDelMovimiento = Serial.readString();
    //Serial.println(pasos);
  }
  
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;   
    T = mlx.readObjectTempC();
    enviarDataBluetooth();
    limpiarVariables();
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

  R = beatAvg;
  if (R > ritmoPeligroso){
    accion.inflarBolsa(3000); //Si el ritmo cardiaco se eleva demasiado se infla la bolsa para alertar al atleta
    falloLaPrueba = 1;
  }

  

  if (irValue < 50000){
    R = 0;
    //Serial.print("Aproxime su dedo al sensor");
  }
}
/*Se envia un string con la siguiente informacion:
Temperatura, RitmoCardiaco, repeticiones, velocidad, distanciaPorRepeticion, distanciaRecorrida, pasos, falloLaPrueba, seRindio*/
void enviarDataBluetooth(){
  String datos = (String)T + ", " + (String)R + ", "+dataDelMovimiento+ ", "+(String)falloLaPrueba+ ", "+(String)seRindio;
  bluetooth.println(datos);
  Serial.println(datos);
}

void limpiarVariables(){
  T = 0.0;
  R = 0;
}

void abandonarPrueba(){
  estado = !estado;
  accion.inflarBolsa(3000); //Si el atleta presiona el boton para rendirse se infla la bolsa para alertar al atleta
  digitalWrite(LED,estado);
  seRindio = 1;
}
