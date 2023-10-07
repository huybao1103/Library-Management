package com.example.librarydemo.Publisher;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.librarydemo.Models.PublisherModel;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.RetrofitClient;
import com.example.librarydemo.R;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ListPublisher extends AppCompatActivity {

    private ListView listView;
    private AddPublisher adapter;
    private List<PublisherModel> publisherList;
    private TextView PublisherName, PublisherPhone, PublisherMail, PublisherAddress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_publisher);


        listView = findViewById(R.id.listView);
        Button addButton = findViewById(R.id.buttonAddPub);

        //  tạo danh sách nhà xuất bản và adapter
        publisherList = new ArrayList<>();

        listView.setAdapter((ListAdapter) adapter);

        //nút add
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListPublisher.this, AddPublisher.class);
                startActivity(intent);
            }
        });

        if (getIntent().getExtras() != null) {
            String publisherName = getIntent().getStringExtra("publisherName");
            String publisherPhone = getIntent().getStringExtra("publisherPhone");
            String publisherMail = getIntent().getStringExtra("publisherMail");
            String publisherAddress = getIntent().getStringExtra("publisherAddress");

            if (publisherName != null && !publisherName.isEmpty()) {
                // Hiển thị thông tin Publisher lên giao diện
                // Ví dụ:
                PublisherName.setText("Publisher Name: " + publisherName);
                PublisherPhone.setText("Publisher Phone: " + publisherPhone);
                PublisherMail.setText("Publisher Mail: " + publisherMail);
                PublisherAddress.setText("Publisher Address: " + publisherAddress);
            }
        }

        // tạo click cho mỗi mục trong danh sách
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Chuyển sang Activity để chỉnh sửa Publisher (EditPublisher)
                Intent intent = new Intent(ListPublisher.this, EditPublisher.class);
                startActivity(intent);
            }
        });

        // Cập nhật danh sách nhà xuất bản từ API
        updatePublisherListFromApi();
    }

    private void updatePublisherListFromApi() {
        ApiService apiService = RetrofitClient.getApiService(this);

        // Gọi API để lấy danh sách nhà xuất bản
        Call<JsonArray> call = apiService.getAll("publishers");
        call.enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                if (response.isSuccessful()) {
                    // Xử lý dữ liệu từ API
                    List<PublisherModel> newPublisherList = new ArrayList<>();
                    JsonArray jsonArray = response.body();

                    for (JsonElement jsonElement : jsonArray) {
                        JsonObject jsonObject = jsonElement.getAsJsonObject();

                        PublisherModel publisher = new PublisherModel();
                        publisher.setId(String.valueOf(jsonObject.get("id").getAsInt()));
                        publisher.setName(jsonObject.get("name").getAsString());
                        publisher.setPhone(jsonObject.get("phone").getAsString());
                        publisher.setMail(jsonObject.get("mail").getAsString());
                        publisher.setAddress(jsonObject.get("address").getAsString());

                        newPublisherList.add(publisher);
                    }

                    // Cập nhật danh sách nhà xuất bản và adapter
                    publisherList.clear();
                    publisherList.addAll(newPublisherList);
                    adapter.notifyDataSetChanged();
                } else {
                    // Xử lý lỗi nếu cần
                    Toast.makeText(ListPublisher.this, "Lỗi khi lấy danh sách nhà xuất bản từ API", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {
                // Xử lý lỗi kết nối nếu cần
                Toast.makeText(ListPublisher.this, "Lỗi kết nối đến API", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
