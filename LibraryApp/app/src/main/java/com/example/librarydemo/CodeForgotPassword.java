package com.example.librarydemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class CodeForgotPassword extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_code_forgot_password);

        final EditText nhapcode = (EditText) findViewById(R.id.Et_code);
        Button xacnhan = (Button) findViewById(R.id.bt_code);
        Button back = (Button) findViewById(R.id.bt_codebackqmk);

        final Intent intent = getIntent();
        final String code = intent.getStringExtra(ForgotPassword.EXTRA_CODE);

        xacnhan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String codeVip = nhapcode.getText().toString();
                if(codeVip.equals(code)){
                    Toast.makeText(CodeForgotPassword.this, "Nhập Mã Thành công", Toast.LENGTH_SHORT).show();
                    OpenNewPass();
                }else{
                    nhapcode.setText("");
                    Toast.makeText(CodeForgotPassword.this, "Mã Bạn Nhập Chưa Đúng", Toast.LENGTH_SHORT).show();
                }

            }
        });
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenForgot();
            }
        });
    }
    public void OpenNewPass(){
        Intent intent = new Intent(CodeForgotPassword.this, NewPassword.class);
        startActivity(intent);
        finish();
    }
    public void OpenForgot(){
        Intent intent = new Intent(CodeForgotPassword.this, ForgotPassword.class);
        startActivity(intent);
    }
}
