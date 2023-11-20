package com.example.librarydemo.Activity.Fragments.AuthorFragment;

import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

import android.provider.ContactsContract;
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

import com.example.librarydemo.Author.AuthorAdapter;
import com.example.librarydemo.Author.AuthorListActivity;
import com.example.librarydemo.Models.AuthorModel;
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
 * Use the {@link AuthorFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AuthorFragment extends Fragment implements IConfirmDialogEventListener {
    View view;
    TableView table_view;
    ApiService apiService;
    AuthorAdapter authorAdapter;
    boolean formValid = false;
    AlertDialog dialog;
    // Add author form
    TextInputEditText edt_authorName, edt_authorPhone, edt_authorEmail;
    AuthorModel currentAuthor;
    boolean confirmed;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;


    public AuthorFragment() {
        // Required empty public constructor
    }

    public static AuthorFragment newInstance(String param1, String param2) {
        AuthorFragment fragment = new AuthorFragment();
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
        view = inflater.inflate(R.layout.fragment_author, container, false);
        assign();
        getAuthors();

        // Thêm sự kiện click vào nút "ADD" để thêm tác giả mới
        Button addButton = view.findViewById(R.id.buttonAddAuthor);
        addButton.setOnClickListener(v -> addAuthor());

        return view;
    }

    void assign() {
        apiService = RetrofitClient.getApiService(requireContext());

        table_view = view.findViewById(R.id.table_view);
        String[] headers = {"Name", "Email", "Phone"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(requireContext(), headers));
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
        authorAdapter = new AuthorAdapter(requireContext(), authorList);
        table_view = new TableListService(new String[]{"Name", "Email", "Phone"}, table_view, (AppCompatActivity) requireActivity()).setColumnModel();

        table_view.setDataAdapter(new TableDataAdapter(requireContext(), authorList) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                AuthorModel author = (AuthorModel) getItem(rowIndex); // This gets the AuthorModel for the given row

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
        View authorFormDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.fragment_author_edit_form, null);
        bindAuthorLayoutDialog(authorFormDialogView);

        dialog = new MaterialAlertDialogBuilder(requireContext())
                .setView(authorFormDialogView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//       alertDialog.on
        dialog.show();

        Button submit_btn = authorFormDialogView.findViewById(R.id.add_author_submit);
        submit_btn.setOnClickListener(view -> {
            if(formValid)
                addAuthorSubmit();
        });

        formValid = false;
        formValidation(edt_authorName);

        formAuthorEmail(edt_authorEmail);

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
                currentInput.setError("Phone must not be null!");
            }
            else {
                currentInput.setError(null);
                formValid = true;
            }
        };

        currentInput.setOnFocusChangeListener(onFocusChange);
    }

    private void formAuthorEmail(TextInputEditText currentInput) {
        View.OnFocusChangeListener onFocusChange = (view, b) -> {
            String mail= Objects.requireNonNull(currentInput.getText()).toString();

            if(!b && mail.equals("")) {
                currentInput.setError("Email number must not be null!");
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
        new ConfirmDialogService("Are you sure you want to delete this author?", requireActivity(), this)
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
                    Toast.makeText(requireContext(), "Author deleted successfully", Toast.LENGTH_SHORT).show();
                    getAuthors();
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
    private FrameLayout getMenuIcon(String authorId) {
        // Create an ImageView
        ImageView imageView = new ImageView(requireContext());
        imageView.setImageResource(R.drawable.baseline_more_vert_24);
        imageView.setOnClickListener(v -> showPopupMenu(v, authorId));

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

    private void showPopupMenu(View v, String authorId) {
        PopupMenu popup = new PopupMenu(requireContext(), v);
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