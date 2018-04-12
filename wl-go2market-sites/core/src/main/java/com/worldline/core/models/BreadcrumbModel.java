package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class BreadcrumbModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(BreadcrumbModel.class);
    private final List<Page> subPages = new ArrayList<>();
    private static final int HOME_PAGE_LEVEL = 4;
    private int pageDepth = 0;

    @Override
    public void activate() {
        try {
            initSubPages();
            pageDepth = getCurrentPage().getDepth();
        } catch (Exception ex) {
            LOG.error(" " + ex);
        }

    }

    private void initSubPages() {
        int level = 3;
        int endLevel = 1;
        int currentLevel = getCurrentPage().getDepth();
        while (level <= currentLevel - endLevel) {
            Page trailPage = getCurrentPage().getAbsoluteParent(level);
            if (trailPage == null) {
                break;
            }
            subPages.add(trailPage);
            level++;
        }
    }

    public List<Page> getSubPages() {
        return subPages;
    }

    public boolean isHomePage() {
        return pageDepth == HOME_PAGE_LEVEL;
    }
}
