package com.example.librarydemo.Activity.Fragments.LibraryCardFragment;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Enum.BookChapterStatus;
import com.example.librarydemo.Enum.BorrowHistoryStatus;
import com.example.librarydemo.Models.LibraryCard.BorrowHistory;
import com.example.librarydemo.Models.LibraryCard.LibraryCard;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.DatePickerService;
import com.example.librarydemo.Services.Layout.TableListService;
import com.example.librarydemo.Services.LocalDateTimeConvert;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import de.codecrafters.tableview.TableDataAdapter;
import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class NewRecordDetail extends AppCompatActivity {
    ApiService apiService;
    AutoCompleteTextView spn_book, spn_chapter, spn_status;
    TextInputEditText edt_borrowDate, edt_endDay;
    String cardId, selectedBookName;
    TableView table_view;
    SpinnerOption selectedBook, selectedChapter, selectedStatus;
    private ArrayList<SpinnerOption> chapterStatusList;
    List<BorrowHistory> newBorrowHistoryList;
    LocalDateTimeConvert dateConverter;
    int remainingBookNumber = 3;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_record_detail);

        assign();
        getLibraryCardById();
        getBooks();
        setStatusSpinner();
    }

    void assign() {
        apiService = RetrofitClient.getApiService(this); 
        dateConverter = new LocalDateTimeConvert();

        spn_book = findViewById(R.id.spn_book);
        spn_chapter = findViewById(R.id.spn_chapter);
        spn_status = findViewById(R.id.spn_status);

        edt_borrowDate = findViewById(R.id.edt_borrowDate);
        edt_endDay = findViewById(R.id.edt_endDay);

        edt_borrowDate.setOnClickListener(v -> new DatePickerService().showDatePickerDialog(NewRecordDetail.this, edt_borrowDate));
        edt_endDay.setOnClickListener(v -> new DatePickerService().showDatePickerDialog(NewRecordDetail.this, edt_endDay));

        if(getIntent().getExtras() != null) {
            cardId = getIntent().getExtras().getString("cardId");
        }

        newBorrowHistoryList = new ArrayList<>();

        table_view = findViewById(R.id.table_view);
        String[] headers = {"Book Name", "Chapter", "Expiry Date"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(NewRecordDetail.this, headers));
        table_view = new TableListService(new String[]{"Book Name", "Chapter", "Expiry Date"}, table_view, NewRecordDetail.this).setColumnModel();

        Button add_record_btn = findViewById(R.id.add_record_btn);
        add_record_btn.setOnClickListener(v -> addRecord());

        Button submit_btn = findViewById(R.id.submit_btn);
        submit_btn.setOnClickListener(v -> saveRecord());
    }

    private void getLibraryCardById() {
        apiService.getById(ControllerConst.LIBRARYCARDS, cardId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                LibraryCard libraryCard = new ApiResponse<LibraryCard>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<LibraryCard  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    remainingBookNumber = 3 - (int) Arrays.stream(libraryCard.getBorrowHistories())
                        .filter
                        (r ->
                            BorrowHistoryStatus.fromCode(r.getStatus()) == BorrowHistoryStatus.Expired
                            ||
                            BorrowHistoryStatus.fromCode(r.getStatus()) == BorrowHistoryStatus.Active
                        )
                        .count();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }
    private void setStatusSpinner() {
        chapterStatusList = new ArrayList<>();
        for (BorrowHistoryStatus status: BorrowHistoryStatus.values()) {
            SpinnerOption spinnerOption = new SpinnerOption(status.name(), status.getCode());

            chapterStatusList.add(spinnerOption);
        }
        CustomSpinner customSpinner = new CustomSpinner(NewRecordDetail.this, chapterStatusList);

        spn_status.setAdapter(customSpinner);

        spn_status.setOnItemClickListener((adapterView, view, i, l) -> selectedStatus = (SpinnerOption) adapterView.getItemAtPosition(i));
    }
    private void getBooks() {
        apiService.getSpinner(ControllerConst.BOOKS).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                ArrayList<SpinnerOption> spinnerOptions = new ApiResponse<ArrayList<SpinnerOption>>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<ArrayList<SpinnerOption>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );
                CustomSpinner customSpinner = new CustomSpinner(NewRecordDetail.this, spinnerOptions);

                spn_book.setAdapter(customSpinner);
                spn_book.setOnItemClickListener((adapterView, view, i, l) -> {
                    selectedBook = (SpinnerOption) adapterView.getItemAtPosition(i);

                    getBookChapterSpinner(selectedBook.getValue());
                });
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    void getBookChapterSpinner(String bookId) {
        apiService.getBookChapterSpinner(bookId).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                ArrayList<SpinnerOption> spinnerOptions = new ApiResponse<ArrayList<SpinnerOption>>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<ArrayList<SpinnerOption>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );
                CustomSpinner customSpinner = new CustomSpinner(NewRecordDetail.this, spinnerOptions);

                spn_chapter.setAdapter(customSpinner);
                spn_chapter.setOnItemClickListener((adapterView, view, i, l) -> selectedChapter = (SpinnerOption) adapterView.getItemAtPosition(i));
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    void addRecord() {
        if (newBorrowHistoryList.size() < 3 && remainingBookNumber > 0 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)
        {
            if(newBorrowHistoryList.stream().anyMatch(r -> r.getBookChapterId().equals(selectedChapter.getValue())))
            {
                Toast.makeText(NewRecordDetail.this, "This chapter is already added!!!", Toast.LENGTH_SHORT).show();
            }
            else
            {
                remainingBookNumber -= 1;

                BorrowHistory history = new BorrowHistory();
                history.setBookChapterId(selectedChapter.getValue());
                history.setChapter(Integer.parseInt(selectedChapter.getLabel()));

                history.setBookName(selectedBook.getLabel());

                history.setLibraryCardId(cardId);

                if(edt_borrowDate != null)
                    history.setBorrowDate(dateConverter.convertToISODateTime(edt_borrowDate.getText().toString()));
                if(edt_endDay != null)
                    history.setEndDate(dateConverter.convertToISODateTime(edt_endDay.getText().toString()));

                newBorrowHistoryList.add(history);
                setRecordAdapter();
            }
        }
        else
        {
            Toast.makeText(NewRecordDetail.this, "Out of number of books can borrow!!!", Toast.LENGTH_SHORT).show();
        }
    }

    private void setRecordAdapter() {
        table_view.setDataAdapter(new TableDataAdapter(NewRecordDetail.this, newBorrowHistoryList) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                BorrowHistory history = (BorrowHistory) getItem(rowIndex); // This gets the BorrowHistory for the given row

                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT, // Width
                        LinearLayout.LayoutParams.WRAP_CONTENT  // Height
                );
                TextView textView = new TextView(NewRecordDetail.this);
                textView.setMaxLines(1); // Display text in a single line
                textView.setEllipsize(TextUtils.TruncateAt.END); // Add ellipsis at the end

                textView.setLayoutParams(layoutParams);

                switch (columnIndex) {
                    case 0:
                        textView.setText(history.getBookName());
                        break;
                    case 1:
                        textView.setText(history.getChapter() + "");
                        break;
                    case 2:
                        if(history.getBorrowDate() != null && history.getEndDate() != null)
                            textView.setText(dateConverter.convertDate(history.getBorrowDate()) + " - " + dateConverter.convertDate(history.getEndDate()));
                        break;
                    case 3:
                        return getDeleteIcon(rowIndex);
                    // Add more cases if you have more columns.
                    default:
                        throw new IllegalArgumentException("Invalid columnIndex: " + columnIndex);
                }

                return textView;
            }
        });
    }

    private FrameLayout getDeleteIcon(int rowIndex) {
        // Create an ImageView
        ImageView imageView = new ImageView(NewRecordDetail.this);
        imageView.setImageResource(R.drawable.baseline_delete_24);
        imageView.setOnClickListener(v -> removeRecord(rowIndex));

        // Create a FrameLayout and set its LayoutParams
        FrameLayout frameLayout = new FrameLayout(NewRecordDetail.this);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT,
                Gravity.END // Align to the end
        );
        imageView.setLayoutParams(params);

        // Add the ImageView to the FrameLayout
        frameLayout.addView(imageView);

        return frameLayout;
    }

    private void removeRecord(int rowIndex) {
        remainingBookNumber += 1;
        newBorrowHistoryList.remove(rowIndex);
        setRecordAdapter();
    }

    private void saveRecord() {
        if(newBorrowHistoryList.size() > 0) {
            JsonArray data = new ApiRequest().convertModelToJSONArray(newBorrowHistoryList);

            apiService.save(ControllerConst.BORROWHISTORIES, data).enqueue(new Callback<JsonArray>() {
                @Override
                public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                    if(response.isSuccessful())
                        finish();
                    else
                        Toast.makeText(NewRecordDetail.this, Objects.requireNonNull(response.errorBody()).toString(), Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onFailure(Call<JsonArray> call, Throwable t) {

                }
            });
        }
        else
            Toast.makeText(this, "There's nothing to submit!!!", Toast.LENGTH_SHORT).show();
    }
}