package com.example.librarydemo.Models.Book;

import com.example.librarydemo.Models.UploadFile;

public class BookImage {
//    id?: string;
//    filePath?: string;
//    fileId?: string;
//    bookId?: string;
//    base64: string;
//    file: UploadFile;

    private String id;
    private String filePath;
    private String fileId;
    private String bookId;
    private String base64;
    private UploadFile file;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public UploadFile getFile() {
        return file;
    }

    public void setFile(UploadFile file) {
        this.file = file;
    }
}
