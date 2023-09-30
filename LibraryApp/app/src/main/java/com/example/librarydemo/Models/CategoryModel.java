package com.example.librarydemo.Models;

public class CategoryModel {
//    id: string,
//    name: string,
//    description: string

    private String id;
    private String name;
    private String description;

    public CategoryModel() {
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
