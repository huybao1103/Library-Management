package com.example.librarydemo.Publisher;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.R;

public class EditPublisher extends AppCompatActivity {

    private EditText editTextPublisherName;
    private EditText editTextPublisherPhone;
    private EditText editTextPublisherMail;
    private EditText editTextPublisherAddress;
    private Button btnSave;


    private Button btnCancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_publisher);

        editTextPublisherName = findViewById(R.id.editTextPublisherName_edit);
        editTextPublisherPhone = findViewById(R.id.editTextPublisherPhone_edit);
        editTextPublisherMail = findViewById(R.id.editTextPublisherMail_edit);
        editTextPublisherAddress = findViewById(R.id.editTextPublisherAddress_edit);
        btnSave = findViewById(R.id.buttonSave);
        btnCancel = findViewById(R.id.buttonCancel);

        // Nút save
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String publisherName = editTextPublisherName.getText().toString();
                String publisherPhone = editTextPublisherPhone.getText().toString();
                String publisherMail = editTextPublisherMail.getText().toString();
                String publisherAddress = editTextPublisherAddress.getText().toString();

                // Kiểm tra không để trống
                if (publisherName.isEmpty() || publisherPhone.isEmpty() || publisherMail.isEmpty() || publisherAddress.isEmpty()) {
                    Toast.makeText(EditPublisher.this, "Please enter complete information", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Kiểm tra số điện thoại có đủ 10 số không
                if (publisherPhone.length() != 10) {
                    Toast.makeText(EditPublisher.this, "Phone number must have 10 digits", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Sử dụng biểu thức chính quy để kiểm tra định dạng email
                String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+com";

                if (!publisherMail.matches(emailPattern)) {
                    Toast.makeText(EditPublisher.this, "Invalid email address", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Lưu thông báo thêm thành công và quay lại danh sách Publisher
                Toast.makeText(EditPublisher.this, "Saved successfully", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(EditPublisher.this, PublisherInformation.class);
                startActivity(intent);
            }
        });

        // Nút cancel
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Quay lại danh sách nhà xuất bản (activity_list_publisher.xml)
            }
        });
    }

    private void savePublisherInfo() {
        // Lấy thông tin  và gửi đến API để lưu
        // gửi dữ liệu đến API và kiểm tra kết quả
        // lưu thành công
        Toast.makeText(this, "Saved succesfully", Toast.LENGTH_SHORT).show();

        finish();
    }
}
