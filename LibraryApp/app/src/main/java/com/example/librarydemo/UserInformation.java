package com.example.librarydemo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.librarydemo.DBUser.User;

public class UserInformation extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_information);

        final TextView infor_acccount = (TextView) findViewById(R.id.info_account1);
        final TextView infor_fullname = (TextView) findViewById(R.id.info_fullname);
        final TextView infor_email = (TextView) findViewById(R.id.info_email);
        final TextView infor_status = (TextView) findViewById(R.id.info_status);
        final TextView infor_quyen = (TextView) findViewById(R.id.info_quyen);
        ImageView anh = (ImageView) findViewById(R.id.image_Avatar);
        anh.setImageResource(R.drawable.user_icon);
        User s = LayOutAndLisView.getUser();
        infor_acccount.setText(s.getAccount());
        infor_fullname.setText(s.getFullname());
        infor_email.setText(s.getGmail());
        infor_status.setText(s.getStatus());
        infor_quyen.setText(String.valueOf(s.getQuyen()));

    }
}
