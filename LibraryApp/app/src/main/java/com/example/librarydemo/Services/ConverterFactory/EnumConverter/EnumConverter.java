package com.example.librarydemo.Services.ConverterFactory.EnumConverter;

import java.io.IOException;
import java.lang.reflect.Method;

import okhttp3.ResponseBody;
import retrofit2.Converter;

public class EnumConverter<T extends Enum<T>> implements Converter<ResponseBody, T> {
    private final Class<T> enumType;

    public EnumConverter(Class<T> enumType) {
        this.enumType = enumType;
    }

    @Override
    public T convert(ResponseBody body) throws IOException {
        try {
            int code = Integer.parseInt(body.string());
            for (T enumValue : enumType.getEnumConstants()) {
                Method fromCodeMethod = enumType.getMethod("fromCode", int.class);
                if (fromCodeMethod.invoke(null, code) == enumValue) {
                    return enumValue;
                }
            }
        } catch (Exception e) {
            // Handle or log exception
        }
        return enumType.getEnumConstants()[0]; // default to the first enum value
    }
}

