package com.worldline.core.models.data;

/**
 * Created by varduhis on 4/20/2017.
 */

public class CountryItem {

    private String key;
    private String name;
    private String url;
    private String iconPath;

    public CountryItem(String key, String name, String url, String iconPath) {
        this.key = key;
        this.name = name;
        this.url = url;
        this.iconPath = iconPath;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    @Override
    public String toString() {
        return "CountryItem{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", iconPath='" + iconPath + '\'' +
                '}';
    }
}
