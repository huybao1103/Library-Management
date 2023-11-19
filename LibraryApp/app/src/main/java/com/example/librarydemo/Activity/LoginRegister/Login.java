package com.example.librarydemo.Activity.LoginRegister;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;

import com.example.librarydemo.Activity.LayOutAndLisView;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLSever;
import com.example.librarydemo.ForgotPassword;
import com.example.librarydemo.Models.Account.AccountModel;
import com.example.librarydemo.Models.LoginRegister.LoginModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends Activity {
    ApiService apiService;
    AccountModel currentAccount;
    SharedPreferences lastUser, currentUser;
    SharedPreferences.Editor editorLastUser, editorCurrentUser;

    public static final String EXTRA_USER = "com.example.application.example.EXTRA_USER";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_login);

        apiService = RetrofitClient.getApiService(Login.this);

        final TextInputEditText password = (TextInputEditText) findViewById(R.id.pass);
        final TextInputEditText email = (TextInputEditText) findViewById(R.id.email);
        final TextView error = findViewById(R.id.error);
        final Button login = (Button) findViewById(R.id.login);
        final Button signup = (Button) findViewById(R.id.SignUp);
        final Button quenmk = (Button) findViewById(R.id.quenmk);
        final SQLSever sqlSever = new SQLSever(this);
        ArrayList<User> list = new ArrayList<>();

        //----------Tài Khoản Gốc-------------------
       User s = new User("thelam123", "Trương thế lâm", "LamTruong140799@gmail.com", "123456", "Nhân Viên", 3);
       sqlSever.AddUser(s);

        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenSignUp();
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                 Login(s);

               String mail = email.getText().toString();
               String pass = password.getText().toString();
               if(mail.equals("") || pass.equals("")) {
                   error.setText("Email and Password are require!!!");
               }
               else {
                   LoginModel loginModel = new LoginModel(pass, mail);
                   JsonObject data = new ApiRequest().convertModelToJSONObject(loginModel);

                   apiService.Login(data).enqueue(new Callback<JsonObject>() {
                       @Override
                       public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            currentAccount = new ApiResponse<AccountModel>().getResultFromResponse
                            (
                                response,
                                new TypeToken<AccountModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                            );
                           if(currentAccount != null){
                               LogIn(currentAccount);
                           }
                       }

                       @Override
                       public void onFailure(Call<JsonObject> call, Throwable t) {
                           error.setText("Incorrect email or password!!!");
                       }
                   });
               }
            }
        });
        quenmk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenForgotPassword();
            }
        });
    }

    public void OpenSignUp(){
        Intent intent = new Intent( Login.this, SignUp.class);
        startActivity(intent);
    }

    public void LogIn(AccountModel accountModel) {
        currentUser = getApplicationContext().getSharedPreferences(accountModel.getId(), MODE_PRIVATE);
        editorCurrentUser = currentUser.edit();
        editorCurrentUser.putString("userID", accountModel.getId());
        editorCurrentUser.putString("userMail", accountModel.getEmail());
        editorCurrentUser.putString("userRoleId", accountModel.getRoleId());
        editorCurrentUser.putString("userRoleName", accountModel.getRole().getName());
        editorCurrentUser.putBoolean("autoLogin", false);
        editorCurrentUser.apply();

        if(accountModel.getRole().getName().equals("Reader")) {

        }


        Intent intent = new Intent( Login.this, LayOutAndLisView.class);
        intent.putExtra(EXTRA_USER, accountModel);
        startActivity(intent);
        finish();
    }

    public void OpenForgotPassword(){
        Intent intent = new Intent( Login.this, ForgotPassword.class);
        startActivity(intent);
    }

    public void ReaderLogin(AccountModel accountModel) {
        Acc
    }
}
