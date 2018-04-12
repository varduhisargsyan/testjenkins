package com.worldline.core.models.data;

import java.util.List;

/**
 * Created by susannat on 6/16/2017.
 */
public class ArticleBriefItem {

    private String date;
    private String title;
    private String text;
    private String link;
    private String imagePath;
    private String category;
    private String authorImagePath;
    private String authorName;
    private String alignment;
    private String extension;
    private List<SocialIcon> socials;



    public ArticleBriefItem() {
    }

    public ArticleBriefItem(String date, String title, String text, String link, String imagePath, String category) {
        this.date = date;
        this.title = title;
        this.text = text;
        this.link = link;
        this.imagePath = imagePath;
        this.category = category;
    }

    public ArticleBriefItem(String date, String title, String text, String link, String imagePath, String category, String authorImagePath, String authorName) {
        this.date = date;
        this.title = title;
        this.text = text;
        this.link = link;
        this.imagePath = imagePath;
        this.category = category;
        this.authorImagePath = authorImagePath;
        this.authorName = authorName;
    }

    public ArticleBriefItem(String date, String title, String text, String link, String imagePath, String category, String authorImagePath, String authorName, String alignment, String extension, List<SocialIcon> socials) {
        this.date = date;
        this.title = title;
        this.text = text;
        this.link = link;
        this.imagePath = imagePath;
        this.category = category;
        this.authorImagePath = authorImagePath;
        this.authorName = authorName;
        this.alignment = alignment;
        this.extension = extension;
        this.socials = socials;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorImagePath() {
        return authorImagePath;
    }

    public void setAuthorImagePath(String authorImagePath) {
        this.authorImagePath = authorImagePath;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAlignment() {
        return alignment;
    }

    public void setAlignment(String alignment) {
        this.alignment = alignment;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public List<SocialIcon> getSocials() {
        return socials;
    }

    public void setSocials(List<SocialIcon> socials) {
        this.socials = socials;
    }

    @Override
    public String toString() {
        return "ArticleBriefItem{" +
                "date='" + date + '\'' +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", link='" + link + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", category='" + category + '\'' +
                ", authorImagePath='" + authorImagePath + '\'' +
                ", authorName='" + authorName + '\'' +
                ", alignment='" + alignment + '\'' +
                ", extension='" + extension + '\'' +
                ", socials=" + socials +
                '}';
    }
}
