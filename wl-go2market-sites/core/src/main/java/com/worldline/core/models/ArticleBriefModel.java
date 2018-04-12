package com.worldline.core.models;

import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolver;
import com.worldline.core.util.GlobalKeys;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import java.util.*;

/**
 * Created by davitp on 6/21/2017.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class ArticleBriefModel {

    private static final Logger LOG = LoggerFactory.getLogger(ArticleBriefModel.class);

    private List<ArticleBriefItem> articleBriefItems = new ArrayList<>();
    @Inject
    private SlingHttpServletRequest request;
    @Inject
    private JCRDataResolver jcrDataResolver;

    @ValueMapValue(name = "startPaths", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] startPaths;

    @ValueMapValue(name = "size", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String size;

    @ValueMapValue(name = "label", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String label;

    @ValueMapValue(name = "tags", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] tags;

    @ValueMapValue(name = "categories", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] categories;

    @ValueMapValue(name = "releaseCategory", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] releaseCategory;

    @ValueMapValue(name = "releaseImagePath", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String releaseImagePath;

    private String category;

    @PostConstruct
    public void activate() {
        try {
            articleBriefItems = jcrDataResolver.getReleaseArticles(startPaths, size, categories, tags,
                    GlobalKeys.ORDER_BY_DATE, GlobalKeys.ORDER_SORT_DESC, releaseImagePath, request);
            LOG.info("ArticleBrieItems fetched from JCR repository" + articleBriefItems.size());
            if (articleBriefItems != null && !articleBriefItems.isEmpty()) {
                category = (releaseCategory != null) ? getCategoryName(releaseCategory[0]) : articleBriefItems.get(0).getCategory();
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION + " " + ex);
        }
    }


    public List<ArticleBriefItem> getArticleBriefItems() {
        return articleBriefItems;
    }

    public void setArticleBriefItems(List<ArticleBriefItem> articleBriefItems) {
        this.articleBriefItems = articleBriefItems;
    }

    public JCRDataResolver getJcrDataResolver() {
        return jcrDataResolver;
    }

    public void setJcrDataResolver(JCRDataResolver jcrDataResolver) {
        this.jcrDataResolver = jcrDataResolver;
    }

    public String[] getStartPaths() {
        return startPaths;
    }

    public void setStartPaths(String[] startPaths) {
        this.startPaths = startPaths;
    }

    public String getReleaseImagePath() {
        return releaseImagePath;
    }

    public void setReleaseImagePath(String releaseImagePath) {
        this.releaseImagePath = releaseImagePath;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public String[] getCategories() {
        return categories;
    }

    public void setCategories(String[] categories) {
        this.categories = categories;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String[] getReleaseCategory() {
        return releaseCategory;
    }

    public void setReleaseCategory(String[] releaseCategory) {
        this.releaseCategory = releaseCategory;
    }

    private String getCategoryName(String props) {
        String categoryName = "";
        int i = props.indexOf(':');
        if (i != -1) {
            categoryName = props.substring(++i);
        }
        return categoryName;
    }
}