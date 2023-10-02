package com.example.librarydemo.Services;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class LocalDateTimeConvert {
    String defaultDateTime = "EEE MMM dd HH:mm:ss zzz yyyy";
    String customDateTime = "dd/MM/yyyy";

    public LocalDateTimeConvert() {}

    public String getLocalDateTimeString(String date)
    {
        // Đối tượng DateFormat với định dạng đầu vào mặc định
        DateFormat defaultFormat = new SimpleDateFormat(defaultDateTime, Locale.ENGLISH);

        // Đối tượng DateFormat với định dạng đầu ra mong muốn
        DateFormat desiredFormat = new SimpleDateFormat(customDateTime);

        try {
            // Chuyển đổi chuỗi thời gian mặc định sang đối tượng Date
            Date defaultDateTime = defaultFormat.parse(date);

            // Định dạng lại thời gian theo định dạng mong muốn
            return desiredFormat.format(defaultDateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return "";
    }

    public boolean DateTimeCompare(String dateTimeA, String dateTimeB)
    {
        try {
            // Chuyển đổi chuỗi thời gian 1 sang đối tượng Date
            Date dateTime1 = convertStringToDate(dateTimeA);

            // Chuyển đổi chuỗi thời gian 2 sang đối tượng Date
            Date dateTime2 = convertStringToDate(dateTimeB);

            // So sánh hai đối tượng Date
            int result = dateTime1.compareTo(dateTime2);

            if (result > 0) {
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getOtherWeekFromDate(String dateTime, int numberOfWeek) throws ParseException {
        // Tạo một đối tượng Calendar và đặt thời gian là thời gian hiện tại.
        Calendar calendar = Calendar.getInstance();
        if(dateTime == null)
        {
            calendar.setTime(new Date());
        }
        else
        {
            Date dateTimeConverted = convertStringToDate(dateTime);
            calendar.setTime(dateTimeConverted);
        }

        // Thêm numberOfWeek tuần vào thời gian hiện tại.
        calendar.add(Calendar.WEEK_OF_YEAR, numberOfWeek);
        Date newDateTime = calendar.getTime();

        return getLocalDateTimeString(newDateTime.toString());
    }

    public Date convertStringToDate(String date) throws ParseException {
        // Đối tượng DateFormat với định dạng đầu vào mặc định
        DateFormat defaultFormat = new SimpleDateFormat(defaultDateTime, Locale.ENGLISH);
        // Đối tượng DateFormat với định dạng đầu vào mong muốn
        DateFormat desiredFormat = new SimpleDateFormat(customDateTime);

        try {
            return desiredFormat.parse(date);
        } catch (ParseException e) {
            return defaultFormat.parse(date);
        }
    }

    /**
     * Convert ISO date format to desired format (dd/mm/yyyy)
     * @param IsoDateString
     * @return localDateString
     */
    public String convertDate(String IsoDateString) {
        DateTimeFormatter inputFormatter = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            inputFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate date = LocalDate.parse(IsoDateString, inputFormatter);
            return date.format(outputFormatter);
        }
        return null;
    }
}
