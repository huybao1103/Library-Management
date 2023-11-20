package com.example.librarydemo.Models.Book;

public class BookRequestModel {
    private String id;
    private String name;
    private String publishYear;
    private String inputDay;
    private String[] authors;
    private String[] publishers;
    private String[] categories;
    private BookImage[] bookImages;
    private String base64Image;

    public BookRequestModel() {
    }

    public BookImage[] getBookImages() {
        return bookImages;
    }

    public void setBookImages(BookImage[] bookImages) {
        this.bookImages = bookImages;
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
        this.inputDay = inputDay;
    }

    public String[] getAuthors() {
        return authors;
    }

    public void setAuthors(String[] authors) {
        this.authors = authors;
    }

    public String[] getPublishers() {
        return publishers;
    }

    public void setPublishers(String[] publishers) {
        this.publishers = publishers;
    }

    public String[] getCategories() {
        return categories;
    }

    public void setCategories(String[] categories) {
        this.categories = categories;
    }

    // Getter và Setter cho thuộc tính base64Image
    public String getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }
}
