package com.example.librarydemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.librarydemo.Database.SQLSever;

public class NewPassword extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_new_password);

        final EditText pass1 = (EditText) findViewById(R.id.newpass1);
        final EditText pass2 = (EditText) findViewById(R.id.newpass2);
        Button xacnhan = (Button) findViewById(R.id.bt_newpass);
        final SQLSever sqlUser = new SQLSever(this);
        xacnhan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String password1 = pass1.getText().toString();
                String password2 = pass2.getText().toString();
                if(password1.equals(password2)){
                    String Account = ForgotPassword.getAccount();
                    boolean KetQua = sqlUser.Changpass(Account, password1);
                    if (KetQua == true){
                        pass1.setText("");
                        pass2.setText("");
                        Toast.makeText(NewPassword.this, "Đổi Mật Khẩu thành công ^.^", Toast.LENGTH_SHORT).show();
                        OpenNewPass();
                    }else{
                        pass1.setText("");
                        pass2.setText("");
                        Toast.makeText(NewPassword.this, "Đổi Mật Khẩu thất bại!!!", Toast.LENGTH_SHORT).show();
                    }

                }else{
                    pass1.setText("");
                    pass2.setText("");
                    Toast.makeText(NewPassword.this, "Lỗi mật khẩu không giống trùng khớp", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
    public void OpenNewPass(){
        Intent intent = new Intent(NewPassword.this, Login.class);
        startActivity(intent);
        finish();
    }
}
