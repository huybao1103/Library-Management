package com.example.librarydemo.Models.Book;

import com.example.librarydemo.Models.CategoryModel;

public class BookCategories {
//    id: string;
//    categoryId: string;
//    bookId: string;
//    category: ICategories;

    private String id;
    private String categoryId;
    private String bookId;
    private CategoryModel category;

    public BookCategories() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public CategoryModel getCategory() {
        return category;
    }

    public void setCategory(CategoryModel category) {
        this.category = category;
    }
}
