package com.example.librarydemo.Models.Book;

import com.example.librarydemo.Enum.BookChapterStatus;

public class BookChapter {
    private String id;
    private String identifyId;
    private int status;
    private String description;
    private String bookId;
    private int chapter;
    private String lostOrDestroyedDate;
    BookModel BookObject;

    public BookChapter() {
    }

// Getter Methods

    public String getId() {
        return id;
    }

    public String getIdentifyId() {
        return identifyId;
    }

    public int getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public String getBookId() {
        return bookId;
    }

    public int getChapter() {
        return chapter;
    }

    public String getLostOrDestroyedDate() {
        return lostOrDestroyedDate;
    }

    public BookModel getBook() {
        return BookObject;
    }

    // Setter Methods

    public void setId(String id) {
        this.id = id;
    }

    public void setIdentifyId(String identifyId) {
        this.identifyId = identifyId;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public void setChapter(int chapter) {
        this.chapter = chapter;
    }

    public void setLostOrDestroyedDate(String lostOrDestroyedDate) {
        this.lostOrDestroyedDate = lostOrDestroyedDate;
    }

    public void setBook(BookModel bookObject) {
        this.BookObject = bookObject;
    }
}
