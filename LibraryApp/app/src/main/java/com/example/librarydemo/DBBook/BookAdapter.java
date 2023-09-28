package com.example.librarydemo.DBBook;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.Base64Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class BookAdapter extends BaseAdapter {
    private Context context;
    private int layout;
    private List<BookModel> list;

    public BookAdapter(Context context, int layout, List<BookModel> list) {
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
        TextView tensach, tacgia, theloai, nxb;
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
            viewAnhXa.imgsach = (ImageView) convertView.findViewById(R.id.img_hinh);
            viewAnhXa.nxb = (TextView) convertView.findViewById(R.id.nxb);
            convertView.setTag(viewAnhXa);
        }else{
            viewAnhXa = (ViewAnhXa) convertView.getTag();
        }

        //Gán Giá Trị
        BookModel book = list.get(position);
        String authorName = "";
        String categoryName = "";
        String publisherName = "";

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            authorName = Arrays.stream(book.getBookAuthors()).map(x -> x.getAuthor().getName()).collect(Collectors.joining(", "));
            categoryName = Arrays.stream(book.getBookCategories()).map(x -> x.getCategory().getName()).collect(Collectors.joining(", "));
            publisherName = Arrays.stream(book.getBookPublishers()).map(x -> x.getPublisher().getName()).collect(Collectors.joining(", "));
        }
        //Ghi giá trị vào listview
        viewAnhXa.tensach.setText(book.getName());
        viewAnhXa.tacgia.setText("Author: " + authorName);
        viewAnhXa.nxb.setText("Publisher: " + publisherName);
        viewAnhXa.theloai.setText("Category: " + categoryName);

        Bitmap decodedByte = new Base64Service(context).convertBase64ToImage(book.getBookImages()[0].getBase64());
        viewAnhXa.imgsach.setImageBitmap(decodedByte);

        return convertView;
    }
}
