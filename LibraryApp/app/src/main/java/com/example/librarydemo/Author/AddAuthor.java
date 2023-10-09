package com.example.librarydemo.Author;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.librarydemo.R;

public class AddAuthor extends AppCompatActivity {

    EditText name_input, mail_input, phone_input;
    Button add_button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_author);

        name_input = findViewById(R.id.name_input);
        mail_input = findViewById(R.id.mail_input);
        phone_input = findViewById(R.id.phone_input);
        add_button = findViewById(R.id.add_button);

        add_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AuthorDatabaseHelper myDB = new AuthorDatabaseHelper(AddAuthor.this);
                myDB.addAuthor(name_input.getText().toString().trim(),
                        mail_input.getText().toString().trim(),
                        Integer.valueOf(phone_input.getText().toString().trim()));
            }
        });
    }
}