package com.example.librarydemo.Services.Layout;

import android.util.DisplayMetrics;

import androidx.appcompat.app.AppCompatActivity;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.model.TableColumnModel;

public class TableListService<T> {
    private String[] headers;
    TableView table_view;
    AppCompatActivity appCompatActivity;

    private int screenSizeWidth;

    public TableListService(String[] headers, TableView tableView, AppCompatActivity appCompatActivity) {
        this.headers = headers;
        this.table_view = tableView;
        this.appCompatActivity = appCompatActivity;

        getScreenSize();
    }

    public TableView setColumnModel() {
        table_view.setColumnModel(new TableColumnModel() {
            @Override
            public int getColumnCount() {
                return headers.length + 1;
            }

            @Override
            public void setColumnCount(int columnCount) {
            }

            @Override
            public int getColumnWidth(int columnIndex, int tableWidthInPx) {
                if(columnIndex == getColumnCount() - 1)
                    return 50;
                return (screenSizeWidth / getColumnCount()) + 50;
            }
        });

        return table_view;
    }

    private void getScreenSize() {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        appCompatActivity.getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);

        screenSizeWidth = displayMetrics.widthPixels;
    }
}
