package com.example.librarydemo.Services;

import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;

public interface CheckBoxListener {
    void onCheckBoxChange(ArrayList<?> arrayList, Type type);
}
