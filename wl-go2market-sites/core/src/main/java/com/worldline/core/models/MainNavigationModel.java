package com.worldline.core.models;


import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.NavChildPage;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.rmi.runtime.Log;

import java.util.*;

public class MainNavigationModel extends WCMUsePojo {

    private static final int DEFAULT_ITEM_SIZE = 11;
    private static final Logger LOG = LoggerFactory.getLogger(MainNavigationModel.class);
    private int subNavigationItemsSize;

    @Override
    public void activate() {
        String propMenuItemSize = "";
        try {
            propMenuItemSize = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_MAIN_MENU_ITEM_SIZE);

            subNavigationItemsSize = Validator.isEmpty(propMenuItemSize) ? DEFAULT_ITEM_SIZE : Integer.valueOf(propMenuItemSize);
        } catch (NumberFormatException ex) {
            StringBuilder errorMessage = new StringBuilder();
            errorMessage.append("Invalid property found: subMenuSize ");
            errorMessage.append(propMenuItemSize);
            errorMessage.append(" default item size will be used");
            LOG.warn(errorMessage.toString());
            subNavigationItemsSize = DEFAULT_ITEM_SIZE;
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    /*
    to get all children of /root/lang page
     */
    public List<NavChildPage> getLangPagesThree() {
/*
         *  To retrieve the parent on LVL 2 /root/lang
         */
        Page root = getCurrentPage().getAbsoluteParent(2);
        if (root != null) {
            Iterator<Page> children_LVL_2 = root.listChildren();
            if (children_LVL_2 != null) {
                while (children_LVL_2.hasNext()) {
                    Page page = children_LVL_2.next();
                    if (PropertyKey.HOME.equals(page.getName())) {
                        return getChildPages(page);
                    }
                }
            }
            LOG.info("Children of LVL_2 is null");
        }
        LOG.info("Root page is null ", root);
        return null;
    }

    /**
     * Method which returns list of pages and corresponding child pages

     * @param homePage Current page from which page to get child pages
     * @return List of pages and corresponding child pages
     */
    private List<NavChildPage> getChildPages(Page homePage) {

        List<NavChildPage> pages = new ArrayList<>();
        try {
            Iterator<Page> children = homePage.listChildren();
            while (children.hasNext()) {
                Page next = children.next();
                final String showProperty = PagePropertyUtil.initStringProp(next, PropertyKey.PROP_KEY_SHOW_IN);
                final String pageIcon = PagePropertyUtil.initStringPropSelf(next, PropertyKey.PROP_KEY_ICON_CLASS_MAIN);
                final boolean isHidden = PagePropertyUtil.initBooleanPropSelf(next, PropertyKey.PROP_KEY_HIDE_IN_NAV);
                if (PropertyKey.PROP_VALUE_MAIN.equals(showProperty) && !isHidden) {
                    NavChildPage navChildPage = new NavChildPage(next.getPath(), next.getTitle(), next.getName(), PropertyKey.PROP_VALUE_MAIN, pageIcon);
                    navChildPage.setChildren(getChildPages(next));
                    pages.add(navChildPage);
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
        return pages;
    }

    public int getSubNavigationItemsSize() {
        return subNavigationItemsSize;
    }
}