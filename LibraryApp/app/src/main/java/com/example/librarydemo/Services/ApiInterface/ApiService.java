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
    /**
     * Fetch all
     * @param controller as name of the controller
     * @return JsonArray
     */
    @GET("api/{controller}")
    Call<JsonArray> getAll(@Path("controller") String controller);

    /**
     * Fetch spinner
     * @param controller as name of the controller
     * @return JsonArray
     */
    @GET("api/{controller}/option")
    Call<JsonArray> getSpinner(@Path("controller") String controller); /* Dùng model SpinnerModel */

    /**
     * Fetch a item by its ID
     * @param controller as name of the controller
     * @param id as item id you want to get
     * @return JsonObject
     */
    @GET("api/{controller}/get-by-id/{id}")
    Call<JsonObject> getById(@Path("controller") String controller, @Path("id") String id);

    /**
     * Save information
     * @param controller as name of the controller
     * @param data as an item you want to save (JSonObject)
     * @return JsonObject
     */
    @POST("api/{controller}/save")
    Call<JsonObject> save(@Path("controller") String controller, @Body JsonObject data);
    @POST("api/{controller}/save")
    Call<JsonArray> save(@Path("controller") String controller, @Body JsonArray data);

    /**
     * Search book
     * @param controller as name of the controller
     * @param data as the condition you want to save (JSonObject)
     * @return JsonArray
     */
    @POST("api/{controller}/search")
    Call<JsonArray> searchBook(@Path("controller") String controller, @Body JsonObject data);

    /**
     * Delete a item by its ID
     * @param controller as name of the controller
     * @param id as an item you want to delete
     * @return none
     */
    @DELETE("api/{controller}/delete/{id}")
    Call<Void> delete(@Path("controller") String controller, @Path("id") String id);

    /**
     * Get list of item with a custom url
     * @param url - as custom url ( ControllerConst )
     * @param method - as custom url ( method name )
     * @return JsonArray
     */
    @GET("api/{controller}/{method}")
    Call<JsonArray> getAllWithCustomUrl(@Path("controller") String url, @Path("method") String method);

    @POST("api/{controller}/{method}")
    Call<JsonObject> saveAllWithCustomUrl(@Path("controller") String url, @Path("method") String method, @Body JsonObject data);
    @POST("api/{controller}/{method}")
    Call<JsonArray> saveAllWithCustomUrl(@Path("controller") String url, @Path("method") String method, @Body JsonArray data);

    /**
     * Get an item with a custom url
     * @param url - as custom url ( {controller}/{method} )
     * @return JsonObject
     */
    @GET("api/{url}")
    Call<JsonObject> getByIdWithCustomUrl(@Path("url") String url);

    @GET("api/BookChapters/option/{bookId}")
    Call<JsonArray> getBookChapterSpinner(@Path("bookId") String bookId);
}
