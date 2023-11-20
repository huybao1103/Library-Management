package com.example.librarydemo.Models.Account;

import android.os.Parcel;
import android.os.Parcelable;

import com.example.librarydemo.Models.Role.RoleModel;

import java.io.Serializable;

public class AccountModel implements Parcelable {
    String id, email, roleId, password;
    RoleModel role;

    public AccountModel() {
    }

    protected AccountModel(Parcel in) {
        id = in.readString();
        email = in.readString();
        roleId = in.readString();
        password = in.readString();
    }

    public static final Creator<AccountModel> CREATOR = new Creator<AccountModel>() {
        @Override
        public AccountModel createFromParcel(Parcel in) {
            return new AccountModel(in);
        }

        @Override
        public AccountModel[] newArray(int size) {
            return new AccountModel[size];
        }
    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleModel getRole() {
        return role;
    }

    public void setRole(RoleModel role) {
        this.role = role;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(getId());
        parcel.writeString(getEmail());
        parcel.writeString(getRole().getName());
    }
}
