#include "SparkFunLSM6DS3.h"
#include "Wire.h"
#include "SPI.h"
#include "wiring_private.h"
#include "Output.h"

long previousMillis = 0;        // almacena la ultima vez de captura de la temperatura y envio de datos
long tiempo_anterior = 0;

float repeticiones = 0;    //Almacena las repeticiones cuantas veces a sonado la alarma o cuantos minutos an pasado desde que se inicio
int pasos = 0;
int pasosAnteriores = 0;
float zancada = 30;           //Distancia entre las piernas en cm
float distanciaRecorrida;     //Distancia recorrida en m
float distanciaPorRepeticion; //Distancia recorrida por repeticion
float distanciaAnterior;      //Me sirve para calcular la distancia recorrida por repeticion
float distanciaParcial;       //Distancia recorrida en 2 segundos me sirve para calcular la velocidad
float velocidad;              //Velocidad a la que va el atleta m/s
Output accion = Output(8,2);  //buzzer conectado al pin 8, relay conectado al pin 2

Uart mySerial (&sercom0, 5, 6, SERCOM_RX_PAD_1, UART_TX_PAD_0);
LSM6DS3Core myIMU( I2C_MODE, 0x6A );//nano iot 33 ->0x6A | original -> 0x6B


// Attach the interrupt handler to the SERCOM
void SERCOM0_Handler()
{
    mySerial.IrqHandler();
}

void setup()
{
	Serial.begin(9600);
  
	delay(1000); //relax...
	Serial.println("Processor came out of reset.\n");

	//Call .beginCore() to configure the IMU
	if( myIMU.beginCore() != 0 )
	{
		Serial.print("Error at beginCore().\n");
	}
	else
	{
		Serial.print("\nbeginCore() passed.\n");
	}

	//Error accumulation variable
	uint8_t errorAccumulator = 0;

	uint8_t dataToWrite = 0;  //Temporary variable

	//Setup the accelerometer******************************
	dataToWrite = 0; //Start Fresh!
	//  dataToWrite |= LSM6DS3_ACC_GYRO_BW_XL_200Hz;
	dataToWrite |= LSM6DS3_ACC_GYRO_FS_XL_2g;
	dataToWrite |= LSM6DS3_ACC_GYRO_ODR_XL_26Hz;

	// //Now, write the patched together data
	errorAccumulator += myIMU.writeRegister(LSM6DS3_ACC_GYRO_CTRL1_XL, dataToWrite);

	//Set the ODR bit
	errorAccumulator += myIMU.readRegister(&dataToWrite, LSM6DS3_ACC_GYRO_CTRL4_C);
	dataToWrite &= ~((uint8_t)LSM6DS3_ACC_GYRO_BW_SCAL_ODR_ENABLED);

	
	// Enable embedded functions -- ALSO clears the pdeo step count
	errorAccumulator += myIMU.writeRegister(LSM6DS3_ACC_GYRO_CTRL10_C, 0x3E);
	// Enable pedometer algorithm
	errorAccumulator += myIMU.writeRegister(LSM6DS3_ACC_GYRO_TAP_CFG1, 0x40);
	// Step Detector interrupt driven to INT1 pin
	errorAccumulator += myIMU.writeRegister( LSM6DS3_ACC_GYRO_INT1_CTRL, 0x10 );
	
	if( errorAccumulator )
	{
		Serial.println("Problem configuring the device.");
	}
	else
	{
		Serial.println("Device O.K.");
	}	
	delay(200);
   
// Reassign pins 5 and 6 to SERCOM alt
  pinPeripheral(5, PIO_SERCOM_ALT);
  pinPeripheral(6, PIO_SERCOM_ALT);

  // Start my new hardware serial
  mySerial.begin(115200);
}

void loop(){
  //Temporizador 60 segundos y contador de repeticiones
  unsigned long tiempo_actual = millis();
  if((tiempo_actual-tiempo_anterior) >= 60000){ 
    repeticiones++;
    distanciaPorRepeticion = distanciaRecorrida-distanciaAnterior;
    tiempo_anterior = tiempo_actual;
    distanciaAnterior = distanciaRecorrida;
    accion.playBuzzer(); //Como ya se cumplio un minuto suena el buzzer
  }
  
	uint8_t readDataByte = 0;
	uint16_t stepsTaken = 0;
	//Read the 16bit value by two 8bit operations
	myIMU.readRegister(&readDataByte, LSM6DS3_ACC_GYRO_STEP_COUNTER_H);
	stepsTaken = ((uint16_t)readDataByte) << 8;
	
	myIMU.readRegister(&readDataByte, LSM6DS3_ACC_GYRO_STEP_COUNTER_L);
	stepsTaken |= readDataByte;
	
	//Display steps taken
	//Serial.print("Steps taken: ");
  pasos = stepsTaken;
  String data = (String)pasos;
  //mySerial.print(data);
  //Serial.print(data);
  distanciaRecorrida = (pasos*zancada)/100; //La distancia me queda en metros

  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > 2000) {
    previousMillis = currentMillis;  
    distanciaParcial = ((pasos-pasosAnteriores)*zancada)/100; //La distancia me queda en metros
    velocidad = distanciaParcial*1.8; //(distanciaParcial/2000)*(1/1000)*(3600000/1) obtengo km/h distanciaPorRepeticion
    String datos = (String)repeticiones + ", " + (String)velocidad + ", " + (String)distanciaPorRepeticion + ", " + (String)distanciaRecorrida + ", " + (String)pasos;
    mySerial.println(datos);
    pasosAnteriores = pasos;
  }
  
	//Wait 1 second
	delay(1000);
	
}
