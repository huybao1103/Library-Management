package com.example.librarydemo.Services.Layout;

import android.content.Context;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AlertDialog;

import com.example.librarydemo.R;
import com.example.librarydemo.Services.Interface.ConfirmDialog.IConfirmDialogEventListener;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class ConfirmDialogService {
    String title;
    Context context;
    IConfirmDialogEventListener listener;

    public ConfirmDialogService(String title, Context context, IConfirmDialogEventListener listener) {
        this.title = title;
        this.context = context;
        this.listener = listener;
    }

    public AlertDialog ShowConfirmDialog() {
        View confirmDialogView = LayoutInflater.from(context).inflate(R.layout.confirm_dialog_layout, null);

        AlertDialog dialog = new MaterialAlertDialogBuilder(context)
        .setView(confirmDialogView)
        .setTitle(title)
        .create();

        Button no_btn = confirmDialogView.findViewById(R.id.no_btn);
        no_btn.setOnClickListener(v -> {
            listener.onYesOrNoButtonClicked(false);
            dialog.dismiss();
        });

        Button yes_btn = confirmDialogView.findViewById(R.id.yes_btn);
        yes_btn.setOnClickListener(v -> {
            listener.onYesOrNoButtonClicked(true);
            dialog.dismiss();
        });

        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        return dialog;
    }
}
