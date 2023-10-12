package com.example.librarydemo.Services.Layout;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class ApiRequest {
    public JsonObject convertModelToJSONObject(Object model) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(model);
        JsonParser parser = new JsonParser();
        return parser.parse(jsonString).getAsJsonObject();
    }
}
