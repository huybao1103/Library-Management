package com.example.librarydemo.Services;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.librarydemo.LayOutAndLisView;
import com.example.librarydemo.R;

public class LibaryCard extends AppCompatActivity {

    private ImageView imageView;
    private EditText editTextName, editTextBirthday, editTextAddress, editTextEmail, editTextPhone;
    private Button buttonCreateCard, buttonBack;
    private int contentView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_librarycard);

        // Ánh xạ các thành phần từ XML layout
        imageView = imageView.findViewById(R.id.btn_image);
        editTextName = editTextName.findViewById(R.id.editTextName);
        editTextBirthday = editTextBirthday.findViewById(R.id.editTextBirthday);
        editTextAddress = editTextAddress.findViewById(R.id.editTextAddress);
        editTextEmail = editTextEmail.findViewById(R.id.editTextEmail);
        editTextPhone = editTextPhone.findViewById(R.id.editTextPhone);
        buttonCreateCard = buttonCreateCard.findViewById(R.id.buttonCreateCard);
        buttonBack = buttonBack.findViewById(R.id.buttonBack);

        // Thiết lập sự kiện click cho nút "Tạo Thẻ"
        buttonCreateCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Lấy dữ liệu từ các EditText
                String name = editTextName.getText().toString();
                String birthday = editTextBirthday.getText().toString();
                String address = editTextAddress.getText().toString();
                String email = editTextEmail.getText().toString();
                String phone = editTextPhone.getText().toString();
                finish(); // Đóng màn hình hiện tại và quay lại màn hình trước đó
            }
        });



        // Thiết lập sự kiện click cho nút "Quay lại"
        buttonBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Điều hướng quay lại hoặc thực hiện các tác vụ liên quan đến nút "Quay lại"
            }
        });
    }

    public void setContentView(int contentView) {
        this.contentView = contentView;
    }

    public int getContentView() {
        return contentView;
    }

    public void LayOutAndListView(){
        Intent intent = new Intent( LibaryCard.this, LayOutAndLisView.class);
        startActivity(intent);
        finish();
    }
}