package com.example.librarydemo.Activity.Fragments.BookFragment.BookPublisher;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.CheckBoxListener;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class BookPublisherAdapter extends RecyclerView.Adapter<BookPublisherAdapter.ViewHolder> {

    Context context;
    List<PublisherModel> publisherList;
    ArrayList<PublisherModel> checkedPublisher = new ArrayList<>();
    CheckBoxListener checkBoxListener;
    Type type = new TypeToken<PublisherModel>(){}.getType();

    public BookPublisherAdapter(Context context, List<PublisherModel> publisherList, CheckBoxListener checkBoxListener) {
        this.context = context;
        this.publisherList = publisherList;
        this.checkBoxListener = checkBoxListener;
    }

    public BookPublisherAdapter(Context context, List<PublisherModel> publisherList) {
        this.context = context;
        this.publisherList = publisherList;
    }

    @NonNull
    @Override
    public BookPublisherAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.table_item_layout, parent, false);
        return new ViewHolder(view);
    }

    /**
     * Use this method when the whole list is changed,
     * notifyDataSetChanged() will be triggered
     * @param publishersList
     */
    public void setItems(List<PublisherModel> publishersList) {
        this.publisherList = publishersList;
    }

    /**
     * Use this method when the whole list is changed,
     * notifyItemInserted() will be triggered
     * @param publisherModel
     */
    public void addItem(PublisherModel publisherModel) {
        if(findItemInSelectedList(publisherModel.getId()) == null) {
            publisherList.add(publisherModel);
            notifyItemInserted(publisherList.size() - 1);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull BookPublisherAdapter.ViewHolder holder, int position) {
        if(publisherList != null & publisherList.size() > 0) {
            PublisherModel publisher = publisherList.get(position);

            holder.tv_name.setText(publisher.getName());
            holder.tv_email.setText(publisher.getMail());
            holder.tv_phone.setText(publisher.getPhone());

            if(findItemInSelectedList(publisher.getId()) == null) {
                checkedPublisher.add(publisher);
                checkBoxListener.onCheckBoxChange(checkedPublisher, type);
            }
            holder.checkBox.setChecked(true);

            holder.checkBox.setOnCheckedChangeListener((compoundButton, b) -> {
                if(b) {
                    if(findItemInSelectedList(publisherList.get(position).getId()) == null)
                        checkedPublisher.add(publisherList.get(position));
                }
                else {
                    checkedPublisher.remove(publisherList.get(position));
                }
                checkBoxListener.onCheckBoxChange(checkedPublisher, type);
            });
        }
    }

    @Override
    public int getItemCount() {
        return publisherList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView tv_name;
        TextView tv_email;
        TextView tv_phone;
        CheckBox checkBox;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            tv_name = itemView.findViewById(R.id.tv_name);
            tv_email = itemView.findViewById(R.id.tv_email);
            tv_phone = itemView.findViewById(R.id.tv_phone);
            checkBox = itemView.findViewById(R.id.checkbox);
        }
    }

    private PublisherModel findItemInSelectedList(String id) {
        for (PublisherModel publisher: checkedPublisher)
            if(publisher.getId().equals(id))
                return publisher;

        return null;
    }
}
