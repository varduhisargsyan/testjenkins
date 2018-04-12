package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.NavChildPage;
import com.worldline.core.models.data.SocialIcon;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by varduhis on 5/22/2017.
 */
public class TopNavigationModel extends WCMUsePojo {


    private List<SocialIcon> socials=new ArrayList<>();
    private List<NavChildPage> pages=new ArrayList<>();
    private static final Logger LOG = LoggerFactory.getLogger(TopNavigationModel.class);


    @Override
    public void activate() {
        try {
            pages = getPages(getCurrentPage());
            socials = PagePropertyUtil.initSocials(getCurrentPage(), PropertyKey.PROP_KEY_SOCIALS);
            LOG.info("Social media icons are set :"+ socials.toString());
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

    }

    /*
       corresponds to /gotomarket Site/en
    */
    private static final int LVL_2 = 2;


    private List<NavChildPage> getPages(Page currentPage) {
        List<NavChildPage> topPages = new ArrayList<>();
        if (currentPage != null) {
            Page rootPage = currentPage.getAbsoluteParent(LVL_2);

            if (rootPage != null) {
                Iterator<Page> rootChildren = rootPage.listChildren();
                while (rootChildren.hasNext()) {

                    Page rootChild = rootChildren.next();
                    /*
                    search for home page (LVL3) to get children list
                     */
                    if (PropertyKey.HOME.equals(rootChild.getName())) {

                        Iterator<Page> homeChildren = rootChild.listChildren();

                        while (homeChildren.hasNext()) {
                            Page homeChild = homeChildren.next();
                            String showinValue = PagePropertyUtil.initStringProp(homeChild, PropertyKey.PROP_KEY_SHOW_IN);
                            boolean isHidden = PagePropertyUtil.initBooleanPropSelf(homeChild, PropertyKey.PROP_KEY_HIDE_IN_NAV);


                            if (PropertyKey.PROP_VALUE_TOP.equals(showinValue) && !isHidden) {
                                String iconClassValue = PagePropertyUtil.initStringProp(homeChild, PropertyKey.PROP_KEY_ICON_CLASS_TOP);

                                NavChildPage topPage = new NavChildPage(homeChild.getPath(), homeChild.getTitle(), homeChild.getName(), iconClassValue);
                                topPages.add(topPage);
                            }

                        }
                        return topPages;
                    }
                }

            }

        }
        return topPages;
    }

    public List<NavChildPage> getPages() {
        return pages;
    }

    public void setPages(List<NavChildPage> pages) {
        this.pages = pages;
    }

    public List<SocialIcon> getSocials() {
        return socials;
    }

    public void setSocials(List<SocialIcon> socials) {
        this.socials = socials;
    }
}

