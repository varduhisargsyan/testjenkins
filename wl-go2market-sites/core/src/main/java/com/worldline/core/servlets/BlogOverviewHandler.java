package com.worldline.core.servlets;

import com.day.cq.wcm.api.Page;
import com.sun.tools.javac.code.Attribute;
import com.sun.tools.javac.util.ArrayUtils;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.BlogOverviewModel;
import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolver;
import com.worldline.core.services.JCRDataResolverImpl;
import com.worldline.core.services.TagManagerService;
import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * Created by susannat on 7/6/2017.
 */
@SuppressWarnings("serial")
@SlingServlet(paths = "/bin/blogOverviewHandler", methods = "GET")
public class BlogOverviewHandler extends SlingAllMethodsServlet {


    private static final long serialVersionUID = 2598471129166789515L;
    private static final String BLOG_OVERVIEW = "blogoverview";
    private static final String OVERVIEW = "overview";
    private static final String TAGS = "tags";
    private static final String SELECTOR = "selector";
    private static final String RESOURCE_PATH = "resourcePath";

    private String startPath;
    private String itemPerPage;

    private static final Logger LOG = LoggerFactory.getLogger(BlogOverviewHandler.class);
    @Reference
    private transient JCRDataResolver jcrDataResolver;
    @Reference
    private transient TagManagerService tagManagerService;

    @Inject
    private transient SlingScriptHelper scriptHelper;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {

        try {
            if (scriptHelper != null) {
                BlogOverviewModel model = scriptHelper.getService(BlogOverviewModel.class);

            }


           /*
            To dynamically get the current page path:

            */
            String path = request.getParameter(RESOURCE_PATH);
            LOG.info("RESOURCE PATH " + path);

            if (path == null) {
                LOG.info("BlogOverview Handler got invalid blog overview resource path");
                return;
            }

            String param_overview = request.getParameter(OVERVIEW);
            String param_tags = request.getParameter(TAGS);

            String selector = request.getParameter(SELECTOR);
            LOG.info("Servlet overview " + param_overview);
            LOG.info("Servlet tags " + param_tags);
            LOG.info("Servlet selector  " + selector);
            Resource resource = request.getResourceResolver().getResource(path);

            if (resource != null) {
                Page currentPage = resource.adaptTo(Page.class);

                // currentPage.
            /*
            retrieve overview component to get it's properties
            content node corresponds to  path/jcr:content
             */
                if (currentPage == null) {
                    LOG.error("OOPS: Current page is null");
                    return;
                }
                Node jcrContent = currentPage.getContentResource().adaptTo(Node.class);

                if (jcrContent != null && jcrContent.hasNode(BLOG_OVERVIEW)) {
                    Node overview = jcrContent.getNode(BLOG_OVERVIEW);

                    try {
                        Property propertyStartPath = overview.getProperty(PropertyKey.PROP_KEY_STARTPATH);
                        Property propertyItemPerPage = overview.getProperty(PropertyKey.PROP_KEY_ITEM_PER_PAGE);

                        startPath = propertyStartPath.getString();
                        itemPerPage = propertyItemPerPage.getString();
                    } catch (PathNotFoundException e) {
                        LOG.info("StartPath or ItemPerPage not set for currentPage page");
                        getParentPageProperties(currentPage);
                    }
                    boolean isValid = true;

                    if (Validator.isEmpty(startPath)) {
                        LOG.info("Cannot accomplish the request due to reason: Failed to get blogOverview component property:  startPath");
                        isValid = false;

                    }
                    if (Validator.isEmpty(itemPerPage)) {
                        LOG.info("Cannot accomplish the request due to reason: Failed to get blogOverview component property:  itemPerPage");
                        isValid = false;
                    }
                    if (Validator.isEmpty(param_overview)) {
                        LOG.info("Cannot accomplish the request due to reason: invalid request param: param_overview =null or empty");
                        isValid = false;
                    }
                    if (Validator.isEmpty(selector)) {
                        LOG.info("Cannot accomplish the request due to reason: invalid request param: selector =null or empty");
                        isValid = false;
                    }
                    String[] tags = null;
                    if (!Validator.isEmpty(param_tags)) {
                        tags = param_tags.split(",");
                        LOG.info("Tags selected for currentPage page" + Arrays.asList(tags));
                    }

                    if (isValid) {
                        if (tagManagerService == null) {
                            throw new GenericException("Failed to get tagManagerService reference: null");
                        }


                            /*
                Returns the content language of the page.
                The language is usually defined on the page content via a jcr:language property containing the iso codes for language and country.
                if the property is not defined on this page all ancestors are search for such an property.
                If no language is defined at all, the path is examined if it contains a iso label.
                If no language can be found at all, the systems default locale is returned.
                If ignoreConent is true, only the names of the path is used to determine the language.
                Note that this has nothing to do with i18n of the cq5 itself
                 */
                        Locale locale = currentPage.getLanguage(false);
                         /*
                        Is currentPage overview page is categoryOverview ? if true category filter  will be applied to query
                         */
                        String category = null;
                        String[] tagNames;

                        if (tagManagerService.isInCategoryNamespace(param_overview, locale)) {
                            category = param_overview;
                            LOG.info("[4.1] Current page is category overview : category filter will be applied to query " + category);

                        } else if (tagManagerService.isInBlogNamespace(param_overview, locale)) {
                             /* currentPage page is tagOverview Page  */

                            tagNames = new String[]{param_overview};
                            LOG.info("[4.3] Current page is tag overview: tag filter will be applied to query" + Arrays.asList(tagNames));

                            if (tags != null) {
                                List<String> listTagNames = new ArrayList(Arrays.asList(tagNames));
                                LOG.info("[4.4] ListTagNames " + listTagNames.toString());

                                List<String> listTags = new ArrayList(Arrays.asList(tags));
                                LOG.info("[4.5] More Tag filters are found " + listTags.toString());

                                listTags.addAll(listTagNames);
                                tags = listTags.toArray(new String[listTags.size()]);
                                LOG.info("[4.6] All tags " + listTags.toString());
                            } else {
                                tags = tagNames;
                            }
                        } else {
                            LOG.warn("Cant find overview page name in [category]/[blog] " + param_overview);
                        }
                        List<ArticleBriefItem> blogItems = jcrDataResolver.getBlogArticles(startPath,
                                Validator.isEmpty(selector) ? "0" : selector, itemPerPage,
                                category, tags, GlobalKeys.ORDER_BY_DATE, GlobalKeys.ORDER_SORT_DESC, request, currentPage.getLanguage(false));
                        if (blogItems != null) {
                            if ("0".equals(selector) && !blogItems.isEmpty()) {
                                blogItems.get(0).setAlignment("h");
                                for (int i = 1; i < blogItems.size(); i++) {
                                    blogItems.get(i).setAlignment("v");
                                }
                            } else {
                                for (int i = 0; i < blogItems.size(); i++) {
                                    blogItems.get(i).setAlignment("v");
                                }
                            }
                            Type listType = new TypeToken<ArrayList<ArticleBriefItem>>() {
                            }.getType();
                            JSONArray jsonarray = new JSONArray();
                            String json = new Gson().toJson(blogItems, listType);
                            String totalCount = new Gson().toJson(jcrDataResolver.getMatches(), String.class);

                            jsonarray.put(totalCount);
                            jsonarray.put(json);
                            response.setHeader("Access-Control-Allow-Origin", "*");
                            response.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, DELETE");
                            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
                            response.setHeader("Access-Control-Max-Age", "86400");
                            response.setHeader("Content-Type", "application/json;charset=UTF-8");
                            response.getWriter().write(jsonarray.toString());

                        } else {
                            LOG.info("NO ITEM FOUND");
                            response.getWriter().write("Blog overview NO ITEM FOUND");
                        }
                        return;
                    }

                    return;
                }

                LOG.warn("Impossible to get resource blogoverview from node ");
                return;
            }
            LOG.warn("Impossible to get resource from path ", path);

        } catch (
                Exception ex)

        {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

    }

    public JCRDataResolver getJcrDataResolver() {
        return jcrDataResolver;
    }

    public void setJcrDataResolver(JCRDataResolver jcrDataResolver) {
        this.jcrDataResolver = jcrDataResolver;
    }

    public void setPaginationService(JCRDataResolverImpl jcrDataResolver) {
        this.jcrDataResolver = jcrDataResolver;
    }

    private void getParentPageProperties(Page current) throws RepositoryException {
        try {
            Page parent = current.getParent();
            Node jcrContent = parent.getContentResource().adaptTo(Node.class);

            if (jcrContent != null && jcrContent.hasNode(BLOG_OVERVIEW)) {
                Node overview = jcrContent.getNode(BLOG_OVERVIEW);
                if (overview.getProperty(PropertyKey.PROP_KEY_STARTPATH) != null && overview.getProperty(PropertyKey.PROP_KEY_ITEM_PER_PAGE) != null) {
                    startPath = overview.getProperty(PropertyKey.PROP_KEY_STARTPATH).getString();
                    itemPerPage = overview.getProperty(PropertyKey.PROP_KEY_ITEM_PER_PAGE).getString();
                }
            }
        } catch (PathNotFoundException e) {
            StringBuilder builder = new StringBuilder();
            builder.append(startPath);
            builder.append(" , itemPerPage: ");
            builder.append(itemPerPage);
            LOG.warn("Impossible to get blogoverview  component properties : startPath : ", builder.toString());
        }
    }

    public TagManagerService getTagManagerService() {
        return tagManagerService;
    }

    public void setTagManagerService(TagManagerService tagManagerService) {
        this.tagManagerService = tagManagerService;
    }

    public SlingScriptHelper getScriptHelper() {
        return scriptHelper;
    }

    public void setScriptHelper(SlingScriptHelper scriptHelper) {
        this.scriptHelper = scriptHelper;
    }
}
