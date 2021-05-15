#include <SoftwareSerial.h>
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MLX90614.h>
#include "Output.h"

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MAX30105 particleSensor;
Output accion = Output(8,4);  //buzzer conectado al pin 8, relay conectado al pin 2

SoftwareSerial bluetooth(9,10);   //Crea conexion al bluetooth - PIN 9 a TX y PIN 10 a RX

const byte RATE_SIZE = 10; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;
int contador = 0;

long previousMillis = 0;        // almacena la ultima vez de captura de la temperatura y envio de datos
long interval = 1000;           // Intervalo de captura de la temperatura y envio de datos

double T;   //Valor de la temperatura a enviar a la app
int R;      //Valor del ritmo cardiaco a enviar a la app
int ContadorGolpes;      //Valor del ritmo cardiaco a enviar a la app
double FuerzaGolpe;
/*Variable para comparar si el atleta ya hizo demasiado esfuerzo y su ritmo se eleva demasiado, 
si se pasa de 150 se le recomiento abandonar el test inflando la bolsa tipo membrana*/
int ritmoPeligroso = 115; 
String dataDelMovimiento; //Valor de la distancia, velocidad y repeticiones que recibo el arduino esclavo.
int falloLaPrueba = 0;  //Variable que indica si el atleta se perdio la prueba o no, 1 es que se ha fallado el test y 0 es que no


const byte interruptPin = 2;
/*Variables para manejar la interrupcion*/
int LED = 3; //Led para indicar que el atleta que su ritmo se elevo demasiado

int fsrPin = 0;     // the FSR and 10K pulldown are connected to a0
int fsrReading;     // the analog reading from the FSR resistor divider
int fsrVoltage;     // the analog reading converted to voltage
unsigned long fsrResistance;  // The voltage converted to resistance, can be very big so make "long"
unsigned long fsrConductance; 
long fsrForce;       // Finally, the resistance converted to force

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
  digitalWrite(LED,LOW);
  attachInterrupt(digitalPinToInterrupt(interruptPin), Knock, RISING );
}

void loop(){ 
  //Lectura del ritmo cardiaco
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true){
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
    digitalWrite(LED,HIGH);
    accion.playBuzzer(); //Si el ritmo cardiaco se eleva demasiado suena una alarma para alertar al boxeador
  }

  if (irValue < 50000){
    R = 0;
    //Serial.print("Aproxime su dedo al sensor");
  }

  //Envio los datos cada 2 segundos
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;   
    T = mlx.readObjectTempC();
    Golpe();
    enviarDataBluetooth();
    limpiarVariables();
  }
  
}
/*Se envia un string con la siguiente informacion:
Temperatura, RitmoCardiaco, ContadorGolpes, FuerzaGolpe */
void enviarDataBluetooth(){
  String datos = (String)T + "," + (String)R + ","+(String)ContadorGolpes+ ","+FuerzaGolpe+ ",";
  bluetooth.println(datos);
  Serial.println(datos);
}

void limpiarVariables(){
  T = 0.0;
  R = 0;
  FuerzaGolpe = 0.0;
}

void Knock() {
  //ContadorGolpes++;
  //enviarDataBluetooth();
}

void Golpe(){
  fsrReading = analogRead(fsrPin);  
  //Serial.print("Analog reading = ");
  //Serial.println(fsrReading);
 
  // analog voltage reading ranges from about 0 to 1023 which maps to 0V to 5V (= 5000mV)
  fsrVoltage = map(fsrReading, 0, 1023, 0, 5000);
  //Serial.print("Voltage reading in mV = ");
  //Serial.println(fsrVoltage);  
 
  if (fsrVoltage == 0) {
    //Serial.println("No pressure");  
  } else {
    // The voltage = Vcc * R / (R + FSR) where R = 10K and Vcc = 5V
    // so FSR = ((Vcc - V) * R) / V        yay math!
    fsrResistance = 5000 - fsrVoltage;     // fsrVoltage is in millivolts so 5V = 5000mV
    fsrResistance *= 10000;                // 10K resistor
    fsrResistance /= fsrVoltage;
    //Serial.print("FSR resistance in ohms = ");
    //Serial.println(fsrResistance);
 
    fsrConductance = 1000000;           // we measure in micromhos so 
    fsrConductance /= fsrResistance;
    //Serial.print("Conductance in microMhos: ");
    //Serial.println(fsrConductance);
 
    // Use the two FSR guide graphs to approximate the force
    if (fsrConductance <= 1000) {
      fsrForce = fsrConductance / 80;
      //Serial.println(fsrForce);     
      //Serial.print("Force in Newtons: ");
      if(fsrForce > 0 ){
        ContadorGolpes++; 
        FuerzaGolpe = fsrForce; 
      }
      
    } else {
      fsrForce = fsrConductance - 1000;
      fsrForce /= 30;
      //Serial.print("Force in Newtons: ");
      //Serial.println(fsrForce);          
      if(fsrForce > 0 ){
        ContadorGolpes++; 
        FuerzaGolpe = fsrForce; 
      } 
      
    }
  }
  //Serial.println("--------------------");
  //delay(1000);
}  
