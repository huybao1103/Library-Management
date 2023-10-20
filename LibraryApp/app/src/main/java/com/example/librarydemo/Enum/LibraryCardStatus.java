package com.example.librarydemo.Enum;

public enum LibraryCardStatus {

    Active(0),
    Inactive(1),
    Expired(2);

    private final int code;

    LibraryCardStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static LibraryCardStatus fromCode(int code) {
        for (LibraryCardStatus status : values()) {
            if (status.code == code) return status;
        }
        return Active;
    }
}
