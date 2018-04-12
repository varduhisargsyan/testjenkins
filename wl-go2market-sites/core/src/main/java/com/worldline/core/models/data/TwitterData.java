package com.worldline.core.models.data;

public class TwitterData {
    private String screenName;
    private String text;
    private String date;

    public TwitterData() {
    }

    public TwitterData(String screenName, String text, String date) {
        this.screenName = screenName;
        this.text = text;
        this.date = date;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
