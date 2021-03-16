package com.example.apppve_g26.internet;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface Api {

    String ENDPOINT= "https://arqui2-g26-pve.herokuapp.com";

    @GET("atleta")
    Call<Object> getPosts();

    @Headers("Content-Type: application/json")
    @POST("/atleta/checkCredential")
    Call <Respuesta> verificarCredenciales(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/lectura")
    Call <Object> setlectura(@Body String body);


}
