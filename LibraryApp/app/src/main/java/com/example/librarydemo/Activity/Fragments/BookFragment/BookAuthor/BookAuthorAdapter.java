package com.example.librarydemo.Activity.Fragments.BookFragment.BookAuthor;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.CheckBoxListener;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class BookAuthorAdapter extends RecyclerView.Adapter<BookAuthorAdapter.ViewHolder> {

    Context context;
    List<AuthorModel> authorList;
    ArrayList<AuthorModel> checkedAuthor = new ArrayList<>();
    CheckBoxListener checkBoxListener;
    Type type = new TypeToken<AuthorModel>(){}.getType();

    public BookAuthorAdapter(Context context, List<AuthorModel> authorList, CheckBoxListener checkBoxListener) {
        this.context = context;
        this.authorList = authorList;
        this.checkBoxListener = checkBoxListener;
    }

    public BookAuthorAdapter(Context context, List<AuthorModel> authorList) {
        this.context = context;
        this.authorList = authorList;
    }

    @NonNull
    @Override
    public BookAuthorAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.table_item_layout, parent, false);
        return new ViewHolder(view);
    }

    /**
     * Use this method when the whole list is changed,
     * notifyDataSetChanged() will be triggered
     * @param authorsList
     */
    public void setItems(List<AuthorModel> authorsList) {
        this.authorList = authorsList;
    }

    /**
     * Use this method when the whole list is changed,
     * notifyItemInserted() will be triggered
     * @param authorModel
     */
    public void addItem(AuthorModel authorModel) {
        if(findItemInSelectedList(authorModel.getId()) == null) {
            authorList.add(authorModel);
            notifyItemInserted(authorList.size() - 1);
        }
    }

    public void addItemFromSpinner(SpinnerOption spinnerOption) {

    }

    @Override
    public void onBindViewHolder(@NonNull BookAuthorAdapter.ViewHolder holder, int position) {
        if(authorList != null & authorList.size() > 0) {
            AuthorModel author = authorList.get(position);

            holder.tv_name.setText(author.getName());
            holder.tv_email.setText(author.getMail());
            holder.tv_phone.setText(author.getPhone());

            if(findItemInSelectedList(author.getId()) == null) {
                checkedAuthor.add(author);
                checkBoxListener.onCheckBoxChange(checkedAuthor, type);
            }
            holder.checkBox.setChecked(true);

            holder.checkBox.setOnCheckedChangeListener((compoundButton, b) -> {
                if(b) {
                    if(findItemInSelectedList(authorList.get(position).getId()) == null)
                        checkedAuthor.add(authorList.get(position));
                }
                else {
                    checkedAuthor.remove(authorList.get(position));
                }
                checkBoxListener.onCheckBoxChange(checkedAuthor, type);
            });
        }
    }

    @Override
    public int getItemCount() {
        return authorList.size();
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

    private AuthorModel findItemInSelectedList(String id) {
        for (AuthorModel author: checkedAuthor)
            if(author.getId().equals(id))
                return author;

        return null;
    }
}
