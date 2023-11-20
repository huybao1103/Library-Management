package com.example.librarydemo.Activity.Fragments.LibraryCardFragment;

import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.example.librarydemo.Activity.Fragments.BookFragment.BookDetail;
import com.example.librarydemo.DBBook.Book;
import com.example.librarydemo.Enum.LibraryCardStatus;
import com.example.librarydemo.Models.LibraryCard.LibraryCard;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;
import com.example.librarydemo.Services.Interface.ConfirmDialog.IConfirmDialogEventListener;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.ConfirmDialogService;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.DatePickerService;
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

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link LibraryCardFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class LibraryCardFragment extends Fragment implements IAdapterEventListener, IConfirmDialogEventListener {
    private ListView lv;
    View view;
    public static ArrayList<Book> Book_Deefault;

    public static ArrayList<Book> getBook_Deefault() {
        return Book_Deefault;
    }
    private LibraryCardAdapter adapter;
    ApiService apiService; /* Khai báo để gọi API */

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    LibraryCard currentCard;
    AlertDialog dialog;
    TextInputEditText edt_studentName, student_Id, student_class, edt_inputDay;
    AutoCompleteTextView spn_status;
    int selectedCardStatus;
    boolean confirmed = false;

    private String mParam1;
    private String mParam2;

    public LibraryCardFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment LibraryCardFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static LibraryCardFragment newInstance(String param1, String param2) {
        LibraryCardFragment fragment = new LibraryCardFragment();
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
        apiService = RetrofitClient.getApiService(requireContext());

        View view = inflater.inflate(R.layout.fragment_library_card, container, false);

        lv= (ListView) view.findViewById(R.id.lv_card);

        getCard();

        Button add_card_btn = view.findViewById(R.id.add_card_btn);
        add_card_btn.setOnClickListener(v -> addCard());
        return view;
    }

    public void getCard(){

        apiService.getAll(ControllerConst.LIBRARYCARDS /* Tên controller */).enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                List<LibraryCard> libraryCardList = new ApiResponse<List<LibraryCard>>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<List<LibraryCard>  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(libraryCardList != null)
                    setAdapter(libraryCardList);
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {

            }
        });
    }

    private void setAdapter(List<LibraryCard> libraryCardList) {
        adapter = new LibraryCardAdapter(requireContext(), R.layout.library_card_list_item, libraryCardList, this);
        lv.setAdapter(adapter);
    }

    private void getCardById(String itemId) {
        apiService.getById(ControllerConst.LIBRARYCARDS, itemId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentCard = new ApiResponse<LibraryCard>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<LibraryCard  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                                );

                if(currentCard != null)
                    addCard();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void addCard() {
        View cardFormView = LayoutInflater.from(requireContext()).inflate(R.layout.library_card_form, null);
        bindCardLayoutDialog(cardFormView);

        dialog = new MaterialAlertDialogBuilder(requireContext())
                .setView(cardFormView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        Button submit_btn = cardFormView.findViewById(R.id.submit_btn);
        submit_btn.setOnClickListener(view -> {
//            if(formValid)
            addCardSubmit();
        });

//        formValid = false;
//        formValidation(edt_categoryName);
    }

    private void bindCardLayoutDialog(View cardFormView) {
        CustomSpinner customSpinner;
        ArrayList<SpinnerOption> chapterStatusList = new ArrayList<>();
        spn_status = cardFormView.findViewById(R.id.spn_status);

        edt_studentName = cardFormView.findViewById(R.id.edt_studentName);
        student_Id = cardFormView.findViewById(R.id.student_Id);
        student_class = cardFormView.findViewById(R.id.student_class);
        edt_inputDay = cardFormView.findViewById(R.id.edt_inputDay);
        edt_inputDay.setOnClickListener(v -> new DatePickerService().showDatePickerDialog(requireContext(), edt_inputDay));

        spn_status = cardFormView.findViewById(R.id.spn_status);

        if(currentCard != null) {
            edt_studentName.setText(currentCard.getName());
            student_Id.setText(currentCard.getStudentId());
            student_class.setText(currentCard.getStudentClass());
            edt_inputDay.setText(currentCard.getExpiryDate());
        }

        for (LibraryCardStatus status: LibraryCardStatus.values()) {
            SpinnerOption spinnerOption = new SpinnerOption(status.name(), status.getCode());

            chapterStatusList.add(spinnerOption);

            if(currentCard != null && status.getCode() == currentCard.getStatus())
                spn_status.setText(status.name());
        }
        customSpinner = new CustomSpinner(requireContext(), chapterStatusList);

        spn_status.setAdapter(customSpinner);

        spn_status.setOnItemClickListener((adapterView, view, i, l) -> {
            SpinnerOption selected = (SpinnerOption) adapterView.getItemAtPosition(i);

            selectedCardStatus = selected.getValueInt();
            spn_status.setText(selected.getLabel());
        });
    }

    private void addCardSubmit() {
        String studentName = Objects.requireNonNull(edt_studentName.getText()).toString();
        String studentId = Objects.requireNonNull(student_Id.getText()).toString();
        String studentClass = Objects.requireNonNull(student_class.getText()).toString();
        String selectedStatus = spn_status.getText().toString();

        if (studentName.isEmpty()) {
            Toast.makeText(requireContext(), "Vui lòng nhập tên học sinh", Toast.LENGTH_SHORT).show();
        } else if (studentId.isEmpty()) {
            Toast.makeText(requireContext(), "Vui lòng nhập mã học sinh", Toast.LENGTH_SHORT).show();
        } else if (studentClass.isEmpty()) {
            Toast.makeText(requireContext(), "Vui lòng nhập lớp học", Toast.LENGTH_SHORT).show();
        } else if (selectedStatus.isEmpty()) {
            Toast.makeText(requireContext(), "Vui lòng chọn trạng thái", Toast.LENGTH_SHORT).show();
        } else {
            // Tiếp tục thêm thẻ thư viện
            LibraryCard libraryCard = new LibraryCard();
            libraryCard.setName(studentName);
            libraryCard.setStudentId(studentId);
            libraryCard.setStudentClass(studentClass);
            libraryCard.setStatus(selectedCardStatus);
            libraryCard.setId(currentCard != null ? currentCard.getId() : null);

            JsonObject data = new ApiRequest().convertModelToJSONObject(libraryCard);

            apiService.save(ControllerConst.LIBRARYCARDS, data).enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                    LibraryCard newLibraryCard = new ApiResponse<LibraryCard>().getResultFromResponse(response, new TypeToken<LibraryCard>(){}.getType());
                    if (newLibraryCard != null) {
                        dialog.dismiss();
                        getCard();
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                    Toast.makeText(requireContext(), "Thêm thẻ thư viện thất bại", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }


    private void deleteCard(String itemId) {
        new ConfirmDialogService("Are you sure you want to delete this card?", requireContext(), this)
                .ShowConfirmDialog()
                .setOnDismissListener(dialogInterface -> {
                    if(confirmed)
                        deleteConfirmed(itemId);
                });
    }

    private void deleteConfirmed(String itemId) {
        apiService.delete(ControllerConst.LIBRARYCARDS, itemId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if(response.isSuccessful()) {
                    Toast.makeText(requireContext(), "Chapter deleted successfully", Toast.LENGTH_SHORT).show();
                    getCard();
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
    public void onItemNameClicked(String itemId) {
        FragmentManager fragmentManager = getParentFragmentManager();
        fragmentManager.beginTransaction().replace(R.id.fragment_container, new BorrowHistoryFragment(itemId)).commit();
    }

    @Override
    public void onEditButtonClicked(String itemId) {
        getCardById(itemId);
    }

    @Override
    public void onDeleteButtonClicked(String itemId) {
        deleteCard(itemId);
    }

    @Override
    public void onYesOrNoButtonClicked(boolean isConfirmed) {
        confirmed = true;
    }
}