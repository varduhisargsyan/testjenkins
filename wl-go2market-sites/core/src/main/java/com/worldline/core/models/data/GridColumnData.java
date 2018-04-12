package com.worldline.core.models.data;

/**
 * Created by vazgent on 5/4/2017.
 */
public class GridColumnData {
    private String cssClass;

    public GridColumnData(String cssClass) {
        this.cssClass = cssClass;
    }

    public String getCssClass() {
        return cssClass;
    }

    public void setCssClass(String cssClass) {
        this.cssClass = cssClass;
    }

    @Override
    public String toString() {
        return "GridColumnData{" +
                "cssClass='" + cssClass + '\'' +
                '}';
    }
}
