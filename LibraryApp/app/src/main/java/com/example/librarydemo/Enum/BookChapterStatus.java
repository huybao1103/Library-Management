package com.example.librarydemo.Enum;

public enum BookChapterStatus {
    Borrowed(0),
    Free(1),
    Lost(2),
    Destroyed(3);

    private final int code;

    BookChapterStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static BookChapterStatus fromCode(int code) {
        for (BookChapterStatus status : values()) {
            if (status.code == code) return status;
        }
        return Borrowed;
    }
}
