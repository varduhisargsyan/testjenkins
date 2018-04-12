package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Iterator;

/**
 * Created by varduhis on 5/29/2017.
 */
public class LogoModel extends WCMUsePojo {
    /*
    placeholder to be used to built the image path
     */
    private String brand;
    /*
    link to home  page
     */
    private String link;

    /*
    Corresponds to gotomarket Site/en
     */
    private static final int LVL_2 = 2;
    private static final Logger LOG = LoggerFactory.getLogger(LogoModel.class);

    @Override
    public void activate() {
        try {
            brand = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_BRAND);
            if (brand != null) {
                Page absoluteParent = getCurrentPage().getAbsoluteParent(LVL_2);
                Iterator<Page> children = absoluteParent.listChildren();
                /*
                   To get HOME page link
                */
                while (children.hasNext()) {
                    Page pageLvl3 = children.next();
                    if (PropertyKey.HOME.equals(pageLvl3.getName())) {
                        link = pageLvl3.getPath();
                        break;
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
