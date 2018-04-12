package com.worldline.core.models.data;

/**
 * Created by varduhis on 5/19/2017.
 */
public class SocialIcon {

    private String iconClass;
    private String url;
    private String pageUrl;


    public SocialIcon() {
    }

    public SocialIcon(String iconClass, String url) {
        this.iconClass = iconClass;
        this.url = url;
    }

    public SocialIcon(String iconClass, String url, String pageUrl) {
        this.iconClass = iconClass;
        this.url = url;
        this.pageUrl = pageUrl;
    }

    public String getIconClass() {
        return iconClass;
    }

    public void setIconClass(String iconClass) {
        this.iconClass = iconClass;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    @Override
    public String toString() {
        return "SocialIcon{" +
                "iconClass='" + iconClass + '\'' +
                ", url='" + url + '\'' +
                ", pageUrl='" + pageUrl + '\'' +
                '}';
    }
}
