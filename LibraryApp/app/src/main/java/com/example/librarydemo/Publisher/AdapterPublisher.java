//package com.example.librarydemo.Publisher;
//
//import android.content.Context;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.BaseAdapter;
//import android.widget.TextView;
//import com.example.librarydemo.Models.PublisherModel;
//import com.example.librarydemo.R;
//
//import java.util.List;
//
//public class AdapterPublisher extends BaseAdapter {
//
//    private Context context;
//    private List<PublisherModel> publisherList;
//
//    public AdapterPublisher(Context context, List<PublisherModel> publisherList) {
//        this.context = context;
//        this.publisherList = publisherList;
//    }
//
//    @Override
//    public int getCount() {
//        return publisherList.size();
//    }
//
//    @Override
//    public Object getItem(int position) {
//        return publisherList.get(position);
//    }
//
//    @Override
//    public long getItemId(int position) {
//        return position;
//    }
//
//    @Override
//    public View getView(int position, View convertView, ViewGroup parent) {
//        if (convertView == null) {
//            convertView = LayoutInflater.from(context).inflate(R.layout.activity_list_publisher, parent, false);
//        }
//
//
//        TextView publisherNameTextView = convertView.findViewById(R.id.textViewPublisherName);
//        TextView publisherPhoneTextView = convertView.findViewById(R.id.textViewPublisherPhone);
//        TextView publisherMailTextView = convertView.findViewById(R.id.textViewPublishingMail);
//        TextView publisherAddressTextView = convertView.findViewById(R.id.textViewPublishingAddress);
//
//        // Lấy thông tin nhà xuất bản ở position
//        PublisherModel publisher = publisherList.get(position);
//
//        // Đặt thông tin vào các TextViews
//        publisherNameTextView.setText(publisher.getName());
//        publisherPhoneTextView.setText(publisher.getPhone());
//        publisherMailTextView.setText(publisher.getMail());
//        publisherAddressTextView.setText(publisher.getAddress());
//
//        return convertView;
//    }
//}
