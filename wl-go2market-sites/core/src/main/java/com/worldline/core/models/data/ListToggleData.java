package com.worldline.core.models.data;

/**
 * Created by susannat on 8/29/2017.
 */
public class ListToggleData {

    private String acardion;

    private String text;

    public ListToggleData() {

    }

    public ListToggleData(String acardion, String text) {
        this.acardion = acardion;
        this.text = text;
    }

    public String getAcardion() {
        return acardion;
    }

    public void setAcardion(String acardion) {
        this.acardion = acardion;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
