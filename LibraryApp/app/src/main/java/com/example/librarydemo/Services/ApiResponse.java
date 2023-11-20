package com.example.librarydemo.Services;

import android.os.Build;

import com.example.librarydemo.Models.Book.BookModel;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;

import retrofit2.Response;

public class ApiResponse<T> {
    final String JSON_ARRAY_TYPE = JsonArray.class.getName();
    final String JSON_OBJ_TYPE = JsonObject.class.getName();
    public T getResultFromResponse(Response<?> response, Type type) {
        if(response.isSuccessful() && response.body() != null) {
            String responseType = response.body().getClass().getName();

            if(responseType.equals(JSON_ARRAY_TYPE)) {
                JsonArray jsonArray = (JsonArray) response.body();
                return new Gson().fromJson(jsonArray.getAsJsonArray(), type);
            } else if (responseType.equals(JSON_OBJ_TYPE)) {
                JsonObject jsonObject = (JsonObject) response.body();
                return new Gson().fromJson(jsonObject.getAsJsonObject(), type);
            }
        }
        return null;
    }

    public T getErrorFromResponse(Response<?> response, Type type) {
        if(response.isSuccessful() && response.errorBody() != null) {
            String responseType = response.errorBody().getClass().getName();

            if(responseType.equals(JSON_ARRAY_TYPE)) {
                JsonArray jsonArray = (JsonArray) response.body();
                return new Gson().fromJson(jsonArray.getAsJsonArray(), type);
            } else if (responseType.equals(JSON_OBJ_TYPE)) {
                JsonObject jsonObject = (JsonObject) response.body();
                return new Gson().fromJson(jsonObject.getAsJsonObject(), type);
            }
        }
        return null;
    }
}
