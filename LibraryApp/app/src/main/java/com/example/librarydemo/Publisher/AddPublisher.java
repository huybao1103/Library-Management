package com.example.librarydemo.Publisher;

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

                if (publisherName.isEmpty() || publisherPhone.isEmpty() || publisherMail.isEmpty() || publisherAddress.isEmpty()) {
                    // Thông báo yêu cầu nhập đủ thông tin
                    Toast.makeText(AddPublisher.this, "Please enter complete information", Toast.LENGTH_SHORT).show();
                    return; // Ngừng xử lý và không thực hiện thêm Publisher
                }

                // Kiểm tra số điện thoại phải có đúng 10 chữ số và không chứa ký tự hay chữ cái
                if (!publisherPhone.matches("[0-9]{10}")) {
                    Toast.makeText(AddPublisher.this, "Phone number must have exactly 10 digits and contain only digits", Toast.LENGTH_SHORT).show();
                    return; // Ngừng xử lý và không thực hiện thêm Publisher
                }

                // Kiểm tra định dạng email là .com
                if (!publisherMail.endsWith(".com")) {
                    Toast.makeText(AddPublisher.this, "Email address must end with .com", Toast.LENGTH_SHORT).show();
                    return; // Ngừng xử lý và không thực hiện thêm Publisher
                }

                // Nếu tất cả điều kiện được đáp ứng, thực hiện thêm Publisher và hiển thị thông báo
                // Thêm thông báo thêm thành công
                Toast.makeText(AddPublisher.this, "Added successfully", Toast.LENGTH_SHORT).show();

                // Quay lại danh sách Publisher
                Intent intent = new Intent(AddPublisher.this, PublisherInformation.class);
                startActivity(intent);
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
