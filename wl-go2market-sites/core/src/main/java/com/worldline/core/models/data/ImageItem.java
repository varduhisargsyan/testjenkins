package com.worldline.core.models.data;

/**
 * Created by susannat on 8/31/2017.
 */
public class ImageItem {
    private String imagePath ;
    private String url;

    public ImageItem() {

    }

    public ImageItem(String imagePath, String url) {
        this.imagePath = imagePath;
        this.url = url;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
