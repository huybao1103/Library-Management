package com.example.librarydemo.Models.Cart;

import java.io.Serializable;

public class CartModel implements Serializable {
//    bookName?: string;
//    bookImageBase64?: string;
//    libraryCardId?: string;
//    bookChapterId?: string;
//    chapter?: string;

    String bookName, bookImageBase64, libraryCardId, bookChapterId, chapter;

    public CartModel() {
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookImageBase64() {
        return bookImageBase64;
    }

    public void setBookImageBase64(String bookImageBase64) {
        this.bookImageBase64 = bookImageBase64;
    }

    public String getLibraryCardId() {
        return libraryCardId;
    }

    public void setLibraryCardId(String libraryCardId) {
        this.libraryCardId = libraryCardId;
    }

    public String getBookChapterId() {
        return bookChapterId;
    }

    public void setBookChapterId(String bookChapterId) {
        this.bookChapterId = bookChapterId;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }
}
