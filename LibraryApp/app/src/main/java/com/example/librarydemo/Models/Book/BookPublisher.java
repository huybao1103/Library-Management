package com.example.librarydemo.Models.Book;

import com.example.librarydemo.Models.PublisherModel;

public class BookPublisher {
//    id?: string;
//    publisherId?: string;
//    bookId?: string;
//    publisher: IPublisher;

    private String id;
    private String publisherId;
    private String bookId;
    private PublisherModel publisher;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(String publisherId) {
        this.publisherId = publisherId;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public PublisherModel getPublisher() {
        return publisher;
    }

    public void setPublisher(PublisherModel publisher) {
        this.publisher = publisher;
    }
}
