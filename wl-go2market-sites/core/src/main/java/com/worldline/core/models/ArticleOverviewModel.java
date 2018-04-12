package com.worldline.core.models;

import com.adobe.acs.commons.errorpagehandler.impl.ErrorPageHandlerImpl;
import com.day.cq.wcm.api.WCMMode;
import com.drew.lang.StringUtil;
import com.worldline.core.exceptions.InvalidSelectorException;
import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolver;
import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.rmi.runtime.Log;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.*;

@Model(adaptables = SlingHttpServletRequest.class)
public class ArticleOverviewModel {

    private static final Logger LOG = LoggerFactory.getLogger(ArticleOverviewModel.class);

    private String message;

    private List<ArticleBriefItem> pageList = null;

    private ArticleBriefItem page = null;

    @Inject
    private SlingHttpServletRequest request;

    @Inject
    private SlingHttpServletResponse response;
    @ValueMapValue(name = "startPaths", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] startPaths;

    @ValueMapValue(name = "itemsPerPage", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String itemsPerPage;

    @ValueMapValue(name = "tags", injectionStrategy = InjectionStrategy.OPTIONAL)
    private String[] tags;

    @Inject
    JCRDataResolver jcrDataResolver;

    @Inject
    private ResourceResolver resolver;

    private String orderByDate = "date";
    private String orderByTitle = "title";
    private String sortAsc = "asc";
    private String sortDesc = "desc";

    private String selectorPage = null;
    private String selectorOrder = null;
    private String selectorSort = null;

    private String defaultSelectorPage = "0";
    private String defaultSelectorOrder = "date";
    private String defaultSelectorSort = "desc";
    private String defaultItemPerPage = "10";
    private String selector_nocache = "nocache";
    List<String> selectors = new ArrayList<>();


      /*
      SDI is enabled for overview component  thus
       nocache selector  is appended to the request URL to  to make dispatcher not cache the component's content
      if: URL has one selector=nocache => default selectors will be used

      IMPORTANT !!!  KNOWN THAT  SDI MUST NOT BE ENABLED ON AUTHOR INSTANCE
       */

    @PostConstruct
    protected void init() throws Exception {

        try {
            selectors = Arrays.asList(request.getRequestPathInfo().getSelectors());

            if (selectors.isEmpty() || selector_nocache.equals(selectors.get(0))) {
                LOG.info("RequestPath info provided empty selector list : defaults will be applied");
                this.selectorPage = defaultSelectorPage;
                this.selectorOrder = defaultSelectorOrder;
                this.selectorSort = defaultSelectorSort;

            } else {
                setSelectorPage(selectors.get(0));
                setSelectorOrder(selectors.get(1));
                setSelectorSort(selectors.get(2));

            }
            LOG.info("Selector [0] bind " + this.selectorPage);
            LOG.info("Selector [1] bind " + this.selectorOrder);
            LOG.info("Selector [2] bind " + this.selectorSort);

            itemsPerPage = itemsPerPage != null ? itemsPerPage : defaultItemPerPage;

            this.pageList = jcrDataResolver.getPaginationData(startPaths, tags, itemsPerPage, this.selectorPage,
                    this.selectorOrder, this.selectorSort, request);
            this.message = jcrDataResolver.getMatches();

        } catch (Exception ex) {
            LOG.error("Oops ! " + ex);

        }

    }

    public String getMessage() {
        return this.message;
    }

    public List<ArticleBriefItem> getPageList() {
        return pageList;
    }

    public String[] getStartPaths() {
        return startPaths;
    }

    public void setStartPaths(String[] startPaths) {
        this.startPaths = startPaths;
    }

    public ArticleBriefItem getPage() {
        return page;
    }

    public void setPage(ArticleBriefItem page) {
        this.page = page;
    }

    public String getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(String itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
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

    public String getSelectorPage() {
        return selectorPage;
    }

    public void setSelectorPage(String selectorPage) throws Exception {
        try {
            int aSelector = Integer.parseInt(selectorPage);
            this.selectorPage = selectorPage;
        } catch (Exception ex) {
            throw new InvalidSelectorException("Invalid selectorPage found" + selectorPage);
        }
    }

    public String getSelectorOrder() {
        return selectorOrder;
    }

    public void setSelectorOrder(String selectorOrder) throws InvalidSelectorException {

        if (GlobalKeys.ORDER_BY_TITLE.equalsIgnoreCase(selectorOrder) || GlobalKeys.ORDER_BY_DATE.equalsIgnoreCase(selectorOrder)) {
            this.selectorOrder = selectorOrder.toLowerCase();
            return;
        }

        throw new InvalidSelectorException("Invalid selectorOrder found " + selectorOrder);
    }

    public String getSelectorSort() {
        return selectorSort;
    }

    public void setSelectorSort(String selectorSort) throws InvalidSelectorException {

        if (GlobalKeys.ORDER_SORT_ASC.equalsIgnoreCase(selectorSort) || GlobalKeys.ORDER_SORT_DESC.equalsIgnoreCase(selectorSort)) {

            this.selectorSort = selectorSort.toLowerCase();
            return;
        }
        throw new InvalidSelectorException("Invalid selectorSort found " + selectorSort);

    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }


}
