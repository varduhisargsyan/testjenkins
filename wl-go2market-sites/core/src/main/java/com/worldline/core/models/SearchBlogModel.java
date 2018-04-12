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
public class SearchBlogModel extends WCMUsePojo {
    private String resultPagePath;
    private static final Logger LOG = LoggerFactory.getLogger(SearchBlogModel.class);



    @Override
    public void activate() {
        try {
            Page resultPage = PageUtils.getSearchResultPage(getCurrentPage(), PropertyKey.BLOG);
            resultPagePath=resultPage.getPath();
        }catch (Exception ex){
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
