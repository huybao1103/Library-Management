package com.example.librarydemo.Activity.Books;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.MultiAutoCompleteTextView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Activity.Books.BookAuthor.BookAuthorAdapter;
import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.Models.Book.BookCategories;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.Book.BookRequestModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.DatePickerService;
import com.example.librarydemo.Services.LocalDateTimeConvert;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.chip.Chip;
import com.google.android.material.chip.ChipGroup;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class BookDetail extends AppCompatActivity {
    ApiService apiService;
    MultiAutoCompleteTextView spn_category;
    List<SpinnerOption> categories;
    ArrayList<SpinnerOption> selectedCategories;
    EditText edt_inputDay;
    RecyclerView rcl_author;
    BookAuthorAdapter bookAuthorAdapter;
    BookModel currentBook;
    AuthorModel[] authors;
    EditText edt_bookName, edt_publishYear;
    Button submit_btn;
    String bookId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);

        assign();
        getCategories();
        openDatePicker();
    }

    private void assign() {
        apiService = RetrofitClient.getApiService(this);

        spn_category = findViewById(R.id.spn_category);
        selectedCategories = new ArrayList<>();
        edt_inputDay = findViewById(R.id.edt_inputDay);

        rcl_author = findViewById(R.id.rcl_author);

        edt_bookName = findViewById(R.id.edt_bookName);
        edt_publishYear = findViewById(R.id.edt_publishYear);

        // Kiểm tra đang thêm hay sửa thông tin
        if(getIntent().getExtras() != null) {
            bookId = getIntent().getExtras().getString("bookId");

            if(!bookId.equals(""))
                getBookById(bookId);
        }

        submit_btn = findViewById(R.id.submit_btn);
        submit_btn.setOnClickListener(v -> submit());
    }

    private void getBookById(String bookId) {
        apiService.getById(ControllerConst.BOOKS, bookId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentBook = new ApiResponse<BookModel>()
                        .getResultFromResponse
                        (
                            response,
                            new TypeToken<BookModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                        );
                if(currentBook != null)
                    bindValue();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });

    }

    private void bindValue() {
        edt_bookName.setText(currentBook.getName());
        edt_publishYear.setText(currentBook.getPublishYear());
        edt_inputDay.setText(new LocalDateTimeConvert().convertDate(currentBook.getInputDay()));

        for (BookCategories bookCategories: currentBook.getBookCategories()) {
            SpinnerOption spinnerOption = new SpinnerOption(bookCategories.getCategory().getName(), bookCategories.getCategoryId());
            selectedCategories.add(spinnerOption);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            authors = Arrays.stream(currentBook.getBookAuthors())
                            .map(x -> x.getAuthor())
                            .toArray(AuthorModel[]::new);
            bookAuthorAdapter = new BookAuthorAdapter(BookDetail.this, new ArrayList<>(Arrays.asList(authors)));
            setRecyclerView();
        }
        updateSelectedItem();
    }
    private void getCategories() {
        apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */
        apiService.getSpinner(ControllerConst.CATEGORIES).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                categories = new ApiResponse<List<SpinnerOption>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                        (
                                response,
                                new TypeToken<List<SpinnerOption>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                        );

                if(categories != null && !categories.isEmpty()) {
                    CustomSpinner customSpinner = new CustomSpinner(getApplicationContext(), (ArrayList<SpinnerOption>) categories);

                    spn_category.setAdapter(customSpinner);
                    spn_category.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());

                    spn_category.setOnItemClickListener((adapterView, view, i, l) -> {
                        SpinnerOption selected = (SpinnerOption) adapterView.getItemAtPosition(i);

                        if( (selectedCategories != null
                            && !selectedCategories.isEmpty()
                            && findItem((SpinnerOption) adapterView.getItemAtPosition(i)) == null)
                            || ((selectedCategories == null) || selectedCategories.isEmpty())
                        ) {
                            selectedCategories.add(selected);
                        }

                        updateSelectedItem();
                    });

                    // Set selected category if user is editing a book
                    if (selectedCategories != null && !selectedCategories.isEmpty())
                        updateSelectedItem();
                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private SpinnerOption findItem(SpinnerOption selected) {
        for (SpinnerOption item: selectedCategories) {
            if(item.getValue().equals(selected.getValue())) {
                selectedCategories.remove(item);
                return item;
            }
        }
        return null;
    }

    private void updateSelectedItem() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            String selected = selectedCategories.stream().map(x -> x.getLabel()).collect(Collectors.joining(", "));
            spn_category.setText(selected);
            spn_category.setSelection(selected.length());
        }
    }

    public void openDatePicker() {
        edt_inputDay.setOnClickListener(v -> new DatePickerService().showDatePickerDialog(BookDetail.this, edt_inputDay));
    }

    private void setRecyclerView() {
        rcl_author.setHasFixedSize(true);
        rcl_author.setLayoutManager(new LinearLayoutManager(this));

        if(bookAuthorAdapter != null)
            rcl_author.setAdapter(bookAuthorAdapter);
    }

    public void submit() {
        String bookName = edt_bookName.getText().toString();
        String inputDay = edt_inputDay.getText().toString();
        String publishYear = edt_publishYear.getText().toString();

        BookRequestModel bookRequestModel = new BookRequestModel();

        if(bookName.equals("")) {
            Toast.makeText(this, "Book name must not be null", Toast.LENGTH_SHORT).show();
        } else if (selectedCategories == null || selectedCategories.isEmpty()) {
            Toast.makeText(this, "Book must have a category", Toast.LENGTH_SHORT).show();
        } else {
            bookRequestModel.setName(bookName);

            if(!inputDay.equals(""))
                bookRequestModel.setInputDay(new LocalDateTimeConvert().convertToISODateTime(inputDay));

            if(bookId != null && !bookId.equals(""))
                bookRequestModel.setId(bookId);

            bookRequestModel.setPublishYear(publishYear);


            String[] categories = new String[selectedCategories.size()];
            for (int i = 0; i < categories.length; i++) {
                categories[i] = selectedCategories.get(i).getValue();
            }
            bookRequestModel.setCategories(categories);
            save(bookRequestModel);
        }

    }

    private void save(BookRequestModel bookModel) {
        JsonObject data = new ApiRequest().convertModelToJSONObject(bookModel);
        apiService.save(ControllerConst.BOOKS, data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                finish();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(BookDetail.this, t.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}