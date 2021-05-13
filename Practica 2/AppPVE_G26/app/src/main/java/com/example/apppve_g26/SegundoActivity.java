package com.example.apppve_g26;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
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
import android.os.Handler;
import android.os.Bundle;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
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

    TextView txt_id, txt_nombre,n1,n2, label_porcentaje;
    Button boton_start, boton_stop;
    ProgressBar progressBar;
    Switch sw_enviar;
    TextView myLabel;     // etiqueta que muestra sobre el bluetooth al usuario
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
    double progressStatus = 0;
    boolean coondicion=false;
    private Handler handler = new Handler();



    //variable para calcular el vo2 max
    double volMax=0;
    double volMax_tmp=0;
    boolean flag_vol=true;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_segundo);

        txt_id=(TextView)findViewById(R.id.txt_id);
        txt_nombre=(TextView)findViewById(R.id.txt_name);
        sw_enviar= (Switch)findViewById(R.id.switch1);

        //datos que recibe el activity----------------------------
        txt_id.setText(getIntent().getStringExtra("id"));
        txt_nombre.setText(getIntent().getStringExtra("nombre"));
        //---------------------------------------------------------

        n1= (TextView)findViewById(R.id.numero1);
        n2= (TextView)findViewById(R.id.numero2);

        Button openButton = (Button)findViewById(R.id.open);
        Button closeButton = (Button)findViewById(R.id.close);
        myLabel = (TextView)findViewById(R.id.label);

        boton_start= (Button)findViewById(R.id.button2);
        boton_stop=(Button)findViewById(R.id.close);
        label_porcentaje= (TextView) findViewById(R.id.porcentaje);

        boton_start.setVisibility(View.INVISIBLE);

        progressBar= (ProgressBar)findViewById(R.id.progressBar);

        label_porcentaje.setVisibility(View.INVISIBLE);
        progressBar.setVisibility(View.INVISIBLE);



    }

    public void mensjae(View view)
    {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("PO2");
        builder.setMessage("1. Presionar boton Get_data_bt para recibir datos del bluetooth grupo26\n" +
                "2. Presionar boton start test y empezara el test que dura 5 min." +
                "");
        builder.setPositiveButton("Aceptar", null);
        AlertDialog dialog = builder.create();
        dialog.show();
    }
    public void mensaje_terminotest()
    {
        AlertDialog.Builder builder2 = new AlertDialog.Builder(this);
        builder2.setTitle("Fin Test");
        builder2.setMessage("El test ha llegado a su fin! c: ");
        builder2.setPositiveButton("Ok", null);
        AlertDialog dialog = builder2.create();
        dialog.show();
        progressBar.setProgress(0);
    }
    public void enviar_vo2(){

        //consumir post para ingresar
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Api.ENDPOINT)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        Api json = retrofit.create(Api.class);

        try {
            //creando json
            JSONObject paramObject = new JSONObject();
            paramObject.put("iduser", txt_id.getText().toString());
            paramObject.put("dato",volMax+volMax_tmp);

            System.out.println(">> enviando: "+paramObject.toString());
            Call<Object> call= json.setVo2(paramObject.toString());
            call.enqueue(new Callback<Object>() {
                @Override
                public void onResponse(Call<Object> call, Response<Object> response) {

                    if (!response.isSuccessful()) {
                        System.out.println("Error, codigo " + response.code());
                        return;
                    }

                    System.out.println("RECIBI ALGOO -------------");
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

    public void btn_inciar(View view){
        volMax=0;
        volMax_tmp=0;
        flag_vol= true;

        System.out.println("hola! ejecutare el setprogress");
        enviar_data_start_test();
        label_porcentaje.setVisibility(View.VISIBLE);
        progressBar.setVisibility(View.VISIBLE);
        boton_start.setVisibility(View.INVISIBLE);
        sw_enviar.setChecked(true);


        new Thread(new Runnable() {
            public void run() {

                while (progressStatus < 100) {
                    progressStatus += 0.33;

                    handler.post(new Runnable() {
                        public void run() {
                            System.out.println(progressStatus);
                            BigDecimal formatNumber = new BigDecimal(progressStatus);
                            formatNumber = formatNumber.setScale(2, RoundingMode.DOWN);
                            progressBar.setProgress(Integer.valueOf(formatNumber.intValue()));
                            label_porcentaje.setText(Integer.toString(formatNumber.intValue())+"%");

                            if (progressStatus>100){
                                mensaje_terminotest();
                                progressBar.setProgress(0);
                                label_porcentaje.setVisibility(View.INVISIBLE);
                                progressBar.setVisibility(View.INVISIBLE);
                                label_porcentaje.setText("0%");
                                sw_enviar.setChecked(false) ;
                                boton_start.setVisibility(View.VISIBLE);
                                enviar_vo2();
                            }


                        }
                    });
                    try {

                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }


                }
                progressStatus=0;
            }
        }).start();


        

    }

    public void start(View view)
    {
        try
        {
            boton_start.setVisibility(View.VISIBLE);
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

    public void salir(View view)
    {
        Intent i= new Intent(this,MainActivity.class);
        startActivity(i);
        finish();
    }

    void findBT()
    {
        //se sincronizara con el dispositivo llamado "grupo26"
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
                                        public void run() {
                                            viewData(data);


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

        n2.setText(lista[1].replace(" ",""));
        n1.setText(lista[0].replace(" ",""));
        //estas condiciones revisara los picos de cuando inahala para que las vaya sumando
        double numero_inhala= Double.valueOf(n1.getText().toString());
        //int numero_exhala= Integer.valueOf(n2.getText().toString());


        if (numero_inhala==0){
            if (flag_vol){
                flag_vol=false;
                volMax+=volMax_tmp;
                volMax_tmp=0;
            }
        }else{
            flag_vol=true;
            if (numero_inhala>volMax_tmp){
                volMax_tmp= numero_inhala;
            }
        }



        if (sw_enviar.isChecked()){

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd", Locale.getDefault());
            String fecha= sdf.format(new Date());
            String hora = new SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(new Date());
            System.out.println("enviando dato...");
            enviarlectura(txt_id.getText().toString(),fecha,hora );
        }

    }
    void enviar_data_start_test(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd", Locale.getDefault());
        String fecha= sdf.format(new Date());
        String hora = new SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(new Date());

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Api.ENDPOINT)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        Api json = retrofit.create(Api.class);

        try {
            //creando json
            JSONObject paramObject = new JSONObject();
            paramObject.put("iduser", txt_id.getText().toString());
            paramObject.put("fecha",fecha);
            paramObject.put("hora",hora);

            System.out.println(">> enviando: "+paramObject.toString());
            Call<Object> call= json.setIniciarTest(paramObject.toString());
            call.enqueue(new Callback<Object>() {
                @Override
                public void onResponse(Call<Object> call, Response<Object> response) {

                    if (!response.isSuccessful()) {
                        System.out.println("Error, codigo " + response.code());
                        return;
                    }

                    System.out.println("RECIBI ALGOO -------------");
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
    void limpiaretiquetas(){
        n1.setText("...");
        n2.setText("...");

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

    void enviarlectura( String id, String fecha, String hora)
    {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(Api.ENDPOINT)
                    .addConverterFactory(ScalarsConverterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            Api json = retrofit.create(Api.class);

            try {
                //creando json
                JSONObject paramObject = new JSONObject();
                paramObject.put("iduser", id);
                paramObject.put("fecha",fecha);
                paramObject.put("hora",hora);
                paramObject.put("inhala",n1.getText().toString());
                paramObject.put("exhala",n2.getText().toString());

                System.out.println(">> enviando: "+paramObject.toString());
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