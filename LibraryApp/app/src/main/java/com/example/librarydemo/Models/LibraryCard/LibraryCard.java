package com.example.librarydemo.Models.LibraryCard;

import com.google.gson.annotations.SerializedName;

public class LibraryCard {
    private String id;
    private String name;

    @SerializedName("class")
    private String studentClass;
    private String expiryDate;
    private int status;
    private String description;
    private String studentId;
    private BorrowHistory[] borrowHistories;
    private StudentImage[] studentImages;

    public LibraryCard() {
    }

    public StudentImage[] getStudentImages() {
        return studentImages;
    }

    public void setStudentImages(StudentImage[] studentImages) {
        this.studentImages = studentImages;
    }

    public BorrowHistory[] getBorrowHistories() {
        return borrowHistories;
    }

    public void setBorrowHistories(BorrowHistory[] borrowHistories) {
        this.borrowHistories = borrowHistories;
    }

// Getter Methods

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public int getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public String getStudentId() {
        return studentId;
    }

    // Setter Methods

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStudentClass(String Class) {
        this.studentClass = Class;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
