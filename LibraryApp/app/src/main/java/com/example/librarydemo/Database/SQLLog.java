package com.example.librarydemo.Database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

import com.example.librarydemo.DBLog.Log;

import java.util.ArrayList;

public class SQLLog extends SQLiteOpenHelper {
    private static final String DatabaseName = "librarylog";
    private static final String Table_Name2 = "logs";
    private static final String LogID_log = "logid";
    private static final String Account_log = "account";
    private static final String BookID_log = "bookid";
    private static final String BookTitle_log = "booktitle";
    private static final String NgayDK_log = "Ngaydk";

    private static int version = 1;

    private SQLiteDatabase db;
    private Context context;
    private ContentValues values;
    public SQLLog(Context context) {
        super(context, DatabaseName, null, version);
        this.context = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String Create_Table_log = " CREATE TABLE " + Table_Name2 + " ( " +
                LogID_log + " integer primary key, " +
                Account_log + " TEXT, " +
                BookID_log + " integer, " +
                BookTitle_log + " TEXT, " +
                NgayDK_log + " TEXT)";
        db.execSQL(Create_Table_log);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS "+ Table_Name2);
        onCreate(db);
    }
    //----------------------------------------------------------------------------------------------------------------
    public void AddLog(Log log) {
        db = this.getWritableDatabase();
        values = new ContentValues();
        values.put(Account_log, log.getAccount());
        values.put(BookID_log, log.getBookID());
        values.put(BookTitle_log, log.getBookTitle());
        values.put(NgayDK_log,log.getNgayDK());
        db.insert(Table_Name2, null, values);
        db.close();
    }

    //------------xem nhật ký đăng ký mượn sách---------------------
    public ArrayList<Log> getAllLogs(){
        ArrayList<Log> list = new ArrayList<>();
        String selectLog = "select * from " + Table_Name2;
        db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(selectLog, null);
        if(cursor.moveToFirst()){
            do{
                list.add(new Log(cursor.getInt(0),cursor.getString(1),cursor.getInt(2),cursor.getString(3),cursor.getString(4)));
            }while (cursor.moveToNext());
        }else{
            list = null;
        }
        cursor.close();
        db.close();
        return list;
    }
    //------------Xóa nhật ký đăng ký mượn sách---------------------
    public void DeleteLog(Log log) {
        db = this.getWritableDatabase();
        db.delete(Table_Name2, LogID_log + " = ?",
                new String[] { String.valueOf(log.getLogID()) });
        db.close();
    }
}
