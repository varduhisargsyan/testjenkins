package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.NavChildPage;
import com.worldline.core.models.data.SocialIcon;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.rmi.runtime.Log;

import java.util.*;

/**
 * Created by varduhis on 5/24/2017.
 */
public class FooterModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(FooterModel.class);

    //corresponds to /gotomarket Site/en
    private static final int LVL_2 = 2;
    private static final String HTTP = "http";
    /*
    placeholder to be used to built the image path
     */
    private String brand;
    private boolean followus;
    private String fuTitle;
    private String fuText;
    private boolean newsletter;
    private String nlTitle;
    private String nlText;
    private String nlButton;
    private String nlButtonUrl;
    private String nlEmailInputPlaceholder;
    private String sitemapTitle;
    private List<SocialIcon> socials;
    private List<NavChildPage> pageItems;
    private boolean isExternal;


    @Override
    public void activate() {
        try {
            socials = PagePropertyUtil.initSocials(getCurrentPage(), PropertyKey.PROP_KEY_SOCIALS);
            brand = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_BRAND);

            followus = PagePropertyUtil.initBooleanProp(getCurrentPage(), PropertyKey.PROP_KEY_FOLLOW_US);
            fuTitle = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_FOLLOW_US_TITLE);
            fuText = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_FOLLOW_US_TEXT);

            newsletter = PagePropertyUtil.initBooleanProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM);
            nlTitle = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM_TITLE);
            nlText = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM_TEXT);
            nlButton = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM_BUTTON);
            nlButtonUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM_BUTTON_URL);
            checkForExternalUrl(nlButtonUrl);
            nlEmailInputPlaceholder = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_NEWSLETTER_FORM_PLACEHOLDER);
            sitemapTitle = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_SITEMAP_TITLE);
            pageItems = generateSitemap();
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

    }

    private void checkForExternalUrl(String buttonUrl) {
        if (buttonUrl != null && !buttonUrl.isEmpty() && buttonUrl.toLowerCase().startsWith(HTTP)) {
            isExternal = true;
        }
    }

    private List<NavChildPage> generateSitemap() {
        Page absoluteParent = getCurrentPage().getAbsoluteParent(LVL_2);
        List<NavChildPage> pages = new ArrayList<>();

        Iterator<Page> itLvl3 = absoluteParent.listChildren();

        while (itLvl3.hasNext()) {
            Page pageLvl3 = itLvl3.next();

            if (PropertyKey.HOME.equals(pageLvl3.getName())) {
                   /*
                   To get home page direct children (LVL4)to be listed in sitemap
                    */
                Iterator<Page> itLvl4 = pageLvl3.listChildren();

                while (itLvl4.hasNext()) {

                    Page pageLvl4 = itLvl4.next();

                    String value = PagePropertyUtil.initStringProp(pageLvl4, PropertyKey.PROP_KEY_SHOW_IN);
                    boolean isHidden = PagePropertyUtil.initBooleanPropSelf(pageLvl4, PropertyKey.PROP_KEY_HIDE_IN_NAV);

                    if (value != null && !isHidden) {
                        NavChildPage page = new NavChildPage(pageLvl4.getPath(), pageLvl4.getTitle(), value, "");
                        pages.add(page);
                    }

                }
                return pages;
            }
        }
        return pages;
    }

    public List<NavChildPage> getPageItems() {
        /**
         * In order for pages to be displayed in sorted order: children with top property first  should come first in sitemap
         */
        Collections.sort(pageItems, new Comparator<NavChildPage>() {

            @Override
            public int compare(NavChildPage o1, NavChildPage o2) {
                return o2.getShowin().compareTo(o1.getShowin());
            }
        });

        return pageItems;
    }

    public String getSitemapTitle() {
        return sitemapTitle;
    }

    public void setSitemapTitle(String sitemapTitle) {
        this.sitemapTitle = sitemapTitle;
    }

    public void setPageItems(List<NavChildPage> pageItems) {
        this.pageItems = pageItems;
    }

    public List<SocialIcon> getSocials() {
        return socials;
    }

    public void setSocials(List<SocialIcon> socials) {
        this.socials = socials;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public boolean isNewsletter() {
        return newsletter;
    }

    public void setNewsletter(boolean newsletter) {
        this.newsletter = newsletter;
    }

    public boolean isFollowus() {
        return followus;
    }

    public void setFollowus(boolean followus) {
        this.followus = followus;
    }

    public String getFuTitle() {
        return fuTitle;
    }

    public void setFuTitle(String fuTitle) {
        this.fuTitle = fuTitle;
    }

    public String getFuText() {
        return fuText;
    }

    public void setFuText(String fuText) {
        this.fuText = fuText;
    }

    public String getNlTitle() {
        return nlTitle;
    }

    public void setNlTitle(String nlTitle) {
        this.nlTitle = nlTitle;
    }

    public String getNlText() {
        return nlText;
    }

    public void setNlText(String nlText) {
        this.nlText = nlText;
    }

    public String getNlButton() {
        return nlButton;
    }

    public void setNlButton(String nlButton) {
        this.nlButton = nlButton;
    }

    public String getNlEmailInputPlaceholder() {
        return nlEmailInputPlaceholder;
    }

    public void setNlEmailInputPlaceholder(String nlEmailInputPlaceholder) {
        this.nlEmailInputPlaceholder = nlEmailInputPlaceholder;
    }

    public String getNlButtonUrl() {
        return nlButtonUrl;
    }

    public void setNlButtonUrl(String nlButtonUrl) {
        this.nlButtonUrl = nlButtonUrl;
    }

    public boolean isExternal() {
        return isExternal;
    }

    public void setExternal(boolean external) {
        isExternal = external;
    }


}