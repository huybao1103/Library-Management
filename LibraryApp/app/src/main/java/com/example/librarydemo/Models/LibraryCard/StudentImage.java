package com.example.librarydemo.Models.LibraryCard;

import com.example.librarydemo.Models.UploadFile;

public class StudentImage {
    private String id;
    private String filePath;
    private String fileId;
    private String libraryCardId;
    private String base64;
    UploadFile file;


    // Getter Methods

    public String getId() {
        return id;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getFileId() {
        return fileId;
    }

    public String getLibraryCardId() {
        return libraryCardId;
    }

    public String getBase64() {
        return base64;
    }

    public UploadFile getFile() {
        return file;
    }

    // Setter Methods

    public void setId(String id) {
        this.id = id;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public void setLibraryCardId(String libraryCardId) {
        this.libraryCardId = libraryCardId;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public void setFile(UploadFile fileObject) {
        this.file = fileObject;
    }
}
