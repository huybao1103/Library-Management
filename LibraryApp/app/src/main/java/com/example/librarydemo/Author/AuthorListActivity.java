package com.example.librarydemo.Author;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.MultiAutoCompleteTextView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Activity.Books.BookAuthor.BookAuthorAdapter;
import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;

import java.util.ArrayList;
import java.util.List;

public class AuthorListActivity extends AppCompatActivity {
    private ArrayList<String> ListAuthor;
    private ArrayAdapter<String> AuthorAdapter;
    private ListView listView;
    private EditText EditTextAuthorName ;
    private EditText editTextAuthorPhone;
    private EditText editTextAuthorMail;

    private int selectedAuthorPosition = -1;
    ApiService apiService;
    MultiAutoCompleteTextView spn_category;
    List<SpinnerOption> categories;
    ArrayList<SpinnerOption> selectedCategories;
    EditText edt_inputDay;
    RecyclerView rcl_author;
    BookAuthorAdapter bookAuthorAdapter;
    BookModel currentBook;
    AuthorModel[] authors;
    EditText edt_bookName, edt_publishYear;

    EditText edit_author_name;
    EditText add_author_name;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_author_list2);
        // Khởi tạo danh sách nhà xuất bản và adapter cho ListView
        ListAuthor = new ArrayList<>();
//        publisherAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, publisherList);
        listView = findViewById(R.id.listView);
        listView.setAdapter(AuthorAdapter);

//        // Khởi tạo các trường EditText
//        editTextAuthorName = findViewById(R.id.editTextAuthorName);
//        editTextAuthorPhone = findViewById(R.id.editTextAuthorPhone);
//        editTextAuthorMail = findViewById(R.id.editTextAuthorMail);

        // Thêm sự kiện click vào ListView để chọn một nhà xuất bản
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                selectedAuthorPosition = position;
                String selectedAuthor = ListAuthor.get(position);
                // Hiển thị thông tin nhà xuất bản trong các trường EditText
                displayAuthorInfo(selectedAuthor);
            }
        });

        // Thêm sự kiện click vào nút "ADD" để thêm tác giả mới
        Button addButton = findViewById(R.id.buttonAddAuthor);
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AuthorListActivity.this,AddAuthor.class);
                startActivity(intent);
            }
        });


        // Thêm sự kiện click vào nút "SAVE" để lưu thông tin tác giả đã chỉnh sửa
        ImageView editButton = findViewById(R.id.EditAu);
        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AuthorListActivity.this,EditAuthor.class);
                startActivity(intent);
            }
        });

//         Thêm sự kiện click vào nút "CANCEL" để hủy chỉnh sửa thông tin nhà xuất bản
//        Button cancelButton = findViewById(R.id.buttonCancel);
//        cancelButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                addAuthor();
//            }
//        });

        // Thêm sự kiện click vào nút "DELETE" để xóa tác giả
        ImageView deleteButton = findViewById(R.id.DeleteAu);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                deleteAuthor();
            }
        });

        //bấm search tìm ds NXB
        EditText editText = findViewById(R.id.SearchAu);
        editText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AuthorListActivity.this,AuthorModel.class);
                startActivity(intent);
                showAuthorList();
            }
        });

    }

    private void displayAuthorInfo(String AuthorInfo) {
        // Chuyển thông tin tác giả từ chuỗi thành các trường EditText
        String[] parts = AuthorInfo.split(", ");
        EditTextAuthorName.setText(parts[0]);
        editTextAuthorPhone.setText(parts[1]);
        editTextAuthorMail.setText(parts[2]);

    }

    private void addAuthor() {
        String name = EditTextAuthorName.getText().toString();
        String phone = editTextAuthorPhone.getText().toString();
        String mail = editTextAuthorMail.getText().toString();


        if (!name.isEmpty() && !phone.isEmpty() && !mail.isEmpty()) {
            String newAuthor = name + ", " + phone + ", " + mail;
            ListAuthor.add(newAuthor);
            AuthorAdapter.notifyDataSetChanged();
            clearAuthorInfo();
            Toast.makeText(this, "Author added successfully", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
        }
    }

    private void editAuthor() {
        if (selectedAuthorPosition != -1) {
            String name = EditTextAuthorName.getText().toString();
            String phone = editTextAuthorPhone.getText().toString();
            String mail = editTextAuthorMail.getText().toString();


            if (!name.isEmpty() && !phone.isEmpty() && !mail.isEmpty()) {
                String updatedAuthor = name + ", " + phone + ", " + mail;
                ListAuthor.set(selectedAuthorPosition, updatedAuthor);
                AuthorAdapter.notifyDataSetChanged();
                clearAuthorInfo();
                selectedAuthorPosition = -1;
                Toast.makeText(this, "Publisher updated successfully", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(this, "Please select a publisher to edit", Toast.LENGTH_SHORT).show();
        }
    }

    private void deleteAuthor() {
        if (selectedAuthorPosition != -1) {
            ListAuthor.remove(selectedAuthorPosition);
            AuthorAdapter.notifyDataSetChanged();
            clearAuthorInfo();
            selectedAuthorPosition = -1;
            Toast.makeText(this, "Author deleted successfully", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Please select a Author to delete", Toast.LENGTH_SHORT).show();
        }
    }

    private void clearAuthorInfo() {
        EditTextAuthorName.getText().clear();
        editTextAuthorPhone.getText().clear();
        editTextAuthorMail.getText().clear();

    }

    private void showAuthorList() {
        // Xử lý để hiển thị danh sách nhà xuất bản
        // Ở đây, bạn có thể gán dữ liệu từ danh sách nhà xuất bản của bạn vào adapter và cập nhật ListView.
        // Ví dụ:
        ListAuthor.clear(); // Xóa dữ liệu cũ trong danh sách
        ListAuthor.add("Publisher 1"); // Thêm dữ liệu mới vào danh sách
        ListAuthor.add("Publisher 2");
        // Thêm dữ liệu cho tất cả các nhà xuất bản khác (từ dữ liệu của bạn)
        AuthorAdapter.notifyDataSetChanged(); // Cập nhật adapter để hiển thị dữ liệu mới
    }

}
