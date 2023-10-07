package com.example.librarydemo.Publisher;

import android.content.Intent;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.R;

public class AddPublisher extends AppCompatActivity {

    private EditText editTextPublisherName;
    private EditText editTextPublisherPhone;
    private EditText editTextPublisherMail;
    private EditText editTextPublisherAddress;
    private String publisher;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_publisher);

        editTextPublisherName = findViewById(R.id.editTextPublisherName);
        editTextPublisherPhone = findViewById(R.id.editTextPublisherPhone);
        editTextPublisherMail = findViewById(R.id.editTextPublisherMail);
        editTextPublisherAddress = findViewById(R.id.editTextPublisherAddress);

        Button addButton = findViewById(R.id.buttonAdd);
        Button cancelButton = findViewById(R.id.buttonCancel);

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String publisherName = editTextPublisherName.getText().toString();
                String publisherPhone = editTextPublisherPhone.getText().toString();
                String publisherMail = editTextPublisherMail.getText().toString();
                String publisherAddress = editTextPublisherAddress.getText().toString();

                // Kiểm tra số điện thoại có đủ 10 số không
                if (publisherPhone.length() != 10) {
                    Toast.makeText(AddPublisher.this, "Phone number must have 10 digits", Toast.LENGTH_SHORT).show();
                    return; // Ngừng xử lý và không thực hiện thêm Publisher
                }

                // Kiểm tra định dạng email là .com
                if (!publisherMail.endsWith(".com")) {
                    Toast.makeText(AddPublisher.this, "Email address must end with .com", Toast.LENGTH_SHORT).show();
                    return; // Ngừng xử lý và không thực hiện thêm Publisher
                }

                if (!publisherName.isEmpty() && !publisherPhone.isEmpty() && !publisherMail.isEmpty() && !publisherAddress.isEmpty()) {
                    // Thêm thông báo thêm thành công
                    Toast.makeText(AddPublisher.this, "Added successfully", Toast.LENGTH_SHORT).show();

                    // Quay lại danh sách Publisher
                    Intent intent = new Intent(AddPublisher.this, PublisherInformation.class);
                    startActivity(intent);
                } else {
                    // Thông báo nếu có trường nào đó chưa được nhập
                    Toast.makeText(AddPublisher.this, "Please enter complete information", Toast.LENGTH_SHORT).show();
                }
            }
        });

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddPublisher.this, PublisherInformation.class);
                startActivity(intent);
            }
        });
    }

    public void notifyDataSetChanged() {
    }
}


