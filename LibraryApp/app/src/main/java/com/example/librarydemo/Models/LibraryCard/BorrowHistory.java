package com.example.librarydemo.Models.LibraryCard;

import com.example.librarydemo.Models.Book.BookChapter;

public class BorrowHistory {
    private String id;
    private String borrowDate;
    private String endDate;
    private int status;
    private String bookChapterId;
    private String libraryCardId;
    private String bookName;
    private int chapter;
    private BookChapter bookChapter;
    private LibraryCard libraryCard;

    public BorrowHistory() {
    }

    public LibraryCard getLibraryCard() {
        return libraryCard;
    }

    public void setLibraryCard(LibraryCard libraryCard) {
        this.libraryCard = libraryCard;
    }

    public BookChapter getBookChapter() {
        return bookChapter;
    }

    public void setBookChapter(BookChapter bookChapter) {
        this.bookChapter = bookChapter;
    }

// Getter Methods

    public String getId() {
        return id;
    }

    public String getBorrowDate() {
        return borrowDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public int getStatus() {
        return status;
    }

    public String getBookChapterId() {
        return bookChapterId;
    }

    public String getLibraryCardId() {
        return libraryCardId;
    }

    public String getBookName() {
        return bookName;
    }

    public int getChapter() {
        return chapter;
    }

    // Setter Methods

    public void setId(String id) {
        this.id = id;
    }

    public void setBorrowDate(String borrowDate) {
        this.borrowDate = borrowDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setBookChapterId(String bookChapterId) {
        this.bookChapterId = bookChapterId;
    }

    public void setLibraryCardId(String libraryCardId) {
        this.libraryCardId = libraryCardId;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setChapter(int chapter) {
        this.chapter = chapter;
    }
}
