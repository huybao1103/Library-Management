package com.example.librarydemo.Models;

public class SpinnerOption {
    private String label;
    private String label1;
    private String label2;

    private String value;
    private int valueInt;

    public SpinnerOption(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public SpinnerOption(String label, int valueInt) {
        this.label = label;
        this.valueInt = valueInt;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLabel1() {
        return label1;
    }

    public void setLabel1(String label1) {
        this.label1 = label1;
    }

    public String getLabel2() {
        return label2;
    }

    public void setLabel2(String label2) {
        this.label2 = label2;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getValueInt() {
        return valueInt;
    }

    public void setValueInt(int valueInt) {
        this.valueInt = valueInt;
    }

    @Override
    public String toString() {
        return label;
    }
}
