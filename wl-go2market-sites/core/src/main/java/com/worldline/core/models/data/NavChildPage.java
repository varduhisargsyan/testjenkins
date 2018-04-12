package com.worldline.core.models.data;


import java.util.ArrayList;
import java.util.List;

public class NavChildPage {
    /**
     * Current page path
     */
    private String path;

    /**
     * Current page title
     */
    private String title;

    /**
     * Current page name
     */
    private String name;

    /**
     * Current page which refers to list of child pages
     */
    private List<NavChildPage> children;

    private String pageIcon;
    /*
    possible values main or top
     */
    private String showin;

    /**
     * Default Constructor
     */

    public NavChildPage() {
    }


    public NavChildPage(String path, String title, String name) {
        this.path = path;
        this.title = title;
        this.name = name;
        this.children = new ArrayList<>();
    }

    public NavChildPage(String path, String title, List<NavChildPage> children) {
        this.path = path;
        this.title = title;
        this.children = children;
    }

    public NavChildPage(String path, String title, String showin, String pageIcon) {
        this.path = path;
        this.title = title;
        this.showin = showin;
        this.pageIcon = pageIcon;
    }
    public NavChildPage(String path, String title, String name, String showin,String pageIcon) {
        this.path = path;
        this.title = title;
        this.name=name;
        this.showin = showin;
        this.pageIcon = pageIcon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<NavChildPage> getChildren() {
        return children;
    }

    public void setChildren(List<NavChildPage> children) {
        this.children = children;
    }


    public String getPageIcon() {
        return pageIcon;
    }

    public void setPageIcon(String pageIcon) {
        this.pageIcon = pageIcon;
    }

    public String getShowin() {
        return showin;
    }

    public void setShowin(String showin) {
        this.showin = showin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NavChildPage that = (NavChildPage) o;

        return showin.equals(that.showin);
    }

    @Override
    public int hashCode() {
        return showin.hashCode();
    }

    @Override
    public String toString() {
        return "mainnavChildPage{" +
                "path='" + path + '\'' +
                ", title='" + title + '\'' +
                ", children=" + children +
                '}';
    }
}

