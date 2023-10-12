package com.example.librarydemo.Services.Interface.ConfirmDialog;

public interface IConfirmDialogEventListener {
    /**
     * Yes button clicked listener
     * @param isConfirmed
     */
    void onYesOrNoButtonClicked(boolean isConfirmed);
}
