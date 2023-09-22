package com.example.librarydemo.Services;

import com.example.librarydemo.Models.BookModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public interface HttpService {
    final String url = "https://127.0.0.1:7082/";

    Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

    HttpService httpService = new Retrofit.Builder()
            .baseUrl(url)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
            .create(HttpService.class);

    @GET("api/Books")
    Call<BookModel[]> getBooks();
}
