package com.example.librarydemo;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.librarydemo.DBLog.Log;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLSever;
import com.example.librarydemo.R;

public class ChangPass extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_chang_pass);
         final EditText oldpass = (EditText) findViewById(R.id.old_pass);
         final EditText newpass1 = (EditText) findViewById(R.id.new_pass1);
         final EditText newpass2 = (EditText) findViewById(R.id.new_pass2);
        Button bt_changpass = (Button) findViewById(R.id.bt_ChangPassword);

        final SQLSever sqlUser = new SQLSever(this);
        bt_changpass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String OldPass =oldpass.getText().toString();
                final String NewPass1 =newpass1.getText().toString();
                final String NewPass2 =newpass2.getText().toString();
               if(OldPass.equals("") || NewPass1.equals("") || NewPass2.equals("")){
                   Toast.makeText(ChangPass.this, "Vui lòng điền đầy đủ thông tin!!!", Toast.LENGTH_SHORT).show();
               }else{
                   AlertDialog.Builder b=new AlertDialog.Builder(ChangPass.this);
                   b.setTitle("Đổi Mật Khẩu");
                   b.setMessage("Bạn có muốn đổi mật khẩu?");
                   b.setIcon(R.drawable.icons8_out);
                   b.setPositiveButton("Yes", new DialogInterface. OnClickListener() {
                       @Override
                       public void onClick(DialogInterface dialog, int which)
                       {
                           if(NewPass1.equals(NewPass2)){
                               User s = LayOutAndLisView.getUser();
                               if(s.getPassword().equals(OldPass)){
                                   boolean KetQua = sqlUser.Changpass(s.getAccount(), NewPass1);
                                   if (KetQua == true){
                                       newpass2.setText("");
                                       newpass1.setText("");
                                       oldpass.setText("");
                                       Toast.makeText(ChangPass.this, "Đổi Mật Khẩu thành công ^.^", Toast.LENGTH_SHORT).show();
                                   }else{
                                       newpass2.setText("");
                                       newpass1.setText("");
                                       oldpass.setText("");
                                       Toast.makeText(ChangPass.this, "Đổi Mật Khẩu thất bại!!!", Toast.LENGTH_SHORT).show();
                                   }
                               }else{
                                   Toast.makeText(ChangPass.this, "Password cũ không trùng khớp !!!", Toast.LENGTH_SHORT).show();
                                   newpass2.setText("");
                                   newpass1.setText("");
                                   oldpass.setText("");
                               }
                           }else{
                               Toast.makeText(ChangPass.this, "New Password và Renew Password không giống nhau !!!", Toast.LENGTH_SHORT).show();
                               newpass2.setText("");
                               newpass1.setText("");
                               oldpass.setText("");
                           }
                       }});
                   b.setNegativeButton("No", new DialogInterface.OnClickListener() {
                       @Override
                       public void onClick(DialogInterface dialog, int which)
                       {
                           dialog.cancel();
                       }
                   });
                   b.create().show();

               }
            }
        });


    }
}



