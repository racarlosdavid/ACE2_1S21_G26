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
    String URL="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        user= (EditText)findViewById(R.id.texto_user);
        password = (EditText)findViewById(R.id.texto_contasenia);
        mensaje= (TextView)findViewById(R.id.mensaje);

        user.setText("");
        password.setText("");
        mensaje.setText("");
    }

    public void registrarse(View view){
        Uri uri = Uri.parse(URL);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
    }

    public void Login(View view){
        String dato_usuario= user.getText().toString();
        String dato_contrasenia= password.getText().toString();
        mensaje.setText("cargando . . . ");
        revisarCredenciales(dato_usuario, dato_contrasenia);
    }

    private void revisarCredenciales(String name, String password){

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Api.ENDPOINT)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        Api json = retrofit.create(Api.class);

        try {
            JSONObject paramObject = new JSONObject();
            //paramObject.put("correo", name);
            //paramObject.put("contrasena",password);
            paramObject.put("correo", "bmoisesg@gmail.com");
            paramObject.put("contrasena","admin");
            System.out.println(">> Enviando JSON: "+paramObject.toString());

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
                    System.out.println(lista);
                    String verificacion=lista.verificar();
                    mensaje.setText(verificacion);
                    if (verificacion=="Datos correctos c:"){
                        pasarSegundoActivity(lista);
                    }
                }

                @Override
                public void onFailure(Call<Respuesta> call, Throwable t) {
                    mensaje.setText("Error del servidor, ingresa los datos otra vez :s");
                }
            });
        } catch (JSONException e) {
            System.out.println(e);
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
        builder.setTitle("VO2");
        builder.setMessage("El VO2 Max nos ayuda a conocer nuestro rendimiento físico al practicar deporte.\n\n" +
                "El VO2 Max es el volumen máximo de oxígeno que puede procesar el organismo " +
                "durante el entrenamiento físico. Se trata de la cantidad de oxígeno que podemos " +
                "aprovechar cuando practicamos deporte.\n\n" +
                "Cuanta mayor cantidad de oxígeno logremos transportar a los músculos por minuto, " +
                "mejor rendimiento tendremos. Por todo ello, el VO2 Max o Consumo Máximo de " +
                "Oxígeno es un gran pronosticador del éxito de pruebas de resistencia.\n\n" +
                "Debes ingresar a tu usuario para guardar tu informacion \nAntes empezar recordar que se debe actualizar el peso del atleta para tener un mejor reporte del VO2max\n\n Ate: Grupo26 USAC ARQUI2 ");
        builder.setPositiveButton("Aceptar", null);
        AlertDialog dialog = builder.create();
        dialog.show();
    }

}
