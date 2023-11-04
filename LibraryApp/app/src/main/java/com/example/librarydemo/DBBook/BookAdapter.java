package com.example.librarydemo.DBBook;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.TextView;

import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class BookAdapter extends BaseAdapter {
    TextView tensach, tacgia, theloai, nxb;
    ImageView imgsach;
    ImageButton adapter_menu_btn;
    private Context context;
    private int layout;
    private List<BookModel> list;
    private IAdapterEventListener listener;

    public BookAdapter(Context context, int layout, List<BookModel> list) {
        this.context = context;
        this.layout = layout;
        this.list = list;
    }

    public BookAdapter(Context context, int layout, List<BookModel> list, IAdapterEventListener listener) {
        this.context = context;
        this.layout = layout;
        this.list = list;
        this.listener = listener;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }


    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(layout, null);
        }

        // Ánh xạ View
        tensach = convertView.findViewById(R.id.ten_sach);
        tacgia = convertView.findViewById(R.id.tac_gia);
        theloai = convertView.findViewById(R.id.the_loai);
        imgsach = convertView.findViewById(R.id.img_hinh);
        nxb = convertView.findViewById(R.id.nxb);

        // Gán giá trị
        BookModel book = list.get(position);
        String authorName = "";
        String categoryName = "";
        String publisherName = "";

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            authorName = Arrays.stream(book.getBookAuthors()).map(x -> x.getAuthor().getName()).collect(Collectors.joining(", "));
            categoryName = Arrays.stream(book.getBookCategories()).map(x -> x.getCategory().getName()).collect(Collectors.joining(", "));
            publisherName = Arrays.stream(book.getBookPublishers()).map(x -> x.getPublisher().getName()).collect(Collectors.joining(", "));
        }

        // Ghi giá trị vào ListView
        tensach.setText(book.getName());
        tensach.setOnClickListener(v -> listener.onItemNameClicked(book.getId()));

        tacgia.setText("Author: " + authorName);
        nxb.setText("Publisher: " + publisherName);
        theloai.setText("Category: " + categoryName);

        // Hiển thị hình ảnh sách nếu có
        if (book.getBookImages().length > 0) {
            Bitmap decodedByte = new Base64Service(context).convertBase64ToImage(book.getBookImages()[0].getBase64());
            imgsach.setImageBitmap(decodedByte);
            imgsach.setVisibility(View.VISIBLE); // Hiển thị ImageView
        }

        bindMenuIconEvent(convertView, book.getId());

        return convertView;
    }


    private void bindMenuIconEvent(View view, String bookId) {
        adapter_menu_btn = view.findViewById(R.id.adapter_menu_btn);

        adapter_menu_btn.setOnClickListener(v -> showPopupMenu(v, bookId));
    }

    private void showPopupMenu(View v, String bookId) {
        PopupMenu popup = new PopupMenu(context, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    listener.onEditButtonClicked(bookId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    listener.onDeleteButtonClicked(bookId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }
}
