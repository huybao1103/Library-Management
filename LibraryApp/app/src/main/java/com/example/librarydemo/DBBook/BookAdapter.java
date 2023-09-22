package com.example.librarydemo.DBBook;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.librarydemo.R;

import java.util.List;

public class BookAdapter extends BaseAdapter {
    private Context context;
    private int layout;
    private List<Book> list;

    public BookAdapter(Context context, int layout, List<Book> list) {
        this.context = context;
        this.layout = layout;
        this.list = list;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    public class ViewAnhXa{
        TextView tensach, tacgia, theloai, soluong;
        ImageView imgsach;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewAnhXa viewAnhXa;
        if(convertView == null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(layout,null);
            viewAnhXa = new ViewAnhXa();
            //Ánh Xạ View
            viewAnhXa.tensach= (TextView) convertView.findViewById(R.id.ten_sach);
            viewAnhXa.tacgia = (TextView) convertView.findViewById(R.id.tac_gia);
            viewAnhXa.theloai = (TextView) convertView.findViewById(R.id.the_loai);
            viewAnhXa.soluong = (TextView) convertView.findViewById(R.id.so_luong);
            viewAnhXa.imgsach = (ImageView) convertView.findViewById(R.id.img_hinh);
            convertView.setTag(viewAnhXa);
        }else{
            viewAnhXa = (ViewAnhXa) convertView.getTag();
        }

        //Gán Giá Trị
        Book book = list.get(position);
        //Ghi giá trị vào listview
        viewAnhXa.tensach.setText(book.getTenSach());
        viewAnhXa.tacgia.setText("TG:"+book.getTacGia() + "-Năm XB:" + book.getNamXB());
        viewAnhXa.theloai.setText(book.getTheLoai());
        viewAnhXa.soluong.setText( "SL:"+ String.valueOf(book.getSoLuong()));
        viewAnhXa.imgsach.setImageResource(book.getImgBook());

        return convertView;
    }
}
