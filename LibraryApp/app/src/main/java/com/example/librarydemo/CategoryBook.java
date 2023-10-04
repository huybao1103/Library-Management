package com.example.librarydemo;
import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ListView;

import androidx.appcompat.widget.SearchView;

public class CategoryBook extends Activity {
    private SearchView searchView;
    private Button addButton;
    private ListView listView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_category_book);
        searchView = findViewById(R.id.searchView);
        addButton = findViewById(R.id.btnaddcategory);

    }
}
