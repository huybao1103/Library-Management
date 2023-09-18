package com.example.librarydemo;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBLog.Log;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLBook;
import com.example.librarydemo.Database.SQLLog;
import com.example.librarydemo.Database.SQLSever;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class BookInformation extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_information);

        ImageView tt_imgSach = (ImageView) findViewById(R.id.tt_img_Anh);
        TextView tt_tensach = (TextView) findViewById(R.id.tt_TenSach);
        TextView tt_theloai = (TextView) findViewById(R.id.tt_TheLoai);
        TextView tt_tacgia = (TextView) findViewById(R.id.tt_TacGia);
        TextView tt_namXB = (TextView) findViewById(R.id.tt_NamXB);
        TextView tt_soluong = (TextView) findViewById(R.id.tt_SoLuong);
        Button tt_muon = (Button) findViewById(R.id.tt_btMuon);

        final SQLBook sqlBook = new SQLBook(this);
        final int bookid = LayOutAndLisView.getBookid();
        final Book book = sqlBook.getBook(bookid);

        tt_imgSach.setImageResource(book.getImgBook());
        tt_tensach.setText(book.getTenSach());
        tt_theloai.setText("Thể Loại : " + book.getTheLoai());
        tt_tacgia.setText("Tác Giả : " + book.getTacGia());
        tt_namXB.setText("Năm Xuất Bản: " + book.getNamXB());
        tt_soluong.setText("Số Lượng : " + book.getSoLuong() + " Quyển");

        final SQLLog sqlLog = new SQLLog(this);
        tt_muon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder b=new AlertDialog.Builder(BookInformation.this);
                b.setTitle("Mượn Sách");
                b.setMessage("Bạn có muốn Mượn Sách?");
                b.setIcon(R.drawable.muon_sach_icon);
                b.setPositiveButton("Yes", new DialogInterface. OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        User s = LayOutAndLisView.getUser();
                        Log log = new Log(s.getAccount(),book.getBookID(), book.getTenSach(), getDate());
                        sqlLog.AddLog(log);
                        sqlBook.UpdateSoLuongBook(book.getSoLuong()-1, book.getBookID());
                        Reset();
                        Toast.makeText(BookInformation.this,  "Mượn Sách Thành Công" , Toast.LENGTH_SHORT).show();
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
        });
    }
    //lấy ngày hiện tại
    private String getDate(){
        DateFormat dateFormatter = new SimpleDateFormat("yyyyMMdd");
        dateFormatter.setLenient(false);
        Date today = new Date();
        String getdate = dateFormatter.format(today);
        return getdate;
    }
    public void Reset(){
        Intent intent = new Intent( BookInformation.this, BookInformation.class);
        startActivity(intent);
        finish();
    }

    }
