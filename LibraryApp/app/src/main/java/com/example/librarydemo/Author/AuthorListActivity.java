package com.example.librarydemo.Author;

import static java.security.AccessController.getContext;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Models.AuthorModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.ConfirmDialog.IConfirmDialogEventListener;
import com.example.librarydemo.Services.Interface.TableList.ITableListEventListener;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.ConfirmDialogService;
import com.example.librarydemo.Services.Layout.TableListService;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import de.codecrafters.tableview.TableDataAdapter;
import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.model.TableColumnDpWidthModel;
import de.codecrafters.tableview.model.TableColumnModel;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthorListActivity extends AppCompatActivity implements IConfirmDialogEventListener {
    private ArrayList<String> ListAuthor;
    private ListView listView;

    TableView table_view;
    ApiService apiService;
    AuthorAdapter authorAdapter;
    boolean formValid = false;
    AlertDialog dialog;
    // Add author form
    TextInputEditText edt_authorName, edt_authorPhone, edt_authorEmail;
    AuthorModel currentAuthor;
    boolean confirmed;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_author_list2);

        assign();
        getAuthors();

        // Thêm sự kiện click vào nút "ADD" để thêm tác giả mới
        Button addButton = findViewById(R.id.buttonAddAuthor);
        addButton.setOnClickListener(v -> addAuthor());
    }

    void assign() {
        apiService = RetrofitClient.getApiService(this);

        table_view = findViewById(R.id.table_view);
        String[] headers = {"Name", "Email", "Phone"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(this, headers));
    }
    private void getAuthors() {
        apiService.getAll(ControllerConst.AUTHORS).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                List<AuthorModel> authorList = new ApiResponse<List<AuthorModel>>()
                .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                (
                    response,
                    new TypeToken<List<AuthorModel>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                );

                if(authorList != null && authorList.size() > 0) {
                    setAuthorAdapter(authorList);

                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private void setAuthorAdapter(List<AuthorModel> authorList) {
        authorAdapter = new AuthorAdapter(AuthorListActivity.this, authorList);
        table_view = new TableListService(new String[]{"Name", "Email", "Phone"}, table_view, AuthorListActivity.this).setColumnModel();

        table_view.setDataAdapter(new TableDataAdapter(getApplicationContext(), authorList) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                AuthorModel author = (AuthorModel) getItem(rowIndex); // This gets the AuthorModel for the given row

                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT, // Width
                        LinearLayout.LayoutParams.WRAP_CONTENT  // Height
                );
                TextView textView = new TextView(getApplicationContext());
                textView.setMaxLines(1); // Display text in a single line
                textView.setEllipsize(TextUtils.TruncateAt.END); // Add ellipsis at the end

                textView.setLayoutParams(layoutParams);

                switch (columnIndex) {
                    case 0:
                        textView.setText(author.getName()); // Assuming AuthorModel has a getName method
                        break;
                    case 1:
                        textView.setText(author.getMail()); // Assuming AuthorModel has a getBookTitle method
                        break;
                    case 2:
                        textView.setText(author.getPhone()); // Assuming AuthorModel has a getBookTitle method
                        break;
                    case 3:
                        return getMenuIcon(author.getId());
                    // Add more cases if you have more columns.
                    default:
                        throw new IllegalArgumentException("Invalid columnIndex: " + columnIndex);
                }

                return textView;
            }


        });
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

        if(currentAuthor != null) {
            edt_authorName.setText(currentAuthor.getName());
            edt_authorPhone.setText(currentAuthor.getPhone());
            edt_authorEmail.setText(currentAuthor.getMail());
        }

        CardView delete_btn_container = authorFormDialog.findViewById(R.id.delete_btn_container);
        delete_btn_container.setVisibility(View.VISIBLE);
    }

    private void addAuthorSubmit() {
        AuthorModel authorModel = new AuthorModel();
        authorModel.setName(Objects.requireNonNull(edt_authorName.getText()).toString());
        authorModel.setMail(Objects.requireNonNull(edt_authorEmail.getText()).toString());
        authorModel.setPhone(Objects.requireNonNull(edt_authorPhone.getText()).toString());
        authorModel.setId(currentAuthor != null ? currentAuthor.getId() : null);

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
                    dialog.dismiss();
                    getAuthors();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
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

    private void getAuthorById(String itemId) {
        apiService.getById(ControllerConst.AUTHORS, itemId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentAuthor = new ApiResponse<AuthorModel>()
                .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                (
                    response,
                    new TypeToken<AuthorModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                );

                if(currentAuthor != null)
                    addAuthor();
                formValid = true;
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void deleteAuthor(String itemId) {
        new ConfirmDialogService("Are you sure you want to delete this author?", AuthorListActivity.this, this)
            .ShowConfirmDialog()
            .setOnDismissListener(dialogInterface -> {
                if(confirmed)
                    deleteConfirmed(itemId);
            });
    }

    private void deleteConfirmed(String itemId) {
        apiService.delete(ControllerConst.AUTHORS, itemId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if(response.isSuccessful()) {
                    Toast.makeText(AuthorListActivity.this, "Author deleted successfully", Toast.LENGTH_SHORT).show();
                    getAuthors();
                }
                else {
                    try {
                        Toast.makeText(AuthorListActivity.this, response.errorBody().string(), Toast.LENGTH_SHORT).show();
                    } catch (IOException e) {
                        Toast.makeText(AuthorListActivity.this, e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(AuthorListActivity.this, t.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
    private FrameLayout getMenuIcon(String authorId) {
        // Create an ImageView
        ImageView imageView = new ImageView(AuthorListActivity.this);
        imageView.setImageResource(R.drawable.baseline_more_vert_24);
        imageView.setOnClickListener(v -> showPopupMenu(v, authorId));

        // Create a FrameLayout and set its LayoutParams
        FrameLayout frameLayout = new FrameLayout(AuthorListActivity.this);
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

    private void showPopupMenu(View v, String authorId) {
        PopupMenu popup = new PopupMenu(AuthorListActivity.this, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    getAuthorById(authorId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    deleteAuthor(authorId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }

    @Override
    public void onYesOrNoButtonClicked(boolean isConfirmed) {
        confirmed = isConfirmed;
    }
}
