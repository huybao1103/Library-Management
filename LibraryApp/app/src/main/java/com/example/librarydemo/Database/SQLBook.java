package com.example.librarydemo.Database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.librarydemo.DBBook.Book;

import java.util.ArrayList;

import static android.os.Build.ID;

public class SQLBook extends SQLiteOpenHelper {

    private static final String DatabaseName = "librarybook";
    private static final String Table_Name3 = "books";
    private static final String BookID_Book = "bookid";
    private static final String BookTitle_Book = "booktitle";
    private static final String TheLoai_Book = "theloai";
    private static final String TacGia_Book = "tacgia";
    private static final String NamXB_Book = "namxb";
    private static final String ImgBook_Book = "imgbook";
    private static final String SoLuong_Book = "soluong";

    private static int version = 1;

    private SQLiteDatabase db;
    private Context context;
    private ContentValues values;
    public SQLBook(Context context) {
        super(context, DatabaseName, null, version);
        this.context = context;
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        String Create_Table_book = " CREATE TABLE " + Table_Name3 + " ( " +
                BookID_Book + " integer primary key, " +
                BookTitle_Book + " TEXT, " +
                TheLoai_Book + " TEXT, " +
                TacGia_Book + " TEXT, " +
                NamXB_Book + " TEXT, " +
                ImgBook_Book + " integer, " +
                SoLuong_Book + " integer)";
        db.execSQL(Create_Table_book);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS "+ Table_Name3);
        onCreate(db);
    }
    //----------------------------------------------------------------------------------------------------------------
    public void AddBook(Book book) {
        db = this.getWritableDatabase();
        values = new ContentValues();
        values.put(BookTitle_Book, book.getTenSach());
        values.put(TheLoai_Book, book.getTheLoai());
        values.put(TacGia_Book, book.getTacGia());
        values.put(NamXB_Book,book.getNamXB());
        values.put(ImgBook_Book,book.getImgBook());
        values.put(SoLuong_Book,book.getSoLuong());
        db.insert(Table_Name3, null, values);
        db.close();
    }

    public Book getBook(int bookid){
        db = this.getWritableDatabase();
        Cursor cursor = db.query(Table_Name3, new String[]{BookID_Book, BookTitle_Book, TheLoai_Book, TacGia_Book, NamXB_Book, ImgBook_Book, SoLuong_Book},
                BookID_Book + "=?", new String[]{String.valueOf(bookid)}, null, null, null,null);
        Book s = new Book();
        if(cursor.moveToFirst()){
            s.setBookID(cursor.getInt(0));
            s.setTenSach(cursor.getString(1));
            s.setTheLoai(cursor.getString(2));
            s.setTacGia(cursor.getString(3));
             s.setNamXB(cursor.getString(4));
             s.setImgBook(cursor.getInt(5));
             s.setSoLuong(cursor.getInt(6));
        }else{
            s = null;
        }
        cursor.close();
        db.close();
        return s;
    }
    //------------Xem tất cả Sách---------------------
    public ArrayList<Book> getAllBook(){
        ArrayList<Book> list = new ArrayList<>();
        String selectbook = "select * from " + Table_Name3;
        db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(selectbook, null);
        if(cursor.moveToFirst()){
            do{
                list.add(new Book(cursor.getInt(0),cursor.getString(1),cursor.getString(2),cursor.getString(3),cursor.getString(4), cursor.getInt(5),cursor.getInt(6) ));
            }while (cursor.moveToNext());
        }else{
            list = null;
        }
        cursor.close();
        db.close();
        return list;
    }
    //------------Xóa sách---------------------
    public void DeleteBook(Book book) {
        db = this.getWritableDatabase();
        db.delete(Table_Name3, BookID_Book + " = ?",
                new String[] { String.valueOf(book.getBookID()) });
        db.close();
    }
    //------------Update so luong sách---------------------
    public int UpdateSoLuongBook(int soluong, int bookid){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(SoLuong_Book,soluong);
        return db.update(Table_Name3,values,BookID_Book +"=?",new String[] { String.valueOf(bookid)});

    }
}

