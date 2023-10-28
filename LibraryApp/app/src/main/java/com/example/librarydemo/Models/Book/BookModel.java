package com.example.librarydemo.Models.Book;

import com.google.gson.annotations.SerializedName;

public class BookModel {
    private String id;
    private String name;
    private String publishYear;
    private String inputDay;
    private BookAuthor[] bookAuthors;
    private BookCategories[] bookCategories;
    private BookImage[] bookImages;
    private BookPublisher[] bookPublishers;
    private BookChapter[] bookChapters;

    public BookChapter[] getBookChapters() {
        return bookChapters;
    }

    public void setBookChapters(BookChapter[] bookChapters) {
        this.bookChapters = bookChapters;
    }

    public BookPublisher[] getBookPublishers() {
        return bookPublishers;
    }

    public void setBookPublishers(BookPublisher[] bookPublishers) {
        this.bookPublishers = bookPublishers;
    }

    public BookImage[] getBookImages() {
        return bookImages;
    }

    public void setBookImages(BookImage[] bookImages) {
        this.bookImages = bookImages;
    }

    public BookCategories[] getBookCategories() {
        return bookCategories;
    }

    public void setBookCategories(BookCategories[] bookCategories) {
        this.bookCategories = bookCategories;
    }

    public BookAuthor[] getBookAuthors() {
        return bookAuthors;
    }

    public void setBookAuthors(BookAuthor[] bookAuthors) {
        this.bookAuthors = bookAuthors;
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
        inputDay = inputDay;
    }

    public void setImageUrl(String imagePath) {
    }
}
