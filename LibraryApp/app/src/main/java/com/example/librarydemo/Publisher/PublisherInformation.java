    package com.example.librarydemo.Publisher;

    import static android.widget.Toast.makeText;
    import static com.example.librarydemo.R.id.editTextPublisherName;
    import static com.example.librarydemo.R.id.editTextPublisherPhone_edit;

    import android.annotation.SuppressLint;
    import android.content.DialogInterface;
    import android.content.Intent;
    import android.os.Bundle;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.Button;
    import android.widget.CheckBox;
    import android.widget.CompoundButton;
    import android.widget.EditText;
    import android.widget.ImageView;
    import android.widget.ListView;
    import android.widget.TextView;
    import android.widget.Toast;

    import androidx.appcompat.app.AlertDialog;
    import androidx.appcompat.app.AppCompatActivity;

    import com.example.librarydemo.R;

    import org.w3c.dom.Text;

    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.List;

    public class PublisherInformation extends AppCompatActivity {

        private ArrayList<String> publisherList;
        private ArrayAdapter<String> publisherAdapter;
        private ListView listView;
        private EditText editTextPublisherName;
        private EditText editTextPublisherPhone;
        private EditText editTextPublisherMail;
        private EditText editTextPublisherAddress;
        private int selectedPublisherPosition = -1;
        private CheckBox checkBox;
        private CheckBox checkBoxAll;
//        private List<String> publishersToRemove = new ArrayList<>();
        private Collection<?> publishersToRemove = new ArrayList<>();
        private ImageView PubImage, deleteAllButton;
        private EditText edSearch;






        @SuppressLint("MissingInflatedId")
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_list_publisher);

            // Khởi tạo danh sách nhà xuất bản và adapter cho ListView
            publisherList = new ArrayList<>();
    //        publisherAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, publisherList);
            listView = findViewById(R.id.listView);
            listView.setAdapter(publisherAdapter);
            checkBoxAll = findViewById(R.id.checkBoxAll);
            checkBox = findViewById(R.id.checkBox);
//            EditText edSearch = findViewById(R.id.edSearch);
            publishersToRemove = new ArrayList<>();





            //        // Khởi tạo các trường EditText
    //        editTextPublisherName = findViewById(R.id.editTextPublisherName_edit);
    //        editTextPublisherPhone = findViewById(R.id.editTextPublisherPhone_edit);
    //        editTextPublisherMail = findViewById(R.id.editTextPublisherMail_edit);
    //        editTextPublisherAddress = findViewById(R.id.editTextPublisherAddress_edit);

    //        // Thêm sự kiện click vào ListView để chọn một nhà xuất bản
    //        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    //            @Override
    //            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
    //                selectedPublisherPosition = position;
    //                String selectedPublisher = publisherList.get(position);
    //                // Hiển thị thông tin nhà xuất bản trong các trường EditText
    //                displayPublisherInfo(selectedPublisher);
    //            }
    //        });

            // Thêm sự kiện click vào nút "ADD" để thêm nhà xuất bản mới

            Button addButton = findViewById(R.id.buttonAddPub);
            addButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Chuyển tới activity_add_publisher khi ấn vào button "ADD"
                    Intent intent = new Intent(PublisherInformation.this, AddPublisher.class);
                    startActivity(intent);
                }
            });

            PubImage = findViewById(R.id.PubImage);

            PubImage.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Create an Intent to navigate to the PublisherDetail activity
                    Intent intent = new Intent(PublisherInformation.this, PublisherDetail.class);
                    startActivity(intent);
                }
            });


            // Thêm sự kiện click vào nút "SAVE" để lưu thông tin nhà xuất bản đã chỉnh sửa
            ImageView editButton = findViewById(R.id.ButtonEdit);
            editButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(PublisherInformation.this, EditPublisher.class);
                    startActivity(intent);
                }
            });

            // Thêm sự kiện click vào nút "CANCEL" để hủy chỉnh sửa thông tin nhà xuất bản
    //        Button cancelButton = findViewById(R.id.buttonCancel);
    //        cancelButton.setOnClickListener(new View.OnClickListener() {
    //            @Override
    //            public void onClick(View v) {
    //                Intent intent = new Intent(PublisherInformation.this, ListPublisher.class); // Thay thế "ListPublisherActivity" bằng tên của hoạt động bạn muốn chuyển đến
    //                startActivity(intent);
    //            }
    //        });

            // Thêm sự kiện click vào nút "DELETE" để xóa nhà xuất bản
            ImageView deleteButton = findViewById(R.id.ButtonDelete);
            deleteButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    deletePublisher();
                }
            });

            //bấm search tìm ds NXB
            edSearch = findViewById(R.id.edSearch);
            edSearch.setOnFocusChangeListener(new View.OnFocusChangeListener() {
                @Override
                public void onFocusChange(View v, boolean hasFocus) {
                    if (hasFocus) {
                        // Khi EditText được focus, xóa văn bản "Search"
                        edSearch.setText("");
                    } else {
                        // Khi EditText không còn focus và rỗng, đặt lại văn bản "Search"
                        if (edSearch.getText().toString().trim().isEmpty()) {
                            edSearch.setText("Search");
                        }
                    }
                }
            });




            checkBoxAll.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    // Khi checkBoxAll thay đổi trạng thái, đặt trạng thái cho checkBox
                    checkBox.setChecked(isChecked);
                }
            });

            // Xử lý sự kiện khi checkBox thay đổi trạng thái
            checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    // Xử lý tương ứng với trạng thái của checkBox
                    if (isChecked) {
                        // CheckBox được chọn
                        makeText(PublisherInformation.this, "CheckBox is checked", Toast.LENGTH_SHORT).show();
                    } else {
                        // CheckBox không được chọn
                        makeText(PublisherInformation.this, "CheckBox is unchecked", Toast.LENGTH_SHORT).show();
                    }
                }
            });

            // Khai báo một nút hoặc ImageView (icon delete all)
            deleteAllButton = findViewById(R.id.ButtonDeleteAll);
            deleteAllButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    deleteSelectedPublishers();
                }

                private void deleteSelectedPublishers() {

                    // Kiểm tra xem danh sách nhà xuất bản đã được chọn chua
                    if (publishersToRemove.isEmpty()) {
                        makeText(this, "No publishers selected for deletion", Toast.LENGTH_SHORT).show();
                        return; // Không có gì để xóa
                    }

                    // Tạo một hộp thoại xác nhận trước khi xóa
                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(PublisherInformation.this);

                    alertDialogBuilder.setTitle("Confirm Deletion");
                    alertDialogBuilder.setMessage("Are you sure you want to delete all selected publishers?");
                    alertDialogBuilder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // Xóa các nhà xuất bản đã chọn khỏi danh sách
                            publisherList.removeAll(publishersToRemove);
                            publisherAdapter.notifyDataSetChanged();

                            // Xóa trạng thái của CheckBox sau khi xóa
                            checkBox.setChecked(false);

                            makeText((View.OnClickListener) PublisherInformation.this, "All selected publishers deleted", Toast.LENGTH_SHORT).show();

                        }
                    });
                    alertDialogBuilder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // Đóng hộp thoại nếu người dùng không muốn xóa
                            dialog.dismiss();
                        }
                    });

                    // Hiển thị hộp thoại xác nhận
                    AlertDialog alertDialog = alertDialogBuilder.create();
                    alertDialog.show();
                }

                private AlertDialog.Builder makeText(View.OnClickListener onClickListener, String noPublishersSelectedForDeletion, int lengthShort) {
                    return null;
                }


            });

            edSearch.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String searchQuery = edSearch.getText().toString().trim().toLowerCase();
                    filterPublishers(searchQuery);
                }

                private void filterPublishers(String query) {

                    if (query.isEmpty()) {
                        // Trước khi sử dụng publisherAdapter.clear(), hãy tạo nó và gán cho ListView
//                        publisherAdapter = new ArrayAdapter<>(this, android.R.layout., publisherList);
//                        listView.setAdapter(publisherAdapter);

                        // Sau đó bạn có thể sử dụng clear() để xóa dữ liệu trong adapter

                        // Nếu người dùng không nhập gì, hiển thị toàn bộ danh sách nhà xuất bản
                        publisherAdapter.clear();
                        publisherAdapter.addAll(publisherList);
                        publisherAdapter.notifyDataSetChanged();
                    } else {
                        // Nếu có chữ cái được nhập, lọc danh sách nhà xuất bản theo chữ cái đó
                        List<String> filteredPublishers = new ArrayList<>();

                        for (String publisher : publisherList) {
                            if (publisher.toLowerCase().contains(query)) {
                                filteredPublishers.add(publisher);
                            }
                        }

                        publisherAdapter.clear();
                        publisherAdapter.addAll(filteredPublishers);
                        publisherAdapter.notifyDataSetChanged();
                    }
                }

            });



        }

        private void displayPublisherInfo(String publisherInfo) {
            // Chuyển thông tin nhà xuất bản từ chuỗi thành các trường EditText
            String[] parts = publisherInfo.split(", ");
            editTextPublisherName.setText(parts[0]);
            editTextPublisherPhone.setText(parts[1]);
            editTextPublisherMail.setText(parts[2]);
            editTextPublisherAddress.setText(parts[3]);
        }

        private void addPublisher() {
            String name = editTextPublisherName.getText().toString();
            String phone = editTextPublisherPhone.getText().toString();
            String mail = editTextPublisherMail.getText().toString();
            String address = editTextPublisherAddress.getText().toString();

            if (!name.isEmpty() && !phone.isEmpty() && !mail.isEmpty() && !address.isEmpty()) {
                String newPublisher = name + ", " + phone + ", " + mail + ", " + address;
                publisherList.add(newPublisher);
                publisherAdapter.notifyDataSetChanged();
                clearPublisherInfo();
                makeText(this, "Publisher added successfully", Toast.LENGTH_SHORT).show();
            } else {
                makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            }
        }

        private void editPublisher() {
            if (selectedPublisherPosition != -1) {
                String name = editTextPublisherName.getText().toString();
                String phone = editTextPublisherPhone.getText().toString();
                String mail = editTextPublisherMail.getText().toString();
                String address = editTextPublisherAddress.getText().toString();

                if (!name.isEmpty() && !phone.isEmpty() && !mail.isEmpty() && !address.isEmpty()) {
                    String updatedPublisher = name + ", " + phone + ", " + mail + ", " + address;
                    publisherList.set(selectedPublisherPosition, updatedPublisher);
                    publisherAdapter.notifyDataSetChanged();
                    clearPublisherInfo();
                    selectedPublisherPosition = -1;
                    makeText(this, "Publisher updated successfully", Toast.LENGTH_SHORT).show();
                } else {
                    makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
                }
            } else {
                makeText(this, "Please select a publisher to edit", Toast.LENGTH_SHORT).show();
            }
        }

        private void deletePublisher() {
            if (selectedPublisherPosition != -1) {
                publisherList.remove(selectedPublisherPosition);
                publisherAdapter.notifyDataSetChanged();
                clearPublisherInfo();
                selectedPublisherPosition = -1;
                makeText(this, "Publisher deleted successfully", Toast.LENGTH_SHORT).show();
            } else {
                makeText(this, "Please select a publisher to delete", Toast.LENGTH_SHORT).show();
            }
        }

        private void clearPublisherInfo() {
            editTextPublisherName.getText().clear();
            editTextPublisherPhone.getText().clear();
            editTextPublisherMail.getText().clear();
            editTextPublisherAddress.getText().clear();
        }

        private void showPublisherList() {
            publisherList.clear(); // Xóa dữ liệu cũ trong danh sách
            publisherList.add("Publisher 1"); // Thêm dữ liệu mới vào danh sách
            publisherList.add("Publisher 2");
            // Thêm dữ liệu cho tất cả publisher
            publisherAdapter.notifyDataSetChanged(); // Cập nhật adapter để hiển thị dữ liệu mới


        }
    }
