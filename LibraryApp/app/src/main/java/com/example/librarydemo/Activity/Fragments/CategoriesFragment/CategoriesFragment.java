package com.example.librarydemo.Activity.Fragments.CategoriesFragment;

import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

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

import com.example.librarydemo.Models.CategoryModel;
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

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link CategoriesFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class CategoriesFragment extends Fragment implements IConfirmDialogEventListener {
    View view;
    TableView table_view;
    ApiService apiService;
    boolean formValid = false;
    AlertDialog dialog;

    // Add publisher form
    TextInputEditText edt_categoryName, edt_categoryDes;
    CategoryModel currentCategory;
    boolean confirmed;


    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public CategoriesFragment() {
        // Required empty public constructor
    }

    public static CategoriesFragment newInstance(String param1, String param2) {
        CategoriesFragment fragment = new CategoriesFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_categories, container, false);

        assign();
        getPublishers();

        // Thêm sự kiện click vào nút "ADD" để thêm tác giả mới
        Button addButton = view.findViewById(R.id.add_category_btn);
        addButton.setOnClickListener(v -> addCategory());

        return view;
    }

    void assign() {
        apiService = RetrofitClient.getApiService(requireContext());

        table_view = view.findViewById(R.id.table_view);
        String[] headers = {"Name", "Description"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(requireContext(), headers));
    }

    private void getPublishers() {
        apiService.getAll(ControllerConst.CATEGORIES).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                List<CategoryModel> categoryList = new ApiResponse<List<CategoryModel>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<List<CategoryModel>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(categoryList != null && categoryList.size() > 0) {
                    setPublisherAdapter(categoryList);

                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private void setPublisherAdapter(List<CategoryModel> publisherList) {
        table_view = new TableListService(new String[]{"Name", "Description"}, table_view, (AppCompatActivity) requireActivity()).setColumnModel();
        table_view.setDataAdapter(new TableDataAdapter(requireContext(), publisherList) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                CategoryModel category = (CategoryModel) getItem(rowIndex); // This gets the CategoryModel for the given row

                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT, // Width
                        LinearLayout.LayoutParams.WRAP_CONTENT  // Height
                );
                TextView textView = new TextView(requireContext());
                textView.setMaxLines(1); // Display text in a single line
                textView.setEllipsize(TextUtils.TruncateAt.END); // Add ellipsis at the end

                textView.setLayoutParams(layoutParams);

                switch (columnIndex) {
                    case 0:
                        textView.setText(category.getName());
                        break;
                    case 1:
                        textView.setText(category.getDescription());
                        break;
                    case 2:
                        return getMenuIcon(category.getId());
                    // Add more cases if you have more columns.
                    default:
                        throw new IllegalArgumentException("Invalid columnIndex: " + columnIndex);
                }

                return textView;
            }
        });
    }

    private FrameLayout getMenuIcon(String categoryId) {
        // Create an ImageView
        ImageView imageView = new ImageView(requireContext());
        imageView.setImageResource(R.drawable.baseline_more_vert_24);
        imageView.setOnClickListener(v -> showPopupMenu(v, categoryId));

        // Create a FrameLayout and set its LayoutParams
        FrameLayout frameLayout = new FrameLayout(requireContext());
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
    private void showPopupMenu(View v, String categoryId) {
        PopupMenu popup = new PopupMenu(requireContext(), v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    getCategoryById(categoryId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    deleteCategory(categoryId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }

    private void getCategoryById(String itemId) {
        apiService.getById(ControllerConst.CATEGORIES, itemId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentCategory = new ApiResponse<CategoryModel>()
                .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                (
                    response,
                    new TypeToken<CategoryModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                );

                if(currentCategory != null)
                    addCategory();
                formValid = true;
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void addCategory() {
        View publisherFormDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.category_info_form, null);
        bindCategoryLayoutDialog(publisherFormDialogView);

        dialog = new MaterialAlertDialogBuilder(requireContext())
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
                addCategorySubmit();
        });

        formValid = false;
        formValidation(edt_categoryName);
    }

    private void bindCategoryLayoutDialog(View publisherFormDialog) {
        edt_categoryName = publisherFormDialog.findViewById(R.id.edt_categoryName);
        edt_categoryDes = publisherFormDialog.findViewById(R.id.edt_categoryDes);

        if(currentCategory != null) {
            edt_categoryName.setText(currentCategory.getName());
            edt_categoryDes.setText(currentCategory.getDescription());
        }
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

    private void addCategorySubmit() {
        CategoryModel categoryModelModel = new CategoryModel();
        categoryModelModel.setName(Objects.requireNonNull(edt_categoryName.getText()).toString());
        categoryModelModel.setDescription(Objects.requireNonNull(edt_categoryDes.getText()).toString());
        categoryModelModel.setId(currentCategory != null ? currentCategory.getId() : null);

        JsonObject data = new ApiRequest().convertModelToJSONObject(categoryModelModel);

        apiService.save(ControllerConst.CATEGORIES, data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                CategoryModel publisherModel = new ApiResponse<CategoryModel>().getResultFromResponse
                (
                    response,
                    new TypeToken<CategoryModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
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

    private void deleteCategory(String itemId) {
        new ConfirmDialogService("Are you sure you want to delete this category?", requireContext(), this)
                .ShowConfirmDialog()
                .setOnDismissListener(dialogInterface -> {
                    if(confirmed)
                        deleteConfirmed(itemId);
                });
    }

    private void deleteConfirmed(String itemId) {
        apiService.delete(ControllerConst.CATEGORIES, itemId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if(response.isSuccessful()) {
                    Toast.makeText(requireContext(), "Category deleted successfully", Toast.LENGTH_SHORT).show();
                    getPublishers();
                }
                else {
                    try {
                        Toast.makeText(requireContext(), response.errorBody().string(), Toast.LENGTH_SHORT).show();
                    } catch (IOException e) {
                        Toast.makeText(requireContext(), e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(requireContext(), t.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onYesOrNoButtonClicked(boolean isConfirmed) {
        confirmed = isConfirmed;
    }
}