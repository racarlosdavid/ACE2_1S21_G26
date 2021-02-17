package com.example.apppve_g26;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.os.Handler;
import android.widget.Button;

import com.example.apppve_g26.internet.Api;
import com.example.apppve_g26.internet.Respuesta;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class SegundoActivity extends AppCompatActivity {

    TextView txt_id, txt_nombre,n1,n2,n3;
    Switch sw_enviar;
    TextView myLabel;
    EditText myTextbox;
    BluetoothAdapter mBluetoothAdapter;
    BluetoothSocket mmSocket;
    BluetoothDevice mmDevice;
    OutputStream mmOutputStream;
    InputStream mmInputStream;
    Thread workerThread;
    byte[] readBuffer;
    int readBufferPosition;
    int counter;
    volatile boolean stopWorker;
    int x=0;
    boolean coondicion=false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_segundo);

        txt_id=(TextView)findViewById(R.id.txt_id);
        txt_nombre=(TextView)findViewById(R.id.txt_name);
        sw_enviar= (Switch)findViewById(R.id.switch1);
        txt_id.setText(getIntent().getStringExtra("id"));
        txt_nombre.setText(getIntent().getStringExtra("nombre"));

        n1= (TextView)findViewById(R.id.numero1);
        n2= (TextView)findViewById(R.id.numero2);
        n3= (TextView)findViewById(R.id.numero3);

        Button openButton = (Button)findViewById(R.id.open);
        Button closeButton = (Button)findViewById(R.id.close);
        myLabel = (TextView)findViewById(R.id.label);





    }

    public void mensjae(View view){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("P.V.E.");
        builder.setMessage("Pasos para enviar datos: \n\n\n1. Tener conexion a WIFI \n2. Conectarse al bloutooth llamado 'grupo2' \n3. Presionar boton 'get' y esperar un segundo \n4. Activar el switch 'enviar' \n5. Listo, los datos ya se estan guardando en el servidor  ");
        builder.setPositiveButton("Aceptar", null);
        AlertDialog dialog = builder.create();
        dialog.show();
    }


    public void start(View view){
        try
        {
            findBT();
            openBT();
        }
        catch (IOException ex) { }
    }

    public void close(View v)
    {
        try
        {
            closeBT();
        }
        catch (IOException ex) { }
    }

    public void salir(View view){

        Intent i= new Intent(this,MainActivity.class);
        startActivity(i);
        finish();

    }



    void findBT()
    {
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if(mBluetoothAdapter == null)
        {
            myLabel.setText("No bluetooth adapter available");
        }

        if(!mBluetoothAdapter.isEnabled())
        {
            Intent enableBluetooth = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBluetooth, 0);
        }

        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
        if(pairedDevices.size() > 0)
        {
            for(BluetoothDevice device : pairedDevices)
            {
                if(device.getName().equals("grupo26"))
                {
                    mmDevice = device;
                    break;
                }
            }
        }
        myLabel.setText("Bluetooth Device Found");
    }

    void openBT() throws IOException
    {
        UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"); //Standard SerialPortService ID
        mmSocket = mmDevice.createRfcommSocketToServiceRecord(uuid);
        mmSocket.connect();
        mmOutputStream = mmSocket.getOutputStream();
        mmInputStream = mmSocket.getInputStream();

        beginListenForData();

        myLabel.setText("Bluetooth Opened");
    }

    void beginListenForData()
    {
        final Handler handler = new Handler();
        final byte delimiter = 10; //This is the ASCII code for a newline character

        stopWorker = false;
        readBufferPosition = 0;
        readBuffer = new byte[1024];
        workerThread = new Thread(new Runnable()
        {
            public void run()
            {
                while(!Thread.currentThread().isInterrupted() && !stopWorker)
                {
                    try
                    {
                        int bytesAvailable = mmInputStream.available();
                        if(bytesAvailable > 0)
                        {
                            byte[] packetBytes = new byte[bytesAvailable];
                            mmInputStream.read(packetBytes);
                            for(int i=0;i<bytesAvailable;i++)
                            {
                                byte b = packetBytes[i];
                                if(b == delimiter)
                                {
                                    byte[] encodedBytes = new byte[readBufferPosition];
                                    System.arraycopy(readBuffer, 0, encodedBytes, 0, encodedBytes.length);
                                    final String data = new String(encodedBytes, "US-ASCII");
                                    readBufferPosition = 0;

                                    handler.post(new Runnable()
                                    {
                                        public void run() { /*myLabel.setText(data);*/
                                           /* if (x==1){*/
                                                viewData(data);
                                               /* x=0;

                                            }else
                                            {
                                                x++;
                                            }*/

                                        }
                                    });
                                }
                                else
                                {
                                    readBuffer[readBufferPosition++] = b;

                                }
                            }
                            //String s = new String(readBuffer, StandardCharsets.UTF_8);
                            //System.out.println(">>recibiendo: "+s);
                        }
                    }
                    catch (IOException ex)
                    {
                        stopWorker = true;
                    }
                }
            }
        });

        workerThread.start();
    }
    void viewData(String data ){
        String[] lista = data.split(",");
        n1.setText(lista[0]);
        n3.setText(lista[2]);
        n2.setText(lista[1]);

        if (sw_enviar.isChecked()){

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd", Locale.getDefault());
            String fecha= sdf.format(new Date());
            enviarlectura(txt_id.getText().toString(),fecha );
        }

    }
    void limpiaretiquetas(){
        n1.setText("...");
        n2.setText("...");
        n3.setText("...");
    }

    void sendData() throws IOException
    {
        String msg = myTextbox.getText().toString();
        msg += "\n";
        mmOutputStream.write(msg.getBytes());
        myLabel.setText("Data Sent");
    }

    void closeBT() throws IOException
    {
        stopWorker = true;
        mmOutputStream.close();
        mmInputStream.close();
        mmSocket.close();
        myLabel.setText("Bluetooth Closed");
        limpiaretiquetas();
    }

    void enviarlectura(
            String id,
            String fecha
    ){
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(Api.ENDPOINT)
                    .addConverterFactory(ScalarsConverterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            Api json = retrofit.create(Api.class);

            try {
                //creando json
                JSONObject paramObject = new JSONObject();
                paramObject.put("id_user", id);
                paramObject.put("fecha",fecha);
                paramObject.put("t",n1.getText().toString());
                paramObject.put("o",n3.getText().toString());
                paramObject.put("r",n2.getText().toString());

                System.out.println(paramObject.toString());

                Call<Object> call= json.setlectura(paramObject.toString());

                call.enqueue(new Callback<Object>() {
                    @Override
                    public void onResponse(Call<Object> call, Response<Object> response) {

                        if (!response.isSuccessful()) {
                            System.out.println("Error, codigo " + response.code());
                            return;
                        }

                        System.out.println("RECIBI ALGO -------------");
                        System.out.println(response.toString());

                        System.out.println("-------------------------");

                    }

                    @Override
                    public void onFailure(Call<Object> call, Throwable t) {
                        System.out.println("ERROR -------------------------");
                        System.out.println(t.getMessage());
                        //mensaje.setText("ERROR, revisar estado conexion internet");
                    }

                });

            } catch (JSONException e) {

            }


    }
}