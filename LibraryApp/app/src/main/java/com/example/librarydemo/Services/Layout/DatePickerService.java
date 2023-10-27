package com.example.librarydemo.Services.Layout;

import android.app.DatePickerDialog;
import android.content.Context;
import android.widget.DatePicker;
import android.widget.EditText;

import java.util.Calendar;

public class DatePickerService {
    public void showDatePickerDialog(Context context, EditText edt_date) {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog datePickerDialog = new DatePickerDialog(
                context, 
                (datePicker, year1, month1, day) -> edt_date.setText(String.format("%02d/%02d/%02d", day, month1 + 1, year1)),
                year, month, dayOfMonth
        );
        datePickerDialog.show();
    }
}
