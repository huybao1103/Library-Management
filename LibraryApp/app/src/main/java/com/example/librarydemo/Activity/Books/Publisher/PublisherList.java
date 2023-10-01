package com.example.librarydemo.Activity.Books.Publisher;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ListView;
import android.widget.SearchView;
import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.R;

public class PublisherList extends Activity {

    private SearchView searchView;
    private Button addButton;
    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_publisher_list);
        searchView = findViewById(R.id.searchView);
        addButton = findViewById(R.id.btnaddpublisher);

    }
}
