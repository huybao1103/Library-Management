package com.example.librarydemo.Publisher;

import static android.widget.Toast.makeText;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.ConfirmDialog.IConfirmDialogEventListener;
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
import java.util.List;
import java.util.Objects;

import de.codecrafters.tableview.TableDataAdapter;
import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PublisherInformation extends AppCompatActivity implements IConfirmDialogEventListener {
    TableView table_view;
    ApiService apiService;
    PublisherAdapter publisherAdapter;
    boolean formValid = false;
    AlertDialog dialog;
    // Add publisher form
    TextInputEditText edt_publisherName, edt_publisherPhone, edt_publisherEmail, edt_publisherAddress;
    PublisherModel currentPublisher;
    boolean confirmed;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_publisher);

        assign();
        getPublishers();

        // Thêm sự kiện click vào nút "ADD" để thêm tác giả mới
        Button addButton = findViewById(R.id.add_publisher_btn);
        addButton.setOnClickListener(v -> addPublisher());
    }

    void assign() {
        apiService = RetrofitClient.getApiService(this);

        table_view = findViewById(R.id.table_view);
        String[] headers = {"Name", "Email", "Phone"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(this, headers));
    }
    private void getPublishers() {
        apiService.getAll(ControllerConst.PUBLISHERS).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                List<PublisherModel> publisherList = new ApiResponse<List<PublisherModel>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<List<PublisherModel>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(publisherList != null && publisherList.size() > 0) {
                    setPublisherAdapter(publisherList);

                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private void setPublisherAdapter(List<PublisherModel> publisherList) {
        publisherAdapter = new PublisherAdapter(PublisherInformation.this, publisherList);
        table_view = new TableListService(new String[]{"Name", "Email", "Phone"}, table_view, PublisherInformation.this).setColumnModel();

        table_view.setDataAdapter(new TableDataAdapter(getApplicationContext(), publisherList) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                PublisherModel publisher = (PublisherModel) getItem(rowIndex); // This gets the PublisherModel for the given row

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
                        textView.setText(publisher.getName()); // Assuming PublisherModel has a getName method
                        break;
                    case 1:
                        textView.setText(publisher.getMail()); // Assuming PublisherModel has a getBookTitle method
                        break;
                    case 2:
                        textView.setText(publisher.getPhone()); // Assuming PublisherModel has a getBookTitle method
                        break;
                    case 3:
                        return getMenuIcon(publisher.getId());
                    // Add more cases if you have more columns.
                    default:
                        throw new IllegalArgumentException("Invalid columnIndex: " + columnIndex);
                }

                return textView;
            }


        });
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

    private void bindPublisherLayoutDialog(View publisherFormDialog) {
        edt_publisherName = publisherFormDialog.findViewById(R.id.edt_publisherName);
        edt_publisherPhone = publisherFormDialog.findViewById(R.id.edt_publisherPhone);
        edt_publisherEmail = publisherFormDialog.findViewById(R.id.edt_publisherEmail);
        edt_publisherAddress = publisherFormDialog.findViewById(R.id.edt_publisherAddress);


        if(currentPublisher != null) {
            edt_publisherName.setText(currentPublisher.getName());
            edt_publisherPhone.setText(currentPublisher.getPhone());
            edt_publisherEmail.setText(currentPublisher.getMail());
            edt_publisherAddress.setText(currentPublisher.getAddress());
        }
    }

    private void addPublisherSubmit() {
        PublisherModel publisherModel = new PublisherModel();
        publisherModel.setName(Objects.requireNonNull(edt_publisherName.getText()).toString());
        publisherModel.setMail(Objects.requireNonNull(edt_publisherEmail.getText()).toString());
        publisherModel.setPhone(Objects.requireNonNull(edt_publisherPhone.getText()).toString());
        publisherModel.setAddress(Objects.requireNonNull(edt_publisherAddress.getText()).toString());
        publisherModel.setId(currentPublisher != null ? currentPublisher.getId() : null);

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
                    dialog.dismiss();
                    getPublishers();
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

    private void getPublisherById(String itemId) {
        apiService.getById(ControllerConst.PUBLISHERS, itemId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentPublisher = new ApiResponse<PublisherModel>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<PublisherModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(currentPublisher != null)
                    addPublisher();
                formValid = true;
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void deletePublisher(String itemId) {
        new ConfirmDialogService("Are you sure you want to delete this publisher?", PublisherInformation.this, this)
                .ShowConfirmDialog()
                .setOnDismissListener(dialogInterface -> {
                    if(confirmed)
                        deleteConfirmed(itemId);
                });
    }

    private void deleteConfirmed(String itemId) {
        apiService.delete(ControllerConst.PUBLISHERS, itemId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if(response.isSuccessful()) {
                    Toast.makeText(PublisherInformation.this, "Publisher deleted successfully", Toast.LENGTH_SHORT).show();
                    getPublishers();
                }
                else {
                    try {
                        Toast.makeText(PublisherInformation.this, response.errorBody().string(), Toast.LENGTH_SHORT).show();
                    } catch (IOException e) {
                        Toast.makeText(PublisherInformation.this, e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(PublisherInformation.this, t.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
    private FrameLayout getMenuIcon(String publisherId) {
        // Create an ImageView
        ImageView imageView = new ImageView(PublisherInformation.this);
        imageView.setImageResource(R.drawable.baseline_more_vert_24);
        imageView.setOnClickListener(v -> showPopupMenu(v, publisherId));

        // Create a FrameLayout and set its LayoutParams
        FrameLayout frameLayout = new FrameLayout(PublisherInformation.this);
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

    private void showPopupMenu(View v, String publisherId) {
        PopupMenu popup = new PopupMenu(PublisherInformation.this, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    getPublisherById(publisherId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    deletePublisher(publisherId);
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
