package com.example.librarydemo;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLBook;
import com.example.librarydemo.Database.SQLSever;

import java.util.ArrayList;

public class LayOutAndLisView extends AppCompatActivity

        implements NavigationView.OnNavigationItemSelectedListener {

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
        ArrayBook();
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

    public void ArrayBook(){
        SQLBook sqlBook = new SQLBook(this);
        ArrayList<Book> book = sqlBook.getAllBook();
        adapter = new BookAdapter(this, R.layout.elemen_book, book);
        lv.setAdapter(adapter);
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                LayOutAndLisView.setBookid(position+1);
                OpenThongTinSach();
            }
        });
    }