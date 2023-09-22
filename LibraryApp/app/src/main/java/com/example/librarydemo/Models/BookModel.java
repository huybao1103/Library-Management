package com.example.librarydemo.Models;

import com.google.gson.annotations.SerializedName;

public class BookModel {
    private String id;
    private String name;
    private String publishYear;
    private String inputDay;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(String publishYear) {
        this.publishYear = publishYear;
    }

    public String getInputDay() {
        return inputDay;
    }

    public void setInputDay(String inputDay) {
        inputDay = inputDay;
    }
}
