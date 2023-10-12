package com.example.librarydemo.Services.Interface.TableList;

public interface ITableListEventListener {
    /**
     * Edit button clicked listener
     * @param itemId
     */
    void onEditButtonClicked(String itemId);

    /**
     * Delete button clicked listener
     * @param itemId
     */
    void onDeleteButtonClicked(String itemId);
}
