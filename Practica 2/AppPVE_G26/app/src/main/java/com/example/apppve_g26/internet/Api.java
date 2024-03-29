package com.example.apppve_g26.internet;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface Api {

    String ENDPOINT= "http://35.209.151.29:4000";

    @Headers("Content-Type: application/json")
    @POST("/user/checkCredential")
    Call <Respuesta> verificarCredenciales(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/lectura")
    Call <Object> setlectura(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/user/startTest")
    Call <Object> setIniciarTest(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/lectura/vo2/add")
    Call <Object> setVo2(@Body String body);


}
