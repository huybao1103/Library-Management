package com.example.librarydemo.Activity.Fragments.BookChapterFragment;

import android.graphics.Bitmap;
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
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.example.librarydemo.Enum.BookChapterStatus;
import com.example.librarydemo.Models.Book.BookChapter;
import com.example.librarydemo.Models.Book.BookModel;
import com.example.librarydemo.Models.SpinnerOption;
import com.example.librarydemo.R;
import com.example.librarydemo.Services.ApiInterface.ApiService;
import com.example.librarydemo.Services.ApiResponse;
import com.example.librarydemo.Services.Base64Service;
import com.example.librarydemo.Services.ControllerConst.ControllerConst;
import com.example.librarydemo.Services.Interface.ConfirmDialog.IConfirmDialogEventListener;
import com.example.librarydemo.Services.Layout.ApiRequest;
import com.example.librarydemo.Services.Layout.ConfirmDialogService;
import com.example.librarydemo.Services.Layout.CustomSpinner;
import com.example.librarydemo.Services.Layout.TableListService;
import com.example.librarydemo.Services.RetrofitClient;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

import de.codecrafters.tableview.TableDataAdapter;
import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link BookChapterFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class BookChapterFragment extends Fragment implements IConfirmDialogEventListener {
    TextView tensach, tacgia, theloai, nxb;
    ImageView imgsach;
    TableView table_view;
    View view;
    private String bookId = "";
    BookModel currentBook;
    ApiService apiService;
    BookChapter currentChapter;
    AlertDialog dialog;
    boolean formValid = false;
    BookChapter currentBookChapter;

    // Add publisher form
    TextInputEditText edt_chapterNo, edt_chapterIID, edt_chapterAddress;
    AutoCompleteTextView spn_chapter;
    boolean confirmed;
    int selectedChapterStatus;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public BookChapterFragment() {
        // Required empty public constructor
    }

    public BookChapterFragment(String itemId) {
        bookId = itemId;
    }
    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment BookChapterFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static BookChapterFragment newInstance(String param1, String param2) {
        BookChapterFragment fragment = new BookChapterFragment();
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
        view = inflater.inflate(R.layout.fragment_book_chapter, container, false);

        assign();
        getBookById();

        Button addButton = view.findViewById(R.id.add_chapter_btn);
        addButton.setOnClickListener(v -> addChapter());

        Toast.makeText(requireContext(), bookId, Toast.LENGTH_SHORT).show();
        return view;
    }

    private void assign() {
        apiService = RetrofitClient.getApiService(requireContext());

        tensach= (TextView) view.findViewById(R.id.ten_sach);
        tacgia = (TextView) view.findViewById(R.id.tac_gia);
        theloai = (TextView) view.findViewById(R.id.the_loai);
        imgsach = (ImageView) view.findViewById(R.id.img_hinh);
        nxb = (TextView) view.findViewById(R.id.nxb);

        table_view = view.findViewById(R.id.table_view);
        String[] headers = {"Chapter", "ID", "Status"};
        table_view.setHeaderAdapter(new SimpleTableHeaderAdapter(requireContext(), headers));
    }

    private void getBookById() {
        apiService.getById(ControllerConst.BOOKS, bookId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                 currentBook = new ApiResponse<BookModel>()
                .getResultFromResponse
                (
                    response,
                    new TypeToken<BookModel  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                    }.getType()
                );

                if(currentBook != null)
                    bindValue();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });

    }

    private void bindValue() {
        String authorName = "";
        String categoryName = "";
        String publisherName = "";

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            authorName = Arrays.stream(currentBook.getBookAuthors()).map(x -> x.getAuthor().getName()).collect(Collectors.joining(", "));
            categoryName = Arrays.stream(currentBook.getBookCategories()).map(x -> x.getCategory().getName()).collect(Collectors.joining(", "));
            publisherName = Arrays.stream(currentBook.getBookPublishers()).map(x -> x.getPublisher().getName()).collect(Collectors.joining(", "));
        }
        //Ghi giá trị vào listview
        tensach.setText(currentBook.getName());

        tacgia.setText("Author: " + authorName);
        nxb.setText("Publisher: " + publisherName);
        theloai.setText("Category: " + categoryName);

        if(currentBook.getBookImages().length > 0) {
            Bitmap decodedByte = new Base64Service(requireContext()).convertBase64ToImage(currentBook.getBookImages()[0].getBase64());
            imgsach.setImageBitmap(decodedByte);
        }

        if(currentBook.getBookChapters().length > 0) {
            setBookChapterAdapter();
        }
    }

    private void setBookChapterAdapter() {
        table_view = new TableListService(new String[]{"Chapter", "ID", "Status"}, table_view, (AppCompatActivity) requireActivity()).setColumnModel();

        table_view.setDataAdapter(new TableDataAdapter(requireContext(), currentBook.getBookChapters()) {
            @Override
            public View getCellView(int rowIndex, int columnIndex, ViewGroup parentView) {
                BookChapter chapter = (BookChapter) getItem(rowIndex); // This gets the BookChapter for the given row

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
                        textView.setText(chapter.getChapter() + "");
                        break;
                    case 1:
                        textView.setText(chapter.getIdentifyId());
                        break;
                    case 2:
                        textView.setText(BookChapterStatus.fromCode(chapter.getStatus()).name());
                        break;
                    case 3:
                        return getMenuIcon(chapter.getId());
                    // Add more cases if you have more columns.
                    default:
                        throw new IllegalArgumentException("Invalid columnIndex: " + columnIndex);
                }

                return textView;
            }
        });
    }

    private FrameLayout getMenuIcon(String chapterId) {
        // Create an ImageView
        ImageView imageView = new ImageView(requireContext());
        imageView.setImageResource(R.drawable.baseline_more_vert_24);
        imageView.setOnClickListener(v -> showPopupMenu(v, chapterId));

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
    private void showPopupMenu(View v, String chapterId) {
        PopupMenu popup = new PopupMenu(requireContext(), v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.table_list_menu_item, popup.getMenu());

        // Set click listener for menu items
        popup.setOnMenuItemClickListener(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.menu_item_edit:
                    // Handle item 1 action
                    getChapterById(chapterId);
                    return true;
                case R.id.menu_item_delete:
                    // Handle item 2 action
                    deleteChapter(chapterId);
                    return true;
                // ... more items ...
                default:
                    return false;
            }
        });

        popup.show();
    }

    private void deleteChapter(String itemId) {
        new ConfirmDialogService("Are you sure you want to delete this chapter?", requireContext(), this)
                .ShowConfirmDialog()
                .setOnDismissListener(dialogInterface -> {
                    if(confirmed)
                        deleteConfirmed(itemId);
                });
    }

    private void deleteConfirmed(String itemId) {
        apiService.delete(ControllerConst.BOOKCHAPTERS, itemId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

                if(response.isSuccessful()) {
                    Toast.makeText(requireContext(), "Chapter deleted successfully", Toast.LENGTH_SHORT).show();
                    getBookById();
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

    private void getChapterById(String chapterId) {
        apiService.getById(ControllerConst.BOOKCHAPTERS, chapterId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                 currentChapter = new ApiResponse<BookChapter>()
                        .getResultFromResponse /* Ép kiểu và chuyển từ Json sang model để dùng */
                                (
                                        response,
                                        new TypeToken<BookChapter  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>() {
                                        }.getType()
                                );

                if(currentChapter != null)
                    addChapter();
                formValid = true;
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    private void addChapter() {
        View publisherFormDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.chapter_info_form, null);
        bindChapterLayoutDialog(publisherFormDialogView);

        dialog = new MaterialAlertDialogBuilder(requireContext())
                .setView(publisherFormDialogView)
                .setNegativeButton("Cancel", (dialogInterface, i) -> {
                    dialogInterface.dismiss();
                }).create();
        dialog.setCanceledOnTouchOutside(true);
//        alertDialog.on
        dialog.show();

        Button submit_btn = publisherFormDialogView.findViewById(R.id.add_chapter_submit);
        submit_btn.setOnClickListener(view -> {
//            if(formValid)
                addBookChapterSubmit();
        });

        formValid = false;
//        formValidation(edt_categoryName);
    }

    private void bindChapterLayoutDialog(View chapterFormDialog) {
        CustomSpinner customSpinner;
        ArrayList<SpinnerOption> chapterStatusList = new ArrayList<>();
        spn_chapter = chapterFormDialog.findViewById(R.id.spn_chapter);

        edt_chapterNo = chapterFormDialog.findViewById(R.id.edt_chapterNo);
        edt_chapterIID = chapterFormDialog.findViewById(R.id.edt_chapterIID);
        edt_chapterAddress = chapterFormDialog.findViewById(R.id.edt_chapterAddress);

        if(currentChapter != null) {
            edt_chapterNo.setText(currentChapter.getChapter() + "");
            edt_chapterIID.setText(currentChapter.getIdentifyId());
            edt_chapterAddress.setText(currentChapter.getDescription());
        }


        for (BookChapterStatus status: BookChapterStatus.values()) {
            SpinnerOption spinnerOption = new SpinnerOption(status.name(), status.getCode());

            chapterStatusList.add(spinnerOption);

            if(currentChapter != null && status.getCode() == currentChapter.getStatus())
                spn_chapter.setText(status.name());
        }
        customSpinner = new CustomSpinner(requireContext(), chapterStatusList);

        spn_chapter.setAdapter(customSpinner);

        spn_chapter.setOnItemClickListener((adapterView, view, i, l) -> {
            SpinnerOption selected = (SpinnerOption) adapterView.getItemAtPosition(i);

            selectedChapterStatus = selected.getValueInt();
            spn_chapter.setText(selected.getLabel());
        });
    }

    private void addBookChapterSubmit() {
        BookChapter bookChapterl = new BookChapter();
        bookChapterl.setChapter(Integer.parseInt(Objects.requireNonNull(edt_chapterNo.getText()).toString()));
        bookChapterl.setDescription(Objects.requireNonNull(edt_chapterAddress.getText()).toString());
        bookChapterl.setIdentifyId(Objects.requireNonNull(edt_chapterIID.getText()).toString());
        bookChapterl.setStatus(selectedChapterStatus);
        bookChapterl.setBookId(bookId);
        bookChapterl.setId(currentChapter != null ? currentChapter.getId() : null);

        JsonObject data = new ApiRequest().convertModelToJSONObject(bookChapterl);

        apiService.save(ControllerConst.BOOKCHAPTERS, data).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                BookChapter publisherModel = new ApiResponse<BookChapter>().getResultFromResponse
                        (
                                response,
                                new TypeToken<BookChapter  /* ĐƯA VÀO CHO ĐÚNG KIỂU DỮ LIỆU */>(){}.getType()
                        );
                if(publisherModel != null) {
                    dialog.dismiss();
                    getBookById();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

    @Override
    public void onYesOrNoButtonClicked(boolean isConfirmed) {
        confirmed = isConfirmed;
    }


}