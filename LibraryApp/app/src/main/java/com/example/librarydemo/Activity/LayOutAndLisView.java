package com.example.librarydemo.Activity;

import android.content.Intent;
import android.os.Bundle;

import com.example.librarydemo.Activity.Fragments.AuthorFragment.AuthorFragment;
import com.example.librarydemo.Activity.Fragments.BookFragment.BookDetail;
import com.example.librarydemo.Activity.Fragments.BookFragment.BookFragment;
import com.example.librarydemo.Activity.Fragments.CategoriesFragment.CategoriesFragment;
import com.example.librarydemo.Activity.Fragments.LibraryCardFragment.LibraryCardFragment;
import com.example.librarydemo.Activity.Fragments.PublisherFragment.PublisherFragment;
import com.example.librarydemo.ArrayLog;
import com.example.librarydemo.Author.AuthorListActivity;
import com.example.librarydemo.Login;
import com.example.librarydemo.Models.Book.BookModel;

import com.example.librarydemo.Publisher.PublisherInformation;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.RetrofitClient;
import com.example.librarydemo.UpdateBook;
import com.google.android.material.navigation.NavigationView;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ListView;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.DBUser.User;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LayOutAndLisView extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private ListView lv;

    public static ArrayList<Book> Book_Deefault;

    public static ArrayList<Book> getBook_Deefault() {
        return Book_Deefault;
    }

    public static void setBook_Deefault(ArrayList<Book> book_Deefault) {
        Book_Deefault = book_Deefault;
    }
    private BookAdapter adapter;
    //---------------User hiện tại------------------------------------
    public static User user_pro;

    public static User getUser() {
        return user_pro;
    }
    public void setUser(User user) {
        this.user_pro = user;
    }

    //--------------Lấy Sách Đưa vào Book information---------------
    public static int Bookid;
    public static int getBookid() {
        return Bookid;
    }
    public static void setBookid(int bookid) {
        Bookid = bookid;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lay_out_and_lis_view);

        AnhXa();
//        getCard();
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
//        getCard();
    }

    /**
     * Mở file <> ApiService.java </> để biết cách gọi API
     *
     * Mở file <> ControllerConst.java </> để biết có constant của controller nào
     */
    public void ArrayBook(){

        ApiService apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */

        apiService.getAll(ControllerConst.BOOKS /* Tên controller */).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                List<BookModel> bookModels = new ApiResponse<List<BookModel>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                        (
                                response,
                                new TypeToken<List<BookModel>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                        );

                if(bookModels != null) {
                    adapter = new BookAdapter(getApplicationContext(), R.layout.elemen_book, bookModels);
                    lv.setAdapter(adapter);
                    lv.setOnItemClickListener((parent, view, position, id) -> {
                        BookModel bookModel = (BookModel) parent.getItemAtPosition(position);

                        OpenThongTinSach(bookModel.getId());
                    });
                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    public void OpenThongTinSach(String bookId){
        Intent intent = new Intent(this, BookDetail.class);
        intent.putExtra("bookId", bookId);
        startActivity(intent);
    }
    public void AnhXa(){
        lv= (ListView) findViewById(R.id.arraybook);
    }
    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.lay_out_and_lis_view, menu);
//        TextView ten = (TextView) findViewById(R.id.Text_Name);
//        TextView email = (TextView) findViewById(R.id.Text_Gmail);
//        TextView trangthai = (TextView) findViewById(R.id.Text_TrangThai);

//        Intent intent = getIntent();
//        final String tt_acc = intent.getStringExtra(Login.EXTRA_USER);
//        final SQLSever sqlSever = new SQLSever(this);
//        User s = sqlSever.getUser(tt_acc);

//        ten.setText(s.getFullname());
//        email.setText(s.getGmail());
//        trangthai.setText(s.getStatus());
//        this.setUser(s);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.nav_tacgia) {
            Intent intent = new Intent(this, AuthorListActivity.class);
            startActivity(intent);
        }

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_Search) {
            return true;
        }
        if (id == R.id.action_Log) {
            Intent intent = new Intent(this, ArrayLog.class);
            startActivity(intent);
            return true;
        }
        if (id == R.id.action_UpdateBook) {
            Intent intent = new Intent(this, UpdateBook.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();

        switch (id)
        {
            case R.id.nav_book:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, new BookFragment()).commit();
                break;
            case R.id.nav_tacgia:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, new AuthorFragment()).commit();
                break;
            case R.id.nav_QLNXB:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, new PublisherFragment()).commit();
                break;
            case R.id.nav_category:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, new CategoriesFragment()).commit();
                break;
            case R.id.nav_library_card:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, new LibraryCardFragment()).commit();
                break;
        }

            return true;
        }


    public void OpenLogin(){
        Intent intent = new Intent(this, Login.class);
        startActivity(intent);
    }

    public void bookDetail(View view) {
        startActivity(new Intent(getApplicationContext(), BookDetail.class));
    }
}
