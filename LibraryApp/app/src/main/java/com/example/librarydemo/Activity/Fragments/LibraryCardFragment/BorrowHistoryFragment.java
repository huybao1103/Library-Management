package com.example.librarydemo.Activity.Fragments.LibraryCardFragment;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Enum.BorrowHistoryStatus;
import com.example.librarydemo.Enum.LibraryCardStatus;
import com.example.librarydemo.Models.CategoryModel;
import com.example.librarydemo.Models.LibraryCard.BorrowHistory;
import com.example.librarydemo.Models.LibraryCard.LibraryCard;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.DatePickerService;
import com.example.librarydemo.Services.LocalDateTimeConvert;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link BorrowHistoryFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class BorrowHistoryFragment extends Fragment implements IAdapterEventListener {
    View view;
    ApiService apiService;
    String cardId;
    ListView lv_card;
    LibraryCard currentCard;
    BorrowHistoryAdapter adapter;
    AlertDialog dialog;
    private ArrayList<SpinnerOption> chapterStatusList = new ArrayList<>();
    BorrowHistory currentRecord;
    LocalDateTimeConvert localDateTimeConvert;
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    private String mParam1;
    private String mParam2;

    public BorrowHistoryFragment() {
        // Required empty public constructor
    }
    public BorrowHistoryFragment(String cardId) {
        this.cardId = cardId;
    }
    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment BorrowHistoryFragment.
     */
    public static BorrowHistoryFragment newInstance(String param1, String param2) {
        BorrowHistoryFragment fragment = new BorrowHistoryFragment();
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
        view = inflater.inflate(R.layout.fragment_borrow_history, container, false);

        assign();
        getLibraryCardById();

        Button addButton = view.findViewById(R.id.add_record_btn);
        addButton.setOnClickListener(v -> addRecord());

        return view;
    }

    @Override
    public void onResume() {
        super.onResume();

        getLibraryCardById();
    }

    private void addRecord() {
        Intent intent = new Intent(requireContext(), NewRecordDetail.class);
        intent.putExtra("cardId", cardId);
        startActivity(intent);
    }

    private void assign() {
        apiService = RetrofitClient.getApiService(requireContext());

        lv_card = view.findViewById(R.id.lv_card);
        localDateTimeConvert = new LocalDateTimeConvert();
    }

    private void getLibraryCardById() {
        apiService.getById(ControllerConst.LIBRARYCARDS, cardId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentCard = new ApiResponse<LibraryCard>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<LibraryCard  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );

                if(currentCard != null && currentCard.getBorrowHistories() != null) {
                    bindValue();
                    setAdapter(Arrays.asList(currentCard.getBorrowHistories()));
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void bindValue() {
        TextView student_name = view.findViewById(R.id.student_name);
        TextView student_Id = view.findViewById(R.id.student_Id);
        TextView expiry_date = view.findViewById(R.id.expiry_date);
        TextView status = view.findViewById(R.id.status);
        ImageView imgsach = (ImageView) view.findViewById(R.id.img_hinh);

        student_name.setText(currentCard.getName());

        student_Id.setText(currentCard.getStudentId() + " - " + currentCard.getStudentClass());

        status.setText(LibraryCardStatus.fromCode(currentCard.getStatus()).name());

        if(currentCard.getExpiryDate() != null)
            expiry_date.setText(new LocalDateTimeConvert().convertDate(currentCard.getExpiryDate()));

        if (currentCard.getStudentImages().length > 0) {
            Bitmap decodedByte = new Base64Service(requireContext()).convertBase64ToImage(currentCard.getStudentImages()[0].getBase64());
            imgsach.setImageBitmap(decodedByte);
        }
    }

    private void setAdapter(List<BorrowHistory> borrowHistoryList) {
        adapter = new BorrowHistoryAdapter(requireContext(), R.layout.history_record_list_item, borrowHistoryList, this);
        lv_card.setAdapter(adapter);
    }

    @Override
    public void onItemNameClicked(String itemId) {

    }

    @Override
    public void onEditButtonClicked(String itemId) {
        getHistoryRecordById(itemId);
    }

    private void getHistoryRecordById(String itemId) {
        apiService.getById(ControllerConst.BORROWHISTORIES, itemId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                currentRecord = new ApiResponse<BorrowHistory>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<BorrowHistory  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );

                if(currentRecord != null) {
                    openBorrowHistoryForm();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {}
        });
    }

    private void openBorrowHistoryForm()
    {
        View recordFormDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.borrow_history_info_form, null);
        bindLayoutDialog(recordFormDialogView);

        dialog = new MaterialAlertDialogBuilder(requireContext())
                .setView(recordFormDialogView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        Button submit_btn = recordFormDialogView.findViewById(R.id.edit_record_submit);
        submit_btn.setOnClickListener(view -> {
//            if(formValid)
                editRecordSubmit();
        });
    }

    private void bindLayoutDialog(View formDialog) {
        AutoCompleteTextView spn_status = formDialog.findViewById(R.id.spn_status);

        TextInputEditText edt_borrowDate = formDialog.findViewById(R.id.edt_borrowDate);
        TextInputEditText edt_endDay = formDialog.findViewById(R.id.edt_endDate);

        edt_borrowDate.setOnClickListener(v -> {
            new DatePickerService().showDatePickerDialog(requireContext(), edt_borrowDate);
            currentRecord.setBorrowDate(edt_borrowDate.getText().toString());
        });
        edt_endDay.setOnClickListener(v -> {
            new DatePickerService().showDatePickerDialog(requireContext(), edt_endDay);
            currentRecord.setEndDate(edt_endDay.getText().toString());
        });

        for (BorrowHistoryStatus status: BorrowHistoryStatus.values()) {
            SpinnerOption spinnerOption = new SpinnerOption(status.name(), status.getCode());

            chapterStatusList.add(spinnerOption);
            if(currentRecord != null && status.getCode() == currentRecord.getStatus())
                spn_status.setText(status.name());
        }
        CustomSpinner customSpinner = new CustomSpinner(requireContext(), chapterStatusList);

        spn_status.setAdapter(customSpinner);

        spn_status.setOnItemClickListener((adapterView, view, i, l) -> {
            SpinnerOption option = (SpinnerOption) adapterView.getItemAtPosition(i);
            currentRecord.setStatus(option.getValueInt());
        });

        if(currentRecord != null) {
            edt_borrowDate.setText(localDateTimeConvert.convertDate(currentRecord.getBorrowDate()));
            edt_endDay.setText(localDateTimeConvert.convertDate(currentRecord.getEndDate()));
        }
    }

    private void editRecordSubmit() {
        currentRecord.setBorrowDate(localDateTimeConvert.convertToISODateTime(currentRecord.getBorrowDate()));
        currentRecord.setEndDate(localDateTimeConvert.convertToISODateTime(currentRecord.getEndDate()));

        JsonObject data = new ApiRequest().convertModelToJSONObject(currentRecord);

        apiService.saveAllWithCustomUrl(ControllerConst.BORROWHISTORIES, "edit-history-info", data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                if(response.isSuccessful()) {
                    dialog.dismiss();
                    getLibraryCardById();
                }
                else {
                    Toast.makeText(requireContext(), Objects.requireNonNull(response.errorBody()).toString(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }
    @Override
    public void onDeleteButtonClicked(String itemId) {}
}