package com.example.librarydemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;

public class MainActivity extends Activity {

    private static int SPLASH_TIME_OUT= 3250;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_main);

        TextView wellcomlibrary = (TextView) findViewById(R.id.Et_title);
        ImageView iconlibrary = (ImageView) findViewById(R.id.icon_library);
        ImageView Loading_library = findViewById(R.id.loading_library);
        Glide.with(this).load(R.drawable.giphy1).into(Loading_library);
       // Loading_library.setImageResource();
        iconlibrary.setImageResource(R.drawable.splash1);
        wellcomlibrary.setText("\"Welcome to the library management application\"");
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                OpenMainActivity();
                finish();
            }
        }, SPLASH_TIME_OUT);
    }
    public void OpenMainActivity(){
        Intent intent = new Intent(MainActivity.this, Login.class);
        startActivity(intent);
    }

}
