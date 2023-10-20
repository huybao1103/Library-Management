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

import com.example.librarydemo.Enum.LibraryCardStatus;
import com.example.librarydemo.Models.LibraryCard.LibraryCard;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;
import com.example.librarydemo.Services.LocalDateTimeConvert;

import java.util.List;

public class LibraryCardAdapter extends BaseAdapter {
    TextView student_name, student_Id, expiry_date, status;
    ImageView imgsach;
    ImageButton adapter_menu_btn;
    private Context context;
    private int layout;
    private List<LibraryCard> list;
    private IAdapterEventListener listener;

    public LibraryCardAdapter(Context context, int layout, List<LibraryCard> list) {
        this.context = context;
        this.layout = layout;
        this.list = list;
    }

    public LibraryCardAdapter(Context context, int layout, List<LibraryCard> list, IAdapterEventListener listener) {
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
            student_name = convertView.findViewById(R.id.student_name);
            student_Id = convertView.findViewById(R.id.student_Id);
            expiry_date = convertView.findViewById(R.id.expiry_date);
            status = convertView.findViewById(R.id.status);
            imgsach = (ImageView) convertView.findViewById(R.id.img_hinh);

            //Gán Giá Trị
            LibraryCard card = list.get(position);

            student_name.setText(card.getName());
            student_name.setOnClickListener(v -> listener.onItemNameClicked(card.getId()));

            student_Id.setText(card.getStudentId() + " - " + card.getStudentClass());

            status.setText(LibraryCardStatus.fromCode(card.getStatus()).name());

            if(card.getExpiryDate() != null)
                expiry_date.setText(new LocalDateTimeConvert().convertDate(card.getExpiryDate()));

            if (card.getStudentImages().length > 0) {
                Bitmap decodedByte = new Base64Service(context).convertBase64ToImage(card.getStudentImages()[0].getBase64());
                imgsach.setImageBitmap(decodedByte);
            }

            bindMenuIconEvent(convertView, card.getId());
        }
        return convertView;
    }

    private void bindMenuIconEvent(View view, String cardId) {
        adapter_menu_btn = view.findViewById(R.id.adapter_menu_btn);

        adapter_menu_btn.setOnClickListener(v -> showPopupMenu(v, cardId));
    }

    private void showPopupMenu(View v, String cardId) {
        PopupMenu popup = new PopupMenu(context, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    listener.onEditButtonClicked(cardId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    listener.onDeleteButtonClicked(cardId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }
}