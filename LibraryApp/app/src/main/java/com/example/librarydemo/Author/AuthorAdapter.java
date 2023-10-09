package com.example.librarydemo.Author;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.AnimatorRes;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.librarydemo.R;

import java.util.ArrayList;

public class AuthorAdapter extends RecyclerView.Adapter<AuthorAdapter.MyViewHolder> {

    private Context context;
    private Activity activity;
    private ArrayList author_id, author_name, author_mail, author_phone;

    Animation translate_anim;

    AuthorAdapter(Activity activity, Context context, ArrayList author_id, ArrayList author_name, ArrayList author_mail, ArrayList author_phone){
        this.activity = activity;
        this.context = context;
        this.author_id = author_id;
        this.author_name = author_name;
        this.author_mail = author_mail;
        this.author_phone = author_phone;
    }
    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.author_row, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, final int position) {
        holder.author_id_txt.setText(String.valueOf(author_id.get(position)));
        holder.author_name_txt.setText(String.valueOf(author_name.get(position)));
        holder.author_mail_txt.setText(String.valueOf(author_mail.get(position)));
        holder.author_phone_txt.setText(String.valueOf(author_phone.get(position)));
        holder.mainLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, UpdateAuthor.class);
                intent.putExtra("id", String.valueOf(author_id.get(position)));
                intent.putExtra("name", String.valueOf(author_name.get(position)));
                intent.putExtra("mail", String.valueOf(author_mail.get(position)));
                intent.putExtra("phone", String.valueOf(author_phone.get(position)));
                activity.startActivityForResult(intent, 1);
            }
        });
    }

    @Override
    public int getItemCount() {
        return author_id.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {

        TextView author_id_txt, author_name_txt, author_mail_txt, author_phone_txt;
        LinearLayout mainLayout;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            author_id_txt = itemView.findViewById(R.id.author_id_txt);
            author_name_txt = itemView.findViewById(R.id.author_name_txt);
            author_mail_txt = itemView.findViewById(R.id.author_mail_txt);
            author_phone_txt = itemView.findViewById(R.id.author_phone_txt);
            mainLayout = itemView.findViewById(R.id.mainLayout);
            //Animate Recycleview
            translate_anim = AnimationUtils.loadAnimation(context, R.anim.translate_anim);
            mainLayout.setAnimation(translate_anim);
        }
    }


}
