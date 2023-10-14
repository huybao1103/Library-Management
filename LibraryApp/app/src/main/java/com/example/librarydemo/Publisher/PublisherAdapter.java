package com.example.librarydemo.Publisher;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.R;

import java.util.List;

public class PublisherAdapter extends RecyclerView.Adapter<PublisherAdapter.ViewHolder>{
    Context context;
    List<PublisherModel> publisherList;

    public PublisherAdapter(Context context, List<PublisherModel> publisherList) {
        this.context = context;
        this.publisherList = publisherList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.author_item_layout, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PublisherAdapter.ViewHolder holder, int position) {
        if(publisherList != null & publisherList.size() > 0) {
            PublisherModel author = publisherList.get(position);

            holder.tv_name.setText(author.getName());
            holder.tv_email.setText(author.getMail());
            holder.tv_phone.setText(author.getPhone());
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
        ImageView edit_btn;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            tv_name = itemView.findViewById(R.id.tv_name);
            tv_email = itemView.findViewById(R.id.tv_email);
            tv_phone = itemView.findViewById(R.id.tv_phone);
            edit_btn = itemView.findViewById(R.id.edit_btn);
        }
    }
}
