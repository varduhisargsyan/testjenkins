package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.exceptions.PageNotFoundException;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.TagManagerService;
import com.worldline.core.util.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.awt.image.ImageWatched;

import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.util.*;

/**
 * Created by davitp on 7/31/2017.
 */

public class BlogSingleModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(BlogSingleModel.class);

    private List<Tag> categories = new ArrayList<>();
    private List<Tag> tags = new ArrayList<>();
   private Map<String, String> categoryTags = new HashMap();
    private Map<String, String> trendTags = new HashMap();

    private String parentPath;


    @Override
    public void activate() {
        try {
            String[] categoryProps = PagePropertyUtil.initListProp(getCurrentPage(), PropertyKey.PROP_KEY_CATEGORY);
            String[] tagProps = PagePropertyUtil.initListProp(getCurrentPage(), PropertyKey.PROP_KEY_TAGS);
            if (!Validator.isEmpty(categoryProps) || !Validator.isEmpty(tagProps)) {
                Page blogParent = getBlogParent(getCurrentPage());
                parentPath = blogParent.getPath();
            }
            TagManagerService tagManagerService = getSlingScriptHelper().getService(TagManagerService.class);
            LOG.info("Accessing tagManagerService object ref: " + tagManagerService);
            if (tagManagerService != null) {
                categories = tagManagerService.resolveToTag(categoryProps);
                tags = tagManagerService.resolveToTag(tagProps);

                categoryTags=localizeTangs(categories, getCurrentPage().getLanguage(false));
                trendTags=localizeTangs(tags, getCurrentPage().getLanguage(false));

            }


        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }




    private Map<String, String> localizeTangs(List<Tag> tags, Locale locale) {

        Map<String, String> aMap = new HashMap();
        tags.stream().forEach(e -> {
            aMap.put(e.getName(), e.getLocalizedTitle(locale));

        });
        return aMap;
    }


    /*
      traversing upward to get blog-home
       */
    private Page getBlogParent(Page blogPage) throws PageNotFoundException {
        if (blogPage == null) {
            throw new PageNotFoundException("Fail to retrieve blog-home");
        }
        if (PropertyKey.BLOG.equals(blogPage.getName())) {
            return blogPage;

        }
        return getBlogParent(blogPage.getParent());
    }


    public List<Tag> getCategories() {
        return categories;
    }

    public void setCategories(List<Tag> categories) {
        this.categories = categories;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    public Map<String, String> getCategoryTags() {
        return categoryTags;
    }

    public void setCategoryTags(Map<String, String> categoryTags) {
        this.categoryTags = categoryTags;
    }

    public Map<String, String> getTrendTags() {
        return trendTags;
    }

    public void setTrendTags(Map<String, String> trendTags) {
        this.trendTags = trendTags;
    }
}
