package com.example.librarydemo.Author;

import android.content.Intent;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.R;

public class AddAuthor extends AppCompatActivity {

    private EditText editTextAuthorName;
    private EditText editTextAuthorPhone;
    private EditText editTextAuthorMail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_author);


        editTextAuthorName = findViewById(R.id.edAuthorName);
        editTextAuthorPhone = findViewById(R.id.edAuthorPhone);
        editTextAuthorMail = findViewById(R.id.edAuthorMail);


        Button addButton = findViewById(R.id.AddAuthor);
        Button cancelButton = findViewById(R.id.CancelAuthor);

        //Nut add
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String publisherName = editTextAuthorName.getText().toString();
                String publisherPhone = editTextAuthorPhone.getText().toString();
                String publisherMail = editTextAuthorMail.getText().toString();


                //lưu info
                if (!publisherName.isEmpty() && !publisherPhone.isEmpty() && !publisherMail.isEmpty() ) {
                    // Thêm thông báo thêm thành công
                    Toast.makeText(AddAuthor.this, "Thêm Author thành công", Toast.LENGTH_SHORT).show();

                    // Quay lại danh sách Publisher
                    Intent intent = new Intent(AddAuthor.this, AuthorListActivity.class);
                    startActivity(intent);
                } else {
                    // Thông báo nếu có trường nào đó chưa được nhập
                    Toast.makeText(AddAuthor.this, "Vui lòng nhập đầy đủ thông tin", Toast.LENGTH_SHORT).show();
                }
            }
        });

        //nút cancel
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddAuthor.this, AuthorListActivity.class);
                startActivity(intent);
            }
        });
    }

    public void notifyDataSetChanged() {
    }
}
