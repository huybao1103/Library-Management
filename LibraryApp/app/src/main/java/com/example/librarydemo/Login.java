package com.example.librarydemo;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.DBLog.Log;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLBook;
import com.example.librarydemo.Database.SQLLog;
import com.example.librarydemo.Database.SQLSever;

import java.util.ArrayList;

public class Login extends Activity {

    public static final String EXTRA_USER = "com.example.application.example.EXTRA_USER";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_login);

        final EditText password = (EditText) findViewById(R.id.pass);
        final EditText username = (EditText) findViewById(R.id.username);
        final Button login = (Button) findViewById(R.id.login);
        final Button signup = (Button) findViewById(R.id.SignUp);
        final Button quenmk = (Button) findViewById(R.id.quenmk);
        final ImageView libraryicon= (ImageView) findViewById(R.id.iconlibrary);

        libraryicon.setImageResource(R.drawable.icons8_library);

        final SQLSever sqlSever = new SQLSever(this);
        ArrayList<User> list = new ArrayList<>();
        //----------Tài Khoản Gốc-------------------
       User s = new User("thelam123", "Trương thế lâm", "LamTruong140799@gmail.com", "123456", "Nhân Viên", 3);
       sqlSever.AddUser(s);
        //-----------Add Sách ------------
        ArrayBook();
        //-----------Add Log ------------
        SQLLog sqlLog = new SQLLog(this);
        Log log= new Log("thelam123", 5, "Sức Mạnh Của Ngôn Từ", "20191111");
        sqlLog.AddLog(log);
        //---------------------------------------------------------------------------
        password.setInputType(InputType.TYPE_CLASS_TEXT |//ẩn Text để làm mật khẩu
                InputType.TYPE_TEXT_VARIATION_PASSWORD);
        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenSignUp();
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = username.getText().toString();
                String pass = password.getText().toString();
                if(name.equals("") || pass.equals("")){
                    Toast.makeText( Login.this, "Vui Lòng Điền Đủ Thông tin!!!", Toast.LENGTH_SHORT).show();
                }else{
                    User s = sqlSever.getUser(name);
                    if(s != null){
                        if(s.getPassword().equals(pass)){
                            Toast.makeText( Login.this, "Đăng nhập thành công ^.^", Toast.LENGTH_SHORT).show();
                            password.setText("");
                            username.setText("");
                            Login(s);
                        }else {
                            password.setText("");
                            username.setText("");
                            Toast.makeText( Login.this, "Tài khoản hoặc mật khẩu không chính xác!!!", Toast.LENGTH_SHORT).show();
                        }
                    }else{
                        password.setText("");
                        username.setText("");
                        Toast.makeText( Login.this, "Tài khoản Không Tồn tại!!!", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });
        quenmk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenForgotPassword();
            }
        });
        ArrayBook();
    }
    public void ArrayBook(){
        SQLBook sqlBook = new SQLBook(this);
        ArrayList<Book> book = new ArrayList<>();
        book.add(new Book(1, "Để Con Được Ốm", "Sách Tự Lực", "Uyên Bùi - BS. Trí Đoàn","2016",R.drawable.book_1, 100));
        book.add(new Book(2, "Đọc Vị Bất Kỳ Ai", "Sách Tự Lực", "TS. David J. Lieberman","2015",R.drawable.book_2, 100));
        book.add(new Book(3, "Nghệ Thuật Bán Hàng Bậc Cao", "Nghề Bán Hàng", "Zig Zig Lar","2008",R.drawable.book_3, 100));
        book.add(new Book(4, "Dấn Thân", "Tiểu Sử", "Sheryl Sandberg","2014",R.drawable.book_4, 100));
        book.add(new Book(5, "Sức Mạnh Của Ngôn Từ", "Văn học", "Vô Danh","TB-2018",R.drawable.book_5, 100));
        book.add(new Book(6, "Đắc Nhân Tâm", "Phi Hư Cấu", "Dale Carnegie","2013",R.drawable.book_6, 100));
        book.add(new Book(7, "Nhà Giả Kim", "Tiểu Thuyết", "Paulo Coelho","2013",R.drawable.book_7, 100));
        for(Book x: book){
            sqlBook.AddBook(x);
        }
    }

    public void OpenSignUp(){
        Intent intent = new Intent( Login.this, SignUp.class);
        startActivity(intent);
    }

    public void Login(User s){
        Intent intent = new Intent( Login.this, LayOutAndLisView.class);
        intent.putExtra(EXTRA_USER, s.getAccount());
        startActivity(intent);
        finish();
    }

    public void OpenForgotPassword(){
        Intent intent = new Intent( Login.this, ForgotPassword.class);
        startActivity(intent);
    }


}
