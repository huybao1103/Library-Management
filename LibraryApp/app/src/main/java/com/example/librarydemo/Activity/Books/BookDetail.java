    package com.example.librarydemo.Activity.Books;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.MultiAutoCompleteTextView;
import android.widget.TableLayout;
import android.widget.Toast;

import com.example.librarydemo.Activity.Books.BookAuthor.BookAuthorAdapter;
import com.example.librarydemo.Activity.Books.BookPublisher.BookPublisherAdapter;
import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.Models.Book.BookAuthor;
import com.example.librarydemo.Models.Book.BookCategories;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.Book.BookPublisher;
import com.example.librarydemo.Models.Book.BookRequestModel;
import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.CheckBoxListener;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.DatePickerService;
import com.example.librarydemo.Services.LocalDateTimeConvert;
import com.example.librarydemo.Services.RetrofitClient;

import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

    import retrofit2.Call;
    import retrofit2.Callback;
    import retrofit2.Response;

public class BookDetail extends AppCompatActivity implements CheckBoxListener {
    ApiService apiService;
    MultiAutoCompleteTextView spn_category;
    AutoCompleteTextView spn_author_publisher;
    List<SpinnerOption> categories, authorList, publishersList;
    ArrayList<SpinnerOption> selectedCategories, selectedAuthors, selectedPublishers;
    EditText edt_inputDay;
    RecyclerView recycler;
    BookAuthorAdapter bookAuthorAdapter;
    BookPublisherAdapter bookPublisherAdapter;
    BookModel currentBook;
    AuthorModel[] authors;
    PublisherModel[] publishers;
    EditText edt_bookName, edt_publishYear;
    Button submit_btn, openDialog;
    String bookId;
    TextInputLayout author_publisher_input;
    AlertDialog dialog;
    // Add author form
    TextInputEditText edt_authorName, edt_authorPhone, edt_authorEmail;

    // Add publisher form
    TextInputEditText edt_publisherName, edt_publisherPhone, edt_publisherEmail, edt_publisherAddress;

    // Tab
    TabLayout author_publisher_tab;
    boolean isAuthorTabSelected = true;
    boolean formValid = false;
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

        author_publisher_input = findViewById(R.id.author_publisher_input);

        spn_author_publisher = findViewById(R.id.spn_author_publisher);
        spn_category = findViewById(R.id.spn_category);

        selectedCategories = new ArrayList<>();
        selectedAuthors = new ArrayList<>();
        selectedPublishers = new ArrayList<>();

        edt_inputDay = findViewById(R.id.edt_inputDay);

        recycler = findViewById(R.id.recycler);
        recycler.setHasFixedSize(false);
        recycler.setLayoutManager(new LinearLayoutManager(this));
        recycler.setItemAnimator(null);

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

        openDialog = findViewById(R.id.openDialog);
        openDialog.setOnClickListener(v -> openDialog());

        author_publisher_tab = findViewById(R.id.author_publisher_tab);
        author_publisher_tab.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                isAuthorTabSelected = tab.getPosition() == 0;
                setRecyclerView();
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                isAuthorTabSelected = tab.getPosition() == 0;
                setRecyclerView();
            }
        });
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
        for (BookAuthor bookAuthor: currentBook.getBookAuthors()) {
            AuthorModel author = bookAuthor.getAuthor();
            String label = author.getName() + ", " + author.getMail() + ", " + author.getPhone();
            SpinnerOption spinnerOption = new SpinnerOption(label, author.getId());

            selectedAuthors.add(spinnerOption);
        }
        for (BookPublisher bookPublisher: currentBook.getBookPublishers()) {
            PublisherModel publisher = bookPublisher.getPublisher();
            String label = publisher.getName() + ", " + publisher.getMail() + ", " + publisher.getPhone();
            SpinnerOption spinnerOption = new SpinnerOption(label, publisher.getId());

            selectedPublishers.add(spinnerOption);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            authors = Arrays.stream(currentBook.getBookAuthors())
                .map(x -> x.getAuthor())
                .toArray(AuthorModel[]::new);
            publishers = Arrays.stream(currentBook.getBookPublishers())
                    .map(x -> x.getPublisher())
                    .toArray(PublisherModel[]::new);

            selectedAuthors = Arrays.stream(authors)
            .map(i -> new SpinnerOption(i.getName(), i.getId()))
            .collect(Collectors.toCollection(ArrayList::new));

            selectedPublishers = Arrays.stream(publishers)
            .map(i -> new SpinnerOption(i.getName(), i.getId()))
            .collect(Collectors.toCollection(ArrayList::new));

            setRecyclerView();
        }
        updateSelectedCategory();
    }

    private void setBookAuthorAdapter() {
        bookAuthorAdapter = new BookAuthorAdapter(BookDetail.this, new ArrayList<>(Arrays.asList(authors)), this);
    }
    private void setBookPublisherAdapter() {
        bookPublisherAdapter = new BookPublisherAdapter(BookDetail.this, new ArrayList<>(Arrays.asList(publishers)), this);
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

                        updateSelectedCategory();
                    });

                    // Set selected category if user is editing a book
                    if (selectedCategories != null && !selectedCategories.isEmpty())
                        updateSelectedCategory();
                }
            }

                @Override
                public void onFailure(Call<JsonArray> call, Throwable t) {

                }
            });
        }

    private void getAuthors() {
        apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */
        apiService.getAllWithCustomUrl(ControllerConst.AUTHORS, "advance-option").enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                authorList = new ApiResponse<List<SpinnerOption>>()
                .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                (
                    response,
                    new TypeToken<List<SpinnerOption>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                );

                if(authorList != null && !authorList.isEmpty()) {
                    CustomSpinner customSpinner = new CustomSpinner(getApplicationContext(), (ArrayList<SpinnerOption>) authorList);

                    spn_author_publisher.setAdapter(customSpinner);

                    spn_author_publisher.setOnItemClickListener((adapterView, view, i, l) -> {
                        SpinnerOption selected = (SpinnerOption) adapterView.getItemAtPosition(i);

                        selectedAuthors.add(selected);
                        getSelectedAuthor(selected.getValue());

                        spn_author_publisher.setText("");
                    });
                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private void getPublishers() {
        apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */
        apiService.getAllWithCustomUrl(ControllerConst.PUBLISHERS, "advance-option").enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                publishersList = new ApiResponse<List<SpinnerOption>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<List<SpinnerOption>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(publishersList != null && !publishersList.isEmpty()) {
                    CustomSpinner customSpinner = new CustomSpinner(getApplicationContext(), (ArrayList<SpinnerOption>) publishersList);

                    spn_author_publisher.setAdapter(customSpinner);

                    spn_author_publisher.setOnItemClickListener((adapterView, view, i, l) -> {
                        SpinnerOption selected = (SpinnerOption) adapterView.getItemAtPosition(i);

                        selectedPublishers.add(selected);
                        getSelectedPublisher(selected.getValue());

                        spn_author_publisher.setText("");
                    });
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

    private void getSelectedAuthor(String id) {
        apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */
        apiService.getById(ControllerConst.AUTHORS, id).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                AuthorModel author = new ApiResponse<AuthorModel>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<AuthorModel>(){}.getType()
                );

                bookAuthorAdapter.addItem(author);
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void getSelectedPublisher(String id) {
        apiService = RetrofitClient.getApiService(this); /* Khai báo để gọi API */
        apiService.getById(ControllerConst.PUBLISHERS, id).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                PublisherModel publisher = new ApiResponse<PublisherModel>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<PublisherModel>(){}.getType()
                );

                bookPublisherAdapter.addItem(publisher);
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }
    private void updateSelectedCategory() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && isAuthorTabSelected) {
            String selected = selectedCategories.stream().map(x -> x.getLabel()).collect(Collectors.joining(", "));
            spn_category.setText(selected);
            spn_category.setSelection(selected.length());
        }
    }

        public void openDatePicker() {
            edt_inputDay.setOnClickListener(v -> new DatePickerService().showDatePickerDialog(BookDetail.this, edt_inputDay));
        }

    private void setRecyclerView() {
        if(isAuthorTabSelected) {
            openDialog.setText("+ Add Author");
            author_publisher_input.setHint("Authors");
            getAuthors();

            if(bookAuthorAdapter == null)
                setBookAuthorAdapter();
            recycler.setAdapter(bookAuthorAdapter);
        }
        else {
            openDialog.setText("+ Add Publisher");
            author_publisher_input.setHint("Publishers");
            getPublishers();

            if (bookPublisherAdapter == null)
                setBookPublisherAdapter();
            recycler.setAdapter(bookPublisherAdapter);
        }

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

            String[] bookAuthorId = new String[selectedAuthors.size()];
            for (int i = 0; i < bookAuthorId.length; i++) {
                bookAuthorId[i] = selectedAuthors.get(i).getValue();
            }
            bookRequestModel.setAuthors(bookAuthorId);

            String[] bookPublisherId = new String[selectedPublishers.size()];
            for (int i = 0; i < bookPublisherId.length; i++) {
                bookPublisherId[i] = selectedPublishers.get(i).getValue();
            }
            bookRequestModel.setPublishers(bookPublisherId);

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


    private void openDialog() {
        if (isAuthorTabSelected)
            addAuthor();
        else
            addPublisher();
    }

    private void addAuthor() {
        View authorFormDialogView = LayoutInflater.from(this).inflate(R.layout.fragment_author_edit_form, null);
        bindAuthorLayoutDialog(authorFormDialogView);

        dialog = new MaterialAlertDialogBuilder(this)
                .setView(authorFormDialogView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        Button submit_btn = authorFormDialogView.findViewById(R.id.add_author_submit);
        submit_btn.setOnClickListener(view -> {
            if(formValid)
                addAuthorSubmit();
        });

        formValid = false;
        formValidation(edt_authorName);
    }
    private void bindAuthorLayoutDialog(View authorFormDialog) {
        edt_authorName = authorFormDialog.findViewById(R.id.edt_authorName);
        edt_authorPhone = authorFormDialog.findViewById(R.id.edt_authorPhone);
        edt_authorEmail = authorFormDialog.findViewById(R.id.edt_authorEmail);
    }

    private void addPublisher() {
        View publisherFormDialogView = LayoutInflater.from(this).inflate(R.layout.fragment_publisher_edit_form, null);
        bindPublisherLayoutDialog(publisherFormDialogView);

        dialog = new MaterialAlertDialogBuilder(this)
                .setView(publisherFormDialogView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        Button submit_btn = publisherFormDialogView.findViewById(R.id.add_publisher_submit);
        submit_btn.setOnClickListener(view -> {
            if(formValid)
                addPublisherSubmit();
        });

        formValid = false;
        formValidation(edt_publisherName);
    }
    private void bindPublisherLayoutDialog(View publisherFormDialogView) {
        edt_publisherName = publisherFormDialogView.findViewById(R.id.edt_publisherName);
        edt_publisherPhone = publisherFormDialogView.findViewById(R.id.edt_publisherPhone);
        edt_publisherEmail = publisherFormDialogView.findViewById(R.id.edt_publisherEmail);
        edt_publisherAddress = publisherFormDialogView.findViewById(R.id.edt_publisherAddress);
    }

    private void formValidation(TextInputEditText currentInput) {
        View.OnFocusChangeListener onFocusChange = (view, b) -> {
            String name = Objects.requireNonNull(currentInput.getText()).toString();

            if(!b && name.equals("")) {
                currentInput.setError("Name must not be null!");
            }
            else {
                currentInput.setError(null);
                formValid = true;
            }
        };

        currentInput.setOnFocusChangeListener(onFocusChange);
    }

    private void addAuthorSubmit() {
        AuthorModel authorModel = new AuthorModel();
        authorModel.setName(Objects.requireNonNull(edt_authorName.getText()).toString());
        authorModel.setMail(Objects.requireNonNull(edt_authorEmail.getText()).toString());
        authorModel.setPhone(Objects.requireNonNull(edt_authorPhone.getText()).toString());

        JsonObject data = new ApiRequest().convertModelToJSONObject(authorModel);

        apiService.save(ControllerConst.AUTHORS, data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                AuthorModel authorModel = new ApiResponse<AuthorModel>().getResultFromResponse
                (
                    response,
                    new TypeToken<AuthorModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                );
                if(authorModel != null) {
                    bookAuthorAdapter.addItem(authorModel);
                    dialog.dismiss();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void addPublisherSubmit() {
        PublisherModel publisherModel = new PublisherModel();
        publisherModel.setName(Objects.requireNonNull(edt_publisherName.getText()).toString());
        publisherModel.setMail(Objects.requireNonNull(edt_publisherEmail.getText()).toString());
        publisherModel.setPhone(Objects.requireNonNull(edt_publisherPhone.getText()).toString());
        publisherModel.setAddress(Objects.requireNonNull(edt_publisherAddress.getText()).toString());

        JsonObject data = new ApiRequest().convertModelToJSONObject(publisherModel);

        apiService.save(ControllerConst.PUBLISHERS, data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                PublisherModel publisherModel = new ApiResponse<PublisherModel>().getResultFromResponse
                        (
                                response,
                                new TypeToken<PublisherModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                        );
                if(publisherModel != null) {
                    bookPublisherAdapter.addItem(publisherModel);
                    dialog.dismiss();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    @Override
    public void onCheckBoxChange(ArrayList<?> arrayList, Type type) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            if(type.getTypeName().equals(AuthorModel.class.getTypeName())) {
                ArrayList<AuthorModel> list = (ArrayList<AuthorModel>) arrayList;

                selectedAuthors = (ArrayList<SpinnerOption>) list.stream()
                        .map(i -> new SpinnerOption(i.getName(), i.getId()))
                        .collect(Collectors.toList());
            }
            else if(type.getTypeName().equals(PublisherModel.class.getTypeName())) {
                ArrayList<PublisherModel> list = (ArrayList<PublisherModel>) arrayList;

                selectedPublishers = (ArrayList<SpinnerOption>) list.stream()
                        .map(i -> new SpinnerOption(i.getName(), i.getId()))
                        .collect(Collectors.toList());
            }
        }
    }
}