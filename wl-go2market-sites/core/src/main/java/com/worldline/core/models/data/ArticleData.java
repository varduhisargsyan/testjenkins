package com.worldline.core.models.data;

public class ArticleData {
    /**
     * Article title
     */
    private String title;

    /**
     * Article description
     */
    private String description;

    /**
     * Article image path
     */
    private String imagePath;

    /**
     * Article link
     */
    private String link;

    /**
     * Default constructor
     */
    public ArticleData() {
    }

    /**
     * Regular constructor
     *
     * @param title       article title
     * @param description article description
     * @param imagePath   article image path
     * @param link        article link
     */
    public ArticleData(String title, String description, String imagePath, String link) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.link = link;
    }

    /**
     * Gets article title
     *
     * @return article title
     */

    public String getTitle() {
        return title;
    }

    /**
     * Sets article title
     *
     * @param title the title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets article description
     *
     * @return article description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets article description
     *
     * @param description article description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets article image path
     *
     * @return article image path
     */
    public String getImagePath() {
        return imagePath;
    }

    /**
     * Sets article image path
     *
     * @param imagePath article image path
     */
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    /**
     * Gets article link
     *
     * @return article link
     */
    public String getLink() {
        return link;
    }

    /**
     * Sets article link
     *
     * @param link article link
     */
    public void setLink(String link) {
        this.link = link;
    }


    @Override
    public String toString() {
        return "ArticleData{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", link='" + link + '\'' +
                '}';
    }
}
