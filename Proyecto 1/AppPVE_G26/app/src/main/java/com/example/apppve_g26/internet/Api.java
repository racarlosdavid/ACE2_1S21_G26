package com.example.apppve_g26.internet;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface Api {

    String ENDPOINT= "http://35.209.252.22:3000";

    @GET("user")
    Call<Object> getPosts();

    @Headers("Content-Type: application/json")
    @POST("/user/checkCredential")
    Call <Respuesta> verificarCredenciales(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/lectura")
    Call <Object> setlectura(@Body String body);


    @Headers("Content-Type: application/json")
    @POST("/user/increFallo")
    Call <Object> set1(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/user/increRendido")
    Call <Object> set2(@Body String body);

    @Headers("Content-Type: application/json")
    @POST("/user/iniciarTest")
    Call <Object> set3(@Body String body);


}
