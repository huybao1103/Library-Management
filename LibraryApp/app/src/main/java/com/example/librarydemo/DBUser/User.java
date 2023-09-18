package com.example.librarydemo.DBUser;

public class User {
    private int UserID;
    private String Account, Fullname, Gmail, Password, Status;
    private int Quyen;

    public User() {
    }

    public User(int userID, String account, String fullname, String gmail, String password, String status, int quyen) {
        UserID = userID;
        Account = account;
        Fullname = fullname;
        Gmail = gmail;
        Password = password;
        Status = status;
        Quyen = quyen;
    }

    public User(String account, String fullname, String gmail, String password, String status, int quyen) {
        Account = account;
        Fullname = fullname;
        Gmail = gmail;
        Password = password;
        Status = status;
        Quyen = quyen;
    }

    public int getUserID() {
        return UserID;
    }

    public void setUserID(int userID) {
        UserID = userID;
    }

    public String getFullname() {
        return Fullname;
    }

    public void setFullname(String fullname) {
        Fullname = fullname;
    }

    public String getGmail() {
        return Gmail;
    }

    public void setGmail(String gmail) {
        Gmail = gmail;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public int getQuyen() {
        return Quyen;
    }

    public void setQuyen(int quyen) {
        Quyen = quyen;
    }

    public String getAccount() {
        return Account;
    }

    public void setAccount(String account) {
        Account = account;
    }
}
