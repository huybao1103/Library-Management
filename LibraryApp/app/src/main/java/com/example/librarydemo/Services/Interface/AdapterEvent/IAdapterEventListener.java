package com.example.librarydemo.Services.Interface.AdapterEvent;

public interface IAdapterEventListener {
    /**
     * Called when clicked on a name of an item
     * @param itemId - Id of an item
     */
    void onItemNameClicked(String itemId);

    /**
     * Called when clicked on a edit icon in an item
     * @param itemId - Id of an item
     */
    void onEditButtonClicked(String itemId);

    /**
     * Called when clicked on a delete icon in an item
     * @param itemId - Id of an item
     */
    void onDeleteButtonClicked(String itemId);
}
