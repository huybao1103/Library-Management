package com.example.librarydemo.Services.ApiInterface;

import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.SpinnerModel;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.json.JSONArray;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {
    // Fetch all
    @GET("api/{controller}")
    Call<JsonArray> getAll(@Path("controller") String controller);

    // Fetch spinner
    @GET("api/{controller}/option")
    Call<SpinnerModel[]> getSpinner(@Path("controller") String controller);

    // Fetch a item by its ID
    @GET("api/{controller}/{id}")
    <T> Call<T> getById(@Path("controller") String controller, @Path("id") int id);

    // Save information
    @POST("api/{controller}")
    <T> Call<T> save(@Path("controller") String controller, @Body T data);

    // Search book
    @POST("api/{controller}/search")
    <T> Call<T> searchBook(@Path("controller") String controller, @Body T data);

    // Delete a item by its ID
    @DELETE("api/{controller}/{id}")
    Call<Void> delete(@Path("controller") String controller, @Path("id") int id);
}
