package com.example.librarydemo.Author;

import static com.example.librarydemo.R.id.btnSave;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.R;

public class EditAuthor extends AppCompatActivity {

    private EditText editAuthorName;
    private EditText editAuthorPhone;
    private EditText editAuthorMail;

    private Button btnSave;
    private Button btnCancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_author);


        editAuthorName = findViewById(R.id.editAuthorName);
        editAuthorPhone = findViewById(R.id.editAuthorPhone);
        editAuthorMail = findViewById(R.id.editAuthorMail);

        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);

        //  nút save
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String authorName = editAuthorName.getText().toString();
                String authorPhone = editAuthorPhone.getText().toString();
                String authorMail = editAuthorMail.getText().toString();


                //lưu info
                if (!authorName.isEmpty() && !authorPhone.isEmpty() && !authorMail.isEmpty() ) {
                    // Thêm thông báo lưu thành công
                    Toast.makeText(EditAuthor.this, "lưu Author thành công", Toast.LENGTH_SHORT).show();

                    // Quay lại danh sách Publisher
                    Intent intent = new Intent(EditAuthor.this, AuthorListActivity.class);
                    startActivity(intent);
                } else {
                    // Thông báo nếu có trường nào đó chưa được nhập
                    Toast.makeText(EditAuthor.this, "Vui lòng nhập đầy đủ thông tin", Toast.LENGTH_SHORT).show();
                }
            }
        });

        //   nút cancel
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                finish();
            }
        });
    }

    private void saveAuthorInfo() {
        // Lấy thông tin  và gửi đến API để lưu
        // gửi dữ liệu đến API và kiểm tra kết quả

        // lưu thành công
        Toast.makeText(this, "Lưu thành công", Toast.LENGTH_SHORT).show();


        finish();
    }
}
