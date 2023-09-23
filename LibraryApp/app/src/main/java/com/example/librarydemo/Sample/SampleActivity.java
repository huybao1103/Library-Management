package com.example.librarydemo.Sample;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.Models.BookModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.HttpService;

import java.util.ArrayList;
import java.util.Arrays;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SampleActivity extends AppCompatActivity {
    private static final int PICK_IMAGE_REQUEST_CODE = 1;
    Button button, btn_image;
    ListView sample_list;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample);

        sample_list = findViewById(R.id.sample_list);

        button = findViewById(R.id.button);
        button.setOnClickListener(v -> callAPI());

        PickImage();
        callAPI();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST_CODE && resultCode == RESULT_OK && data != null && data.getData() != null) {
            Uri imageUri = data.getData();
            Base64Service base64Service = new Base64Service(getApplicationContext());

            String base64String = base64Service.convertImageToBase64(imageUri);
            displayImage(base64String);
        }
    }

    private void displayImage(String base64String) {
        Bitmap decodedByte = new Base64Service(getApplicationContext()).convertBase64ToImage(base64String);

        ImageView imageView = findViewById(R.id.image);
        imageView.setImageBitmap(decodedByte);
    }

    private void PickImage() {
        btn_image = findViewById(R.id.btn_image);
        btn_image.setOnClickListener(view -> {
            Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            startActivityForResult(intent, PICK_IMAGE_REQUEST_CODE);
        });
    }

    private void callAPI() {
        HttpService.httpService.getBooks().enqueue(new Callback<BookModel[]>() {
            @Override
            public void onResponse(Call<BookModel[]> call, Response<BookModel[]> response) {
                Toast.makeText(SampleActivity.this, "CAll API SUCCESS", Toast.LENGTH_SHORT).show();
                BookModel[] bookModels = response.body();

                if(bookModels != null) {
                    SampleAdapter adapter = new SampleAdapter(getApplicationContext(), R.layout.elemen_book, Arrays.asList(bookModels));
                    sample_list.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<BookModel[]> call, Throwable t) {
                Toast.makeText(SampleActivity.this, "CAll API FAILED", Toast.LENGTH_SHORT).show();
            }
        });
    }
}