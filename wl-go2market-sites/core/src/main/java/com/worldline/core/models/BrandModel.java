package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 8/15/2017.
 */
public class BrandModel extends WCMUsePojo {

    private String brand;

    private boolean showBrand;

    private static final Logger LOG = LoggerFactory.getLogger(BrandModel.class);

    private String brandKey;

    private String browserTabTitle;

    @Override
    public void activate() {
        try {
            brandKey = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_BRAND);
            showBrand = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_SHOW_BRAND);
            brand = PagePropertyUtil.getBrandPropertyName(brandKey) + " | ";
            browserTabTitle = PagePropertyUtil.initStringPropSelf(getCurrentPage(), PropertyKey.PROP_KEY_BROWSER_TAB_TITLE);
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }


    public void setBrand(String brand) {
        this.brand = brand;
    }

    public boolean isShowBrand() {
        return showBrand;
    }

    public String getBrand() {
        return brand;
    }

    public String getBrandKey() {
        return brandKey;
    }

    public void setBrandKey(String brandKey) {
        this.brandKey = brandKey;
    }

    public String getBrowserTabTitle() {
        return browserTabTitle;
    }

    public void setBrowserTabTitle(String browserTabTitle) {
        this.browserTabTitle = browserTabTitle;
    }
}