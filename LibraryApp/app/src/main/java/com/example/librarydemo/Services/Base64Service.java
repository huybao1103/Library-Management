package com.example.librarydemo.Services;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class Base64Service {
    Context _context;

    public Base64Service(Context context) {
        _context = context;
    }

    public String convertImageToBase64(Uri imageUri) {
        String base64 = "";
        try {
            InputStream inputStream = _context.getContentResolver().openInputStream(imageUri);
            byte[] bytes = getBytes(inputStream);
            base64 = Base64.encodeToString(bytes, Base64.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return base64;
    }

    public Bitmap convertBase64ToImage(String base64) {
        byte[] decodedString = Base64.decode(base64, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
    }
    private byte[] getBytes(InputStream inputStream) throws IOException {
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        int bufferSize = 2048;
        byte[] buffer = new byte[bufferSize];

        int len;
        while ((len = inputStream.read(buffer)) != -1) {
            byteBuffer.write(buffer, 0, len);
        }
        return byteBuffer.toByteArray();
    }
}
