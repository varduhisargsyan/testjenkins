package com.worldline.core.models;


import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMMode;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.exceptions.InvalidSelectorException;
import com.worldline.core.util.GlobalKeys;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by varduhis on 1/19/2018.
 */
/*
if page has selectors  - validation is take place here
ex.Newsroom.html
 */
@Model(adaptables = SlingHttpServletRequest.class)
public class PageSelectorModel {

    @Inject
    private SlingHttpServletResponse response;

    @Inject
    private SlingHttpServletRequest request;

    @Inject
    private ResourceResolver resourceResolver;

    private String orderByDate = "date";
    private String orderByTitle = "title";
    private String sortAsc = "asc";
    private String sortDesc = "desc";
    private String selector_nocache = "nocache";


    private List<String> selectors = new ArrayList<>();
    private static final Logger LOG = LoggerFactory.getLogger(PageSelectorModel.class);


    @PostConstruct
    protected void init() throws IOException, GenericException {
        try {

            selectors = Arrays.asList(request.getRequestPathInfo().getSelectors());

            if (selectors.isEmpty()) {
                LOG.info("Provided empty selector list");
                return;
            }else if (selectors.size()!=3){
                throw new InvalidSelectorException("Provided invalid selector list: expected 3 found "+ selectors.size());
            }

            setSelectorPage(selectors.get(0));
            setSelectorOrder(selectors.get(1));
            setSelectorSort(selectors.get(2));


        } catch (Exception ex) {
            LOG.error(" " + ex);
            //redirect to the first overview page ex.  newsroom.html
            Resource jcrContent = request.getResourceResolver().getParent(request.getResource());
            if (jcrContent != null) {
                Resource resourcePage = jcrContent.getParent();
                if (resourcePage != null) {
                    Page currentPage = resourcePage.adaptTo(Page.class);
                    if (currentPage == null) {
                        throw new GenericException("Failed to adapt resource to page: current page is null");
                    }
                    LOG.error("Request will be redirected to  " + currentPage.getPath() + ".html");
                    response.sendRedirect(currentPage.getPath() + ".html");

                }
            }


        }
    }

    public String getOrderByDate() {
        return orderByDate;
    }

    public String getOrderByTitle() {
        return orderByTitle;
    }

    public String getSortAsc() {
        return sortAsc;
    }

    public String getSortDesc() {
        return sortDesc;
    }

    public void setSelectorPage(String selectorPage) throws Exception {
        try {
            int aSelector = Integer.parseInt(selectorPage);
        } catch (Exception ex) {
            throw new InvalidSelectorException("Invalid selectorPage found" + selectorPage);
        }
    }


    public void setSelectorOrder(String selectorOrder) throws InvalidSelectorException {

        if (GlobalKeys.ORDER_BY_TITLE.equalsIgnoreCase(selectorOrder) || GlobalKeys.ORDER_BY_DATE.equalsIgnoreCase(selectorOrder)) {
            return;
        }

        throw new InvalidSelectorException("Invalid selectorOrder found " + selectorOrder);
    }

    public void setSelectorSort(String selectorSort) throws InvalidSelectorException {

        if (GlobalKeys.ORDER_SORT_ASC.equalsIgnoreCase(selectorSort) || GlobalKeys.ORDER_SORT_DESC.equalsIgnoreCase(selectorSort)) {

            return;
        }
        throw new InvalidSelectorException("Invalid selectorSort found " + selectorSort);

    }

    public SlingHttpServletResponse getResponse() {
        return response;
    }

    public void setResponse(SlingHttpServletResponse response) {
        this.response = response;
    }

    public SlingHttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(SlingHttpServletRequest request) {
        this.request = request;
    }
}
