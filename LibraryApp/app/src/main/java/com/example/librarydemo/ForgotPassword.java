package com.example.librarydemo;

import android.app.Activity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLSever;

import java.util.ArrayList;
import java.util.Random;

public class ForgotPassword extends Activity {
    public static final String EXTRA_CODE = "com.example.application.example.EXTRA_CODE";
    public static String getAccount() {
        return Account;
    }
    private NotificationCompat.Builder mBuilder;
    public static void setAccount(String account) {
        Account = account;
    }
    public static String Account;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_forgot_password);
        final EditText email = (EditText) findViewById(R.id.Et_emailqmk);
        final EditText account = (EditText) findViewById(R.id.Et_accountqmk);
        final Button bt_qmk = (Button) findViewById(R.id.bt_qmkc);
        final Button bt_backqmk = (Button) findViewById(R.id.bt_backqmk);
        final SQLSever sqlUser = new SQLSever(this);
        bt_qmk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String Email = email.getText().toString();
                String Account = account.getText().toString();
                if(Email.equals("") || Account.equals("")){
                    Toast.makeText(ForgotPassword.this, "Vui Lòng Điền Đủ Thông tin!!!", Toast.LENGTH_SHORT).show();
                }else{
                    ArrayList<User> users = sqlUser.getArrayUser();
                    boolean ketqua = false;
                    for(User x : users){
                        if(x.getAccount().equals(Account) && x.getGmail().equals(Email)){
                            ketqua=true;
                        }
                    }
                    if(ketqua == true){
                        ForgotPassword.setAccount(Account);
                        String code = "LT";
                        Random rd = new Random();
                        for(int i=1 ; i<=2 ; i++){
                            int a = (int) (65 + Math.random() * 26);
                            int b = rd.nextInt(4);
                            code = code + String.valueOf(b) + (char) a ;
                        }
                        ThongBao(Account, code);
                        OpenCodeForgotPassword(code);
                    }else{
                        Toast.makeText(ForgotPassword.this, "Email hoặc Account không chính xác!!!", Toast.LENGTH_SHORT).show();
                    }
                }
//
          }
        });

        bt_backqmk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenLogin();
            }
        });


    }
public void ThongBao(String tieude, String noidung){
    mBuilder = new NotificationCompat.Builder(this)
                    .setSmallIcon(R.drawable.gmail_logo)
                    .setContentTitle("Account: "+tieude)
                    .setContentText("Code: "+noidung);
    Intent resultIntent = new Intent(this, NewPassword.class);
    TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
    stackBuilder.addParentStack(ForgotPassword.class);
    stackBuilder.addNextIntent(resultIntent);
    PendingIntent resultPendingIntent =
            stackBuilder.getPendingIntent(
                    0,
                    PendingIntent.FLAG_UPDATE_CURRENT
            );
    mBuilder.setContentIntent(resultPendingIntent);
    NotificationManager mNotificationManager =
            (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    mBuilder.setAutoCancel(true);
    mNotificationManager.notify(1, mBuilder.build());
}



public void onButtonClickSend(String email, String s, String s1){
    String emailTo 		= email;
    String emailSubject 	= s;
    String emailContent 	= s1;
    Toast.makeText(ForgotPassword.this, emailTo+ "||" + emailSubject + "||"+emailContent, Toast.LENGTH_SHORT).show();
    Intent emailIntent = new Intent(Intent.ACTION_SEND);
    emailIntent.setData(Uri.parse("mailto:"));
    emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[]{emailTo});
    emailIntent.putExtra(Intent.EXTRA_SUBJECT, emailSubject);
    emailIntent.putExtra(Intent.EXTRA_TEXT, emailContent);
    emailIntent.setType("message/rfc822");
    startActivity(Intent.createChooser(emailIntent, "Email"));

}

    public void OpenLogin(){
        Intent intent = new Intent(ForgotPassword.this, Login.class);
        startActivity(intent);
    }
    public void OpenCodeForgotPassword(String code){
        Intent intent = new Intent(ForgotPassword.this, CodeForgotPassword.class);
        intent.putExtra(EXTRA_CODE, code);
        startActivity(intent);
        finish();
    }
}
