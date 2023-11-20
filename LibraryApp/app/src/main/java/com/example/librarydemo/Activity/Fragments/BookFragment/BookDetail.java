package com.example.librarydemo.Activity.Fragments.BookFragment;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageSwitcher;
import android.widget.ImageView;
import android.widget.MultiAutoCompleteTextView;
import android.widget.Toast;

import com.example.librarydemo.Activity.Fragments.BookFragment.BookAuthor.BookAuthorAdapter;
import com.example.librarydemo.Activity.Fragments.BookFragment.BookPublisher.BookPublisherAdapter;
import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.Models.Book.BookAuthor;
import com.example.librarydemo.Models.Book.BookCategories;
import com.example.librarydemo.Models.Book.BookImage;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.Book.BookPublisher;
import com.example.librarydemo.Models.Book.BookRequestModel;
import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.Models.UploadFile;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.Base64Service;
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


import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
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
    private static final int PICK_IMAGE = 2;
    private static final int PICK_IMAGE_REQUEST = 0;
    private static final int YOUR_REQUEST_CODE = 1;
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
    BookImage bookImages;
    EditText edt_bookName, edt_publishYear;
    Button submit_btn, openDialog, cancelimage;
    String bookId;
    TextInputLayout author_publisher_input;
    AlertDialog dialog;
    // Add author form
    TextInputEditText edt_authorName, edt_authorPhone, edt_authorEmail;

    // Add publisher form
    TextInputEditText edt_publisherName, edt_publisherPhone, edt_publisherEmail, edt_publisherAddress;
    ImageView selectedImageView;
    Button chooseImageButton;

    // Tab
    TabLayout author_publisher_tab;
    boolean isAuthorTabSelected = true;
    boolean formValid = false;
    private Base64Service base64Service;
    Button submitButton;
    private String base64Image;
    private boolean isImageSelected;
    private View cancelImageButton;
    BookRequestModel bookRequestModel;
    private String getimage;
    private ImageSwitcher sselectedImageView;

    private String imagePath;
    private ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);
        selectedImageView = findViewById(R.id.book_image_view);
        chooseImageButton = findViewById(R.id.choose_image_button);

        chooseImageButton.setOnClickListener(v -> {
            // Mở hộp thoại chọn ảnh
            Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            startActivityForResult(intent, PICK_IMAGE_REQUEST);
        });



        selectedImageView = findViewById(R.id.book_image_view);

        chooseImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Mở hộp thoại chọn ảnh
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
            }
        });

        cancelImageButton = findViewById(R.id.cancel_button);
        cancelImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isImageSelected) {
                    new AlertDialog.Builder(BookDetail.this)
                            .setTitle("CONFIRM")
                            .setMessage("Are you sure want to remove this photo?")
                            .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int which) {
                                    // Gỡ ảnh và đặt isImageSelected về false
                                    selectedImageView.setImageResource(0);
                                    isImageSelected = false;
                                }
                            })
                            .setNegativeButton("No", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int which) {
                                    // Đóng hộp thoại
                                    dialog.dismiss();
                                }
                            })
                            .show();
                }
            }
        });


        assign();
        getCategories();
        openDatePicker();
        setRecyclerView();

        // Lấy chuỗi Base64 từ Intent
//        String base64Image = getIntent().getStringExtra("base64Image");

        //Get image
//        int imageResource = R.drawable.avatar1;


//        ImageView selectedImageView = findViewById(R.id.book_image_view);
//
//        // lấy id ảnh
//        int imageResource = R.drawable.avatar1; // Thay thế "your_image" bằng tên tài nguyên hình ảnh thực tế
//
//        // Đặt ảnh vào ImageView
//        selectedImageView.setImageResource(imageResource);

        SharedPreferences sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        String savedBase64Image = sharedPreferences.getString("base64Image", "");





        // Kiểm tra xem chuỗi Base64 không phải là null hoặc trống
        if (base64Image != null && !base64Image.isEmpty()) {
            // Chuyển chuỗi Base64 trở lại thành một đối tượng Bitmap
            Bitmap imageBitmap = base64Service.convertBase64ToImage(base64Image);

            // Hiển thị đối tượng Bitmap trong một ImageView
            ImageView imageView = findViewById(R.id.imageView);
            imageView.setImageBitmap(imageBitmap);
        }
    }




    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null) {
            // Lấy đối tượng Uri của hình ảnh đã chọn
            Uri selectedImageUri = data.getData();
            base64Service = new Base64Service(this);


            // Chuyển đổi hình ảnh thành chuỗi Base64
            String base64Image = base64Service.convertImageToBase64(selectedImageUri);

            // Hiển thị đối tượng Bitmap trong ImageView
            Bitmap imageBitmap = base64Service.convertBase64ToImage(base64Image);
            selectedImageView.setImageBitmap(imageBitmap);

            // Lưu base64Image khi nhấn nút "submit"
            this.base64Image = base64Image;

            // Đánh dấu là đã chọn ảnh
            isImageSelected = true;

            // Save the base64Image to SharedPreferences
            SharedPreferences sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("base64Image", base64Image);
            editor.apply();


        }
    }


    private void assign() {
        apiService = RetrofitClient.getApiService(this);
        bookAuthorAdapter = new BookAuthorAdapter(this, new ArrayList<>(), this);
        bookPublisherAdapter = new BookPublisherAdapter(this, new ArrayList<>(), this);
        bookImages = new BookImage();

        author_publisher_input = findViewById(R.id.author_publisher_input);

        spn_author_publisher = findViewById(R.id.spn_author_publisher);
        spn_author_publisher.setEllipsize(TextUtils.TruncateAt.END);
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
        if(authors != null)
            bookAuthorAdapter = new BookAuthorAdapter(BookDetail.this, new ArrayList<>(Arrays.asList(authors)), this);
    }
    private void setBookPublisherAdapter() {
        if(publishers != null)
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

        if (TextUtils.isEmpty(bookName)) {
            edt_bookName.setError("Tên sách không được để trống");
        }

        if (TextUtils.isEmpty(inputDay)) {
            edt_inputDay.setError("Ngày nhập không được để trống");
        }

        if (TextUtils.isEmpty(publishYear)) {
            edt_publishYear.setError("Năm xuất bản không được để trống");
        }

        if (selectedCategories == null || selectedCategories.isEmpty()) {
            Toast.makeText(this, "Vui lòng chọn danh mục", Toast.LENGTH_SHORT).show();
        }

        if (selectedAuthors == null || selectedAuthors.isEmpty()) {
            Toast.makeText(this, "Vui lòng chọn tác giả", Toast.LENGTH_SHORT).show();
        }

        if (selectedPublishers == null || selectedPublishers.isEmpty()) {
            Toast.makeText(this, "Vui lòng chọn nhà xuất bản", Toast.LENGTH_SHORT).show();
        }

        // Kiểm tra nếu có bất kỳ lỗi nào được hiển thị, không thực hiện lưu
        if (TextUtils.isEmpty(bookName) || TextUtils.isEmpty(inputDay) || TextUtils.isEmpty(publishYear) || selectedCategories.isEmpty() || selectedAuthors.isEmpty() || selectedPublishers.isEmpty()) {
            Toast.makeText(this, "Vui lòng điền đầy đủ thông tin", Toast.LENGTH_SHORT).show();
            return;
        } else {
            // Tất cả dữ liệu đã được điền đầy đủ, tiến hành lưu
            BookRequestModel bookRequestModel = new BookRequestModel();
            bookRequestModel.setName(bookName);

            if (!inputDay.equals(""))
                bookRequestModel.setInputDay(new LocalDateTimeConvert().convertToISODateTime(inputDay));

            if (bookId != null && !bookId.equals("")) {
                bookRequestModel.setId(bookId);
            }
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

            bookRequestModel.setBase64Image(base64Image);
            if (base64Image != null && !base64Image.isEmpty()) {
                // lưu hình
                save(bookRequestModel);
            }

        }
    }



    private void save(BookRequestModel bookModel) {
        JsonObject data = new ApiRequest().convertModelToJSONObject(bookModel);
        // Thêm base64Image vào JsonObject

        if (base64Image != null && !base64Image.isEmpty()) {
            data.addProperty("base64Image", base64Image);
        }
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

//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//
//        if (resultCode == RESULT_OK) {
//            if (requestCode == PICK_IMAGE_REQUEST) {
//                if (data != null) {
//                    if (data.getData() != null) {
//                        Uri selectedImage = data.getData();
//
////                        try {
////                            // Đọc dữ liệu hình ảnh từ Uri
////                            InputStream inputStream = getContentResolver().openInputStream(selectedImage);
////                            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
////                            byte[] buffer = new byte[1024];
////                            int bytesRead;
////                            while ((bytesRead = inputStream.read(buffer)) != -1) {
////                                byteArrayOutputStream.write(buffer, 0, bytesRead);
////                            }
////                            byte[] imageBytes = byteArrayOutputStream.toByteArray();
////                            inputStream.close();
////                            byteArrayOutputStream.close();
////
////                            // Chuyển đổi dữ liệu hình ảnh thành chuỗi Base64
////                            String base64Image = Base64.encodeToString(imageBytes, Base64.DEFAULT);
////
////                            // Bây giờ bạn có thể sử dụng base64Image cho mục đích của mình
////                            // Ví dụ: hiển thị nó trên ImageView
////                            ImageView imageView = findViewById(R.id.imageView);
////                            byte[] decodedBytes = Base64.decode(base64Image, Base64.DEFAULT);
////                            Bitmap decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
////                            imageView.setImageBitmap(decodedBitmap);
////
////                        } catch (IOException e) {
////                            e.printStackTrace();
////                        }
//
//                        // Chọn hình
//                        Uri imageUri = data.getData();
//                        Base64Service base64Service = new Base64Service(getApplicationContext());
//
//                        // Lấy tên file của hình
//                        String fileName = base64Service.getFileName(imageUri);
//
//                        // Lấy base64
//                        String base64String = base64Service.convertImageToBase64(imageUri);
//
//                        // Set model
//                        UploadFile file = new UploadFile();
//                        file.setFileName(fileName);
//
//                        bookImages.setBase64(base64String);
//                        bookImages.setFile(file);
//                        bookImages.setBookId(bookId);
//
//                        displayImage(base64String);
//                    } else {
//                        // Xử lý trường hợp data.getData() trả về null
//                        Toast.makeText(this, "Không thể chọn hình ảnh.", Toast.LENGTH_SHORT).show();
//                    }
//                }
//            }
//        } else {
//            // Xử lý trường hợp người dùng không chọn hình ảnh
//            Toast.makeText(this, "Bạn không chọn hình ảnh.", Toast.LENGTH_SHORT).show();
//        }
//    }


    private String getRealPathFromURI(Uri contentUri) {
        String[] proj = { MediaStore.Images.Media.DATA };
        Cursor cursor = getContentResolver().query(contentUri, proj, null, null, null);

        if (cursor == null) {
            return null;
        }

        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String path = cursor.getString(column_index);
        cursor.close();

        return path;
    }

    private void displayImage(String base64String) {
        Bitmap decodedByte = new Base64Service(getApplicationContext()).convertBase64ToImage(base64String);

        ImageView imageView = findViewById(R.id.book_image_view);
        imageView.setImageBitmap(decodedByte);
    }
}


