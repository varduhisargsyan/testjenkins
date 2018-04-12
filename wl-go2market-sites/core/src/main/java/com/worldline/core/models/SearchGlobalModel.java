package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.util.PageUtils;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 8/14/2017.
 */
public class SearchGlobalModel extends WCMUsePojo {
    private String resultPagePath;
    private static final Logger LOG = LoggerFactory.getLogger(SearchGlobalModel.class);

    /*
    corresponds to /gotomarket Site/en
 */
    private static final int LVL_2 = 2;


    @Override
    public void activate() {
        try {
            Page parentLVL2 = getCurrentPage().getAbsoluteParent(LVL_2);
            LOG.info("Search result page path is set to "+ parentLVL2.getPath()+ " for search");
            Page resultPage = PageUtils.getSearchResultPage(getCurrentPage(), parentLVL2.getName());
            resultPagePath = resultPage.getPath();

        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

    }

    public String getResultPagePath() {
        return resultPagePath;
    }

    public void setResultPagePath(String resultPagePath) {
        this.resultPagePath = resultPagePath;
    }
}
