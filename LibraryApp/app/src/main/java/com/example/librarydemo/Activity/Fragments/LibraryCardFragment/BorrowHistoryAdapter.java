package com.example.librarydemo.Activity.Fragments.LibraryCardFragment;

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

import com.example.librarydemo.Enum.BorrowHistoryStatus;
import com.example.librarydemo.Models.LibraryCard.BorrowHistory;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;
import com.example.librarydemo.Services.LocalDateTimeConvert;

import java.util.List;

public class BorrowHistoryAdapter extends BaseAdapter {
    TextView book_name, chapter, expiry_date, status;
    ImageButton adapter_menu_btn;
    private Context context;
    private int layout;
    private List<BorrowHistory> list;
    private IAdapterEventListener listener;

    public BorrowHistoryAdapter(Context context, int layout, List<BorrowHistory> list) {
        this.context = context;
        this.layout = layout;
        this.list = list;
    }

    public BorrowHistoryAdapter(Context context, int layout, List<BorrowHistory> list, IAdapterEventListener listener) {
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
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(layout, null);
            //Ánh Xạ View
            book_name = convertView.findViewById(R.id.book_name);
            chapter = convertView.findViewById(R.id.chapter);
            expiry_date = convertView.findViewById(R.id.expiry_date);
            status = convertView.findViewById(R.id.status);

            //Gán Giá Trị
            BorrowHistory history = list.get(position);

            book_name.setText(history.getBookChapter().getBook().getName());
            chapter.setText("Chapter " + history.getBookChapter().getChapter());
            expiry_date.setText(new LocalDateTimeConvert().convertDate(history.getBorrowDate()) + " - " + new LocalDateTimeConvert().convertDate(history.getEndDate()));
            status.setText(BorrowHistoryStatus.fromCode(history.getStatus()).name());

            bindMenuIconEvent(convertView, history.getId());
        }
        return convertView;
    }

    private void bindMenuIconEvent(View view, String historyId) {
        adapter_menu_btn = view.findViewById(R.id.adapter_menu_btn);

        adapter_menu_btn.setOnClickListener(v -> showPopupMenu(v, historyId));
    }

    private void showPopupMenu(View v, String historyId) {
        PopupMenu popup = new PopupMenu(context, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    listener.onEditButtonClicked(historyId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    listener.onDeleteButtonClicked(historyId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }
}
