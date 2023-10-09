package com.example.librarydemo.Author;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.librarydemo.R;

public class UpdateAuthor extends AppCompatActivity {

    EditText name_input, mail_input, phone_input;
    Button update_button, delete_button;

    String id, name, mail, phone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_author);

        name_input = findViewById(R.id.name_input2);
        mail_input = findViewById(R.id.mail_input2);
        phone_input = findViewById(R.id.phone_input2);
        update_button = findViewById(R.id.update_button);
        delete_button = findViewById(R.id.delete_button);

        //First we call this
        getAndSetIntentData();

        //Set actionbar title after getAndSetIntentData method
        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setTitle(name);
        }

        update_button.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                //And only then we call this
                AuthorDatabaseHelper myDB = new AuthorDatabaseHelper(UpdateAuthor.this);
                name = name_input.getText().toString().trim();
                mail = mail_input.getText().toString().trim();
                phone = phone_input.getText().toString().trim();
                myDB.updateData(id, name, mail, phone);
            }
        });

        delete_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                confirmDialog();
            }
        });
    }

    void getAndSetIntentData(){
        if (getIntent().hasExtra("id") && getIntent().hasExtra("name") &&
                getIntent().hasExtra("mail") && getIntent().hasExtra("phone")){
            //Getting Data from Intent
            id = getIntent().getStringExtra("id");
            name = getIntent().getStringExtra("name");
            mail = getIntent().getStringExtra("mail");
            phone = getIntent().getStringExtra("phone");

            //Setting Intent Data
            name_input.setText(name);
            mail_input.setText(mail);
            phone_input.setText(phone);

        }else {
            Toast.makeText(this, "No data.", Toast.LENGTH_SHORT).show();
        }
    }

    void confirmDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Delete " + name + " ?");
        builder.setMessage("Are you sure you want to delete " + name + " ?");
        builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                AuthorDatabaseHelper myDB = new AuthorDatabaseHelper(UpdateAuthor.this);
                myDB.deleteOneRow(id);
                finish();
            }
        });
        builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

            }
        });
        builder.create().show();
    }
}