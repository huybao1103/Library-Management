package com.example.librarydemo;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.DBLog.Log;
import com.example.librarydemo.DBUser.User;
import com.example.librarydemo.Database.SQLBook;
import com.example.librarydemo.Database.SQLLog;

import java.util.ArrayList;

public class ArrayLog extends AppCompatActivity {
    private BookAdapter adapter;
    public static Book book_log;

    public static Log getLogs() {
        return logs;
    }

    public void setLogs(Log logs) {
        this.logs = logs;
    }

    public static Log logs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_array_log);

        ListView lvlog = (ListView) findViewById(R.id.arraylog);

        final SQLLog sqlLog = new SQLLog(this);
        final SQLBook sqlBook = new SQLBook(this);
        User s = LayOutAndLisView.getUser();
        final ArrayList<Log> log = sqlLog.getAllLogs();
        if(log != null){
           ArrayList<Book> booklog = new ArrayList<>();
            for(Log x: log){
                    if(x.getAccount().equals(s.getAccount())){
                        Book getbook= sqlBook.getBook(x.getBookID());
                        booklog.add(getbook);
                    }
            }
            if(booklog != null){
                adapter = new BookAdapter(this, R.layout.elemen_book, booklog);
                lvlog.setAdapter(adapter);
            }else{
                Toast.makeText(ArrayLog.this, "Bạn Chưa Đăng Ký Mượn!!!", Toast.LENGTH_SHORT).show();
            }
        }else{
            Toast.makeText(ArrayLog.this, "Log Rỗng!!!", Toast.LENGTH_SHORT).show();
        }
        lvlog.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, final int position, long id) {
                AlertDialog.Builder b=new AlertDialog.Builder(ArrayLog.this);
                b.setTitle("Delete");
                b.setMessage("Bạn có muốn Xóa Sách \"" + log.get(position).getBookTitle() + "\" ?");
                b.setIcon(R.drawable.icon_delete);
                b.setPositiveButton("Yes", new DialogInterface. OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        sqlLog.DeleteLog(log.get(position));
                        Toast.makeText(ArrayLog.this, "Xóa Thành Công", Toast.LENGTH_SHORT).show();
                        ResetSach();
                        finish();
                    }});
                b.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        dialog.cancel();
                    }
                });
                b.create().show();
                return false;
            }
        });

        lvlog.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                OpenThongTinSach(position, log);
            }
        });

    }

    private void OpenThongTinSach(int position, ArrayList<Log> log) {
        this.setLogs(log.get(position));
        Intent intent = new Intent(ArrayLog.this, LogInformation.class);
        startActivity(intent);
    }
    private void ResetSach(){
        Intent intent = new Intent(ArrayLog.this, ArrayLog.class);
        startActivity(intent);

    }


}
