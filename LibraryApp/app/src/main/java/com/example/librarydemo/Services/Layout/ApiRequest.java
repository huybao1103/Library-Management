package com.example.librarydemo.Services.Layout;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.ArrayList;
import java.util.List;


public class ApiRequest {
    public JsonObject convertModelToJSONObject(Object model) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(model);
        JsonParser parser = new JsonParser();
        return parser.parse(jsonString).getAsJsonObject();
    }

    public JsonArray convertModelToJSONArray(List<?> model) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(model);
        JsonParser parser = new JsonParser();
        return parser.parse(jsonString).getAsJsonArray();
    }
    public JsonArray convertModelToJSONArray(ArrayList<?> model) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(model);
        JsonParser parser = new JsonParser();
        return parser.parse(jsonString).getAsJsonArray();
    }
    public JsonArray convertModelToJSONArray(Object[] model) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(model);
        JsonParser parser = new JsonParser();
        return parser.parse(jsonString).getAsJsonArray();
    }
}
