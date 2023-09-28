package com.example.librarydemo.Services;

import com.example.librarydemo.Models.Book.BookModel;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiService {
    @GET("api/Books")
    Call<BookModel[]> getYourData();
}
