package com.example.librarydemo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBLog.Log;
import com.example.librarydemo.Database.SQLBook;

import java.util.ArrayList;

public class LogInformation extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_information);

        final ImageView img = (ImageView) findViewById(R.id.imageView);
        final TextView booktitle = (TextView) findViewById(R.id.Log_booktitle);
        final TextView booktitle2 = (TextView) findViewById(R.id.Log_booktitle2);
        final TextView logid = (TextView) findViewById(R.id.Log_logid);
        final TextView bookid = (TextView) findViewById(R.id.Log_bookid);
        final TextView ngaydk = (TextView) findViewById(R.id.Log_ngaydk);
        final TextView mota = (TextView) findViewById(R.id.Log_ghichu);
        SQLBook sqlBook = new SQLBook(this);
        Log log = ArrayLog.getLogs();
        ArrayList<Book> books = sqlBook.getAllBook();
        Book book = new Book();
        for (Book x : books){
            if(x.getBookID() == log.getBookID()){
                book = x;
            }
        }

        img.setImageResource(book.getImgBook());
        booktitle.setText(log.getBookTitle());
        booktitle2.setText(log.getBookTitle());
        logid.setText(String.valueOf(log.getLogID()));
        bookid.setText(String.valueOf(log.getBookID()));
        String ngay = log.getNgayDK().substring(6,8);
        String thang = log.getNgayDK().substring(4,6);
        String nam = log.getNgayDK().substring(0,4);
        ngaydk.setText(ngay + "-" + thang + "-" + nam);
        mota.setText("Tác giả là \"" + book.getTacGia() + "\"\n và thuộc thể loại \"" + book.getTheLoai()+"\"");
    }
}
