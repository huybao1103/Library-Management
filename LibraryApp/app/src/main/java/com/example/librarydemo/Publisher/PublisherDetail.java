package com.example.librarydemo.Publisher;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PublisherDetail extends AppCompatActivity {

    private ApiService apiService;
    private TextView detailPubName, detailPubPhone, detailPubGmail, detailPubAddress;
    private ImageView detailPubImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_publisher_detail);


        //button back
        Button backButton = findViewById(R.id.buttonCancel);
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Xử lý sự kiện click nút "BACK"
                // Tạo Intent để chuyển từ PublisherDetail Activity sang ListPublisher Activity
                Intent intent = new Intent(PublisherDetail.this, PublisherInformation.class);
                startActivity(intent);
            }
        });

        // Khởi tạo ApiService
        apiService = RetrofitClient.getApiService(this);

        // Gắn ID của các thành phần trong layout XML vào biến tương ứng
        detailPubName = findViewById(R.id.detailPubName);
        detailPubPhone = findViewById(R.id.detailPubPhone);
        detailPubGmail = findViewById(R.id.detailPubGmail);
        detailPubAddress = findViewById(R.id.detailPubAddress);
        detailPubImage = findViewById(R.id.detailPubImage);

        // Kiểm tra xem Intent có chứa ID của nhà xuất bản không
        if (getIntent().getExtras() != null) {
            String publisherId = getIntent().getExtras().getString("publisherId");

            if (publisherId != null && !publisherId.isEmpty()) {
                // Gọi hàm để lấy thông tin chi tiết của nhà xuất bản dựa trên ID
                getPublisherDetails(publisherId);
            }
        }
    }

    private void getPublisherDetails(String publisherId) {
        // Gọi API để lấy thông tin chi tiết của nhà xuất bản
        apiService.getById(ControllerConst.PUBLISHERS, publisherId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                // Xử lý dữ liệu từ API và hiển thị lên giao diện
                PublisherModel publisher = new ApiResponse<PublisherModel>()
                        .getResultFromResponse(response, new TypeToken<PublisherModel>(){}.getType());

                if (publisher != null) {
                   detailPubName.setText(publisher.getName());
                    detailPubAddress.setText(publisher.getAddress());
                    detailPubPhone.setText(publisher.getPhone());
                    detailPubGmail.setText(publisher.getEmail());
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }
}

