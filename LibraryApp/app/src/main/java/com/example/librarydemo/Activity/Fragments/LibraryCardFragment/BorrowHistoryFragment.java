package com.example.librarydemo.Activity.Fragments.LibraryCardFragment;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Activity.Fragments.BookFragment.BookDetail;
import com.example.librarydemo.Enum.LibraryCardStatus;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.LibraryCard.BorrowHistory;
import com.example.librarydemo.Models.LibraryCard.LibraryCard;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.AdapterEvent.IAdapterEventListener;
import com.example.librarydemo.Services.LocalDateTimeConvert;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    }

    @Override
    public void onDeleteButtonClicked(String itemId) {

    }
}