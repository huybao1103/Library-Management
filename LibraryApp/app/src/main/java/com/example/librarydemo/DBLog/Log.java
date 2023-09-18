package com.example.librarydemo.DBLog;


public class Log {
    private int LogID;
    private String Account;
    private int BookID;
    private String BookTitle, NgayDK;

    public Log() {
    }

    public Log(int logID, String account, int bookID, String bookTitle, String ngayDK) {
        LogID = logID;
        Account = account;
        BookID = bookID;
        BookTitle = bookTitle;
        NgayDK = ngayDK;
    }

    public Log(String account, int bookID, String bookTitle, String ngayDK) {
        Account = account;
        BookID = bookID;
        BookTitle = bookTitle;
        NgayDK = ngayDK;
    }

    public int getLogID() {
        return LogID;
    }

    public void setLogID(int logID) {
        LogID = logID;
    }

    public String getAccount() {
        return Account;
    }

    public void setAccount(String account) {
        Account = account;
    }

    public int getBookID() {
        return BookID;
    }

    public void setBookID(int bookID) {
        BookID = bookID;
    }

    public String getBookTitle() {
        return BookTitle;
    }

    public void setBookTitle(String bookTitle) {
        BookTitle = bookTitle;
    }

    public String getNgayDK() {
        return NgayDK;
    }

    public void setNgayDK(String ngayDK) {
        NgayDK = ngayDK;
    }
}
