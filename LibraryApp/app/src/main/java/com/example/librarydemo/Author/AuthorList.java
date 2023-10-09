package com.example.librarydemo.Author;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.R;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class AuthorList extends AppCompatActivity {

    RecyclerView recyclerView;
    FloatingActionButton add_button;

    AuthorDatabaseHelper myDB;
    ArrayList<String> author_id, author_name, author_mail, author_phone;
    AuthorAdapter authorAdapter;
    ImageView empty_imageview;
    TextView no_data_txt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_author_list);

        recyclerView = findViewById(R.id.recycleView);
        add_button = findViewById(R.id.add_button);
        empty_imageview = findViewById(R.id.empty_imageview);
        no_data_txt = findViewById(R.id.no_data_txt);

        add_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(AuthorList.this, AddAuthor.class);
                startActivity(intent);
            }
        });

        myDB = new AuthorDatabaseHelper(AuthorList.this);
        author_id = new ArrayList<>();
        author_name = new ArrayList<>();
        author_mail = new ArrayList<>();
        author_phone = new ArrayList<>();

        storeDataInArrays();

        authorAdapter = new AuthorAdapter(AuthorList.this, this, author_id, author_name, author_mail, author_phone);
        recyclerView.setAdapter(authorAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(AuthorList.this));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1){
            recreate();
        }
    }

    void storeDataInArrays(){
        Cursor cursor = myDB.readAllData();
        if (cursor.getCount() == 0){
            empty_imageview.setVisibility(View.VISIBLE);
            no_data_txt.setVisibility(View.VISIBLE);
        }else {
            while (cursor.moveToNext()){
                author_id.add(cursor.getString(0));
                author_name.add(cursor.getString(1));
                author_mail.add(cursor.getString(2));
                author_phone.add(cursor.getString(3));
            }
            empty_imageview.setVisibility(View.GONE);
            no_data_txt.setVisibility(View.GONE);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(@NonNull Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.my_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == R.id.delete_all){
            confirmDialog();
        }
        return super.onOptionsItemSelected(item);
    }

    void confirmDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Delete All ?");
        builder.setMessage("Are you sure you want to delete all Data ?");
        builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                AuthorDatabaseHelper myDB = new AuthorDatabaseHelper(AuthorList.this);
                myDB.deleteAllData();
                //Refresh Activity
                Intent intent = new Intent(AuthorList.this, AuthorList.class);
                startActivity(intent);
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