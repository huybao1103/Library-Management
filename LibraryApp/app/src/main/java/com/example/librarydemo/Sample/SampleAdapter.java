package com.example.librarydemo.Sample;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.DBBook.BookAdapter;
import com.example.librarydemo.Models.BookModel;
import com.example.librarydemo.R;

import java.util.List;

public class SampleAdapter extends BaseAdapter {
    private Context context;
    private int layout;
    private List<BookModel> list;

    public SampleAdapter(Context context, int layout, List<BookModel> list) {
        this.context = context;
        this.layout = layout;
        this.list = list;
    }

    @Override
    public int getCount() {
        return 0;
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        TextView tensach, tacgia, theloai, soluong;
        ImageView imgsach;

        if(view == null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(layout,null);

            //Ánh Xạ View
            tensach = (TextView) view.findViewById(R.id.ten_sach);
            tacgia = (TextView) view.findViewById(R.id.tac_gia);
            theloai = (TextView) view.findViewById(R.id.the_loai);
            soluong = (TextView) view.findViewById(R.id.so_luong);
            imgsach = (ImageView) view.findViewById(R.id.img_hinh);

            //Gán Giá Trị
            BookModel book = list.get(i);
            //Ghi giá trị vào listview
            tensach.setText(book.getName());
//            tacgia.setText(book.getPublishYear());
//            theloai.setText(book.get());
            soluong.setText(book.getPublishYear());
//            imgsach.setImageResource(book.getImgBook());
        }


        return view;
    }
}
