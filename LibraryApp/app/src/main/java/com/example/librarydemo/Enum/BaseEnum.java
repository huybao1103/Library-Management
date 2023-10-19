package com.example.librarydemo.Enum;

public enum BaseEnum {
    UNKNOWN(100);
    private int code;

    BaseEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static BaseEnum fromCode(int code) {
        for (BaseEnum status : values()) {
            if (status.code == code)
                return status;
        }
        return UNKNOWN;
    }
}
