package com.example.librarydemo.Services.Layout;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;

import java.util.ArrayList;

public class CustomSpinner extends ArrayAdapter<SpinnerOption> {
    ArrayList<SpinnerOption> optionList;

    public CustomSpinner(Context context, ArrayList<SpinnerOption> optionList) {
        super(context, 0, optionList);
        this.optionList = optionList;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return initializeView(position, convertView, parent);
    }

    @Override
    public View getDropDownView(int position, View convertView, ViewGroup parent) {
        return initializeView(position, convertView, parent);
    }

    private View initializeView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.custom_spinner_layout, parent, false);
        }
        SpinnerOption currentItem = getItem(position);

        TextView label = convertView.findViewById(R.id.label);
        if(currentItem.getLabel() != null){
            label.setText(currentItem.getLabel());
        }
        return convertView;
    }
}
