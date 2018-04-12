package com.worldline.core.models;

import com.day.cq.commons.LanguageUtil;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.exceptions.PageNotFoundException;
import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolver;
import com.worldline.core.services.TagManagerService;
import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.*;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class, Page.class})
public class BlogOverviewModel {

    private static final Logger LOG = LoggerFactory.getLogger(BlogOverviewModel.class);

    private String message;
    /*
    in case blog articles count <=5  button "See more" set  hidden
     */
    private boolean isActiveSeeMore = true;

    @ValueMapValue(name = "itemsPerPage", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String itemPerPage;

    @ValueMapValue(name = "startPath", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String startPath;

    private List<ArticleBriefItem> blogItems = new ArrayList<>();

    private Map<String, String> categoryNames = new HashMap<>();

    private Map<String, String> tags = new HashMap<>();

    private String parentPath;

    @Inject
    private SlingHttpServletRequest request;

    @Inject
    JCRDataResolver jcrDataResolver;

    @Inject
    private TagManagerService tagManagerService;


    @Inject
    private ResourceResolver resolver;

    @PostConstruct
    public void activate() {

        Page currentPage = null;
        String currentPageName = null;
        Locale locale =null;

        try {
            if (request != null) {
                Resource jcrContent = resolver.getParent(request.getResource());
                //Get current page name
                if (jcrContent != null) {
                    Resource resourcePage = jcrContent.getParent();
                    if (resourcePage != null) {
                        currentPage = resourcePage.adaptTo(Page.class);
                       if(currentPage!=null) {
                           currentPageName = currentPage.getName();
                       }
                    }
                }
                if(currentPage==null){
                    throw new GenericException("Failed to adapt resource to page: current page is null");
                }
                //to get blog  home(root) page -blog.html

                    Page blogParent = getBlogParent(currentPage);
                    parentPath = blogParent.getPath();
                    LOG.info("[1] BlogHome Path " + parentPath);

                LOG.info("[1.1] CurrentPage name " + currentPageName);
                //Get data for side menu : tags with namespace [blog] and [category]
                if (tagManagerService == null) {
                    throw new GenericException("Failed to get TagManagerService: null");
                }
                LOG.info("[1.2] getting side menu items");

                /*
                Returns the content language of the page.
                The language is usually defined on the page content via a jcr:language property containing the iso codes for language and country.
                if the property is not defined on this page all ancestors are search for such an property.
                If no language is defined at all, the path is examined if it contains a iso label.
                If no language can be found at all, the systems default locale is returned.
                If ignoreConent is true, only the names of the path is used to determine the language.
                Note that this has nothing to do with i18n of the cq5 itself
                 */

                 locale=currentPage.getLanguage(false);
                    LOG.info("[1.3] getting page locale");

                    tags = tagManagerService.getTagsByNamespace(PropertyKey.BLOG_NAMESPACE, locale);
                    categoryNames = tagManagerService.getTagsByNamespace(PropertyKey.CATEGORY_NAMESPACE, locale);

                    LOG.info("[2] Category tags found: "+Arrays.asList(categoryNames) );
                    LOG.info("[3] Blog(tag) tags found: "+Arrays.asList(tags) );


                /*
                search for current page name in [category] or [blog] namespaces
                1.found in [blog] => page is tagOverview page  : query results are filtered by tagName
                2.found in [category]=> page is category overview page  query results are filtered by category
                3. page name =='blog'  general overview page all pages are selected no filter available
                 */
                String category = null;
                String[] tagNames = null;
                if(PropertyKey.BLOG.equals(currentPageName)){
                    LOG.info("[4.0] Current page is blog overview : category  and tag filters will be disabled");
                } else {
                    if (tagManagerService.isInCategoryNamespace(currentPageName, locale)) {
                        category = currentPageName;
                        LOG.info("[4.1] Current page is category overview : category filter will be applied to query " + category);
                    } else if (tagManagerService.isInBlogNamespace(currentPageName, locale)) {
                       tagNames=new String[]{currentPageName};
                        LOG.info("[4.3] Current page is tag overview: tag filter will be applied to query" + Arrays.asList(tagNames));
                    } else {
                        LOG.warn("Cant find overview page name in [category]/[blog] " + currentPageName);
                    }
                }
                blogItems = jcrDataResolver.getBlogArticles(startPath,
                        "0", itemPerPage, category, tagNames, GlobalKeys.ORDER_BY_DATE, GlobalKeys.ORDER_SORT_DESC, request, currentPage.getLanguage(false));

                final String matches = jcrDataResolver.getMatches();

                if (!Validator.isEmpty(matches) && Integer.parseInt(matches) <= 5) {
                    isActiveSeeMore = false;
                }
                if (!Validator.isEmpty(matches)) {
                    totalMatches= Integer.parseInt(matches) ;
                }
                LOG.info("[5] Total matches found for blog articles " + matches + " isActiveSeeMore=" + isActiveSeeMore);

                //Set default alignment for first article
                if (!blogItems.isEmpty()) {
                    blogItems.get(0).setAlignment(PropertyKey.PROP_KEY_ALIGNMENT_H);

                } else {
                    LOG.info("No items found");
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

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

    private boolean isInCategory(String name) {
        return categoryNames.containsKey(name);
    }

    private boolean isInTags(String name) {
        return tags.containsKey(name);
    }


    public JCRDataResolver getJcrDataResolver() {
        return jcrDataResolver;
    }

    public void setJcrDataResolver(JCRDataResolver jcrDataResolver) {
        this.jcrDataResolver = jcrDataResolver;
    }

    public List<ArticleBriefItem> getBlogItems() {
        return blogItems;
    }

    public void setBlogItems(List<ArticleBriefItem> blogItems) {
        this.blogItems = blogItems;
    }

    public String getItemPerPage() {
        return itemPerPage;
    }

    public void setItemPerPage(String itemPerPage) {
        this.itemPerPage = itemPerPage;
    }

    public String getStartPath() {
        return startPath;
    }

    public void setStartPath(String startPath) {
        this.startPath = startPath;
    }

    public SlingHttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(SlingHttpServletRequest request) {
        this.request = request;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getCategoryNames() {
        return categoryNames;
    }

    public void setCategoryNames(Map<String, String> categoryNames) {
        this.categoryNames = categoryNames;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    public boolean isActiveSeeMore() {
        return isActiveSeeMore;
    }

    public void setActiveSeeMore(boolean activeSeeMore) {
        isActiveSeeMore = activeSeeMore;
    }

    public TagManagerService getTagManagerService() {
        return tagManagerService;
    }

    public void setTagManagerService(TagManagerService tagManagerService) {
        this.tagManagerService = tagManagerService;
    }




    private int totalMatches;

    public int getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(int totalMatches) {
        this.totalMatches = totalMatches;
    }
}