package com.example.apppve_g26;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.example.apppve_g26.internet.Api;
import com.example.apppve_g26.internet.Respuesta;

import org.json.JSONException;
import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class MainActivity extends AppCompatActivity {

    EditText user, password;
    TextView mensaje;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        user= (EditText)findViewById(R.id.texto_user);
        password = (EditText)findViewById(R.id.texto_contasenia);
        mensaje= (TextView)findViewById(R.id.mensaje);

        //user.setText("");
        //password.setText("");
        //mensaje.setText("");

    }

    public void registrarse(View view){
        Uri uri = Uri.parse("http://34.122.170.16:4200/user/signup");
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
    }



    public void Login(View view){

        String dato_usuario= user.getText().toString();
        String dato_contrasenia= password.getText().toString();
        System.out.println(">>"+dato_usuario);
        System.out.println(">>"+dato_contrasenia);
        mensaje.setText("cargando . . . ");
        //revisarCredenciales(dato_usuario, dato_contrasenia);
        Intent s = new Intent(this, SegundoActivity.class);
        //s.putExtra("nombre", data.get("nombre"));
        //s.putExtra("id",data.get("iduser"));
        startActivity(s);
    }

    private void revisarCredenciales(String name, String password){

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Api.ENDPOINT)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        Api json = retrofit.create(Api.class);

        try {
            //creando json
            JSONObject paramObject = new JSONObject();
            paramObject.put("email", name);
            paramObject.put("contrasena",password);
            System.out.println(">>Enviando JSON: "+paramObject.toString());

            Call<Respuesta> call= json.verificarCredenciales(paramObject.toString());

            call.enqueue(new Callback<Respuesta>() {
                @Override
                public void onResponse(Call<Respuesta> call, Response<Respuesta> response) {

                    if (!response.isSuccessful()) {
                        mensaje.setText("Error, codigo " + response.code());
                        return;
                    }

                    System.out.println("RECIBI ALGO -------------");
                    Respuesta lista = response.body();
                    String verificacion=lista.verificar();
                    mensaje.setText(verificacion);
                    if (verificacion=="Datos correctos c:"){
                        pasarSegundoActivity(lista);
                    }
                }

                @Override
                public void onFailure(Call<Respuesta> call, Throwable t) {
                    System.out.println("ERROR -------------------------");
                    System.out.println(t.getMessage());
                    mensaje.setText("ERROR, revisar estado conexion internet");
                }

            });

        } catch (JSONException e) {

        }

    }

    public void pasarSegundoActivity(Respuesta data){
        Intent s = new Intent(this, SegundoActivity.class);
        s.putExtra("id",data.get("iduser"));
        s.putExtra("nombre", data.get("nombre"));
        startActivity(s);

    }

    public void mensjae(View view){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("P.V.E.");
        builder.setMessage("Prenda Virtual para Ejercicio, permite leer datos como: oxigenacion de la sangre, temperatura y ritmo cardiaco de los atletas, se necesita conectarse por medido de bluetooth para recibir los datos de la prenda y enviar los datos a un servidor en la nube. Antes de enviar datos tienes que ingresar con tus credenciales.\n\n ate:grupo26 USAC ARQUi2  ");
        builder.setPositiveButton("Aceptar", null);
        AlertDialog dialog = builder.create();
        dialog.show();
    }
    private  void getPosts(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://arqui2-g26-pve.herokuapp.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        Api json = retrofit.create(Api.class);
        Call<Object> call= json.getPosts();
        call.enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                System.out.println("------------");
                System.out.println("- buena c: -");
                System.out.println("------------");
                if(!response.isSuccessful()){
                    System.out.println(response.code());
                    return;
                }
                Object lista= response.body();
                System.out.println(lista);
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                System.out.println("------------");
                System.out.println("-  mala :c -");
                System.out.println("------------");
                System.out.println(t.getMessage());
            }
        });
    }




}
