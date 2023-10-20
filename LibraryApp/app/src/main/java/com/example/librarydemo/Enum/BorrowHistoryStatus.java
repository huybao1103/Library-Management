package com.example.librarydemo.Enum;

public enum BorrowHistoryStatus {

    Active(0),
    Inactive(1),
    Expired(2),
    Returned(3),
    Destroyed(4),
    Lost(5);

    private final int code;

    BorrowHistoryStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static BorrowHistoryStatus fromCode(int code) {
        for (BorrowHistoryStatus status : values()) {
            if (status.code == code) return status;
        }
        return Active;
    }
}
