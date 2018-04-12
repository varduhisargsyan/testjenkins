package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolverImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 10/13/2017.
 */
public class AcceptCookiesModel extends WCMUsePojo {

    private String cookiePolicy;
    private String acceptCookies;
    private String moreInformation;
    private String moreInformationUrl;
    private boolean isExternalMoreInformationUrl;
    private boolean noExtentionMoreInformation;

    private static final Logger LOG = LoggerFactory.getLogger(JCRDataResolverImpl.class);

    @Override
    public void activate() throws Exception {

        cookiePolicy = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_COOKY_POLICY);
        acceptCookies = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_ACCEPT_COOKIES);
        moreInformation = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_MORE_INFORMATION);
        moreInformationUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_MORE_INFORMATION_URL);
        isExternalMoreInformationUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_MORE_INFORMATION);
        noExtentionMoreInformation = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_NO_EXTENTION_MORE_INFORMATION);

    }

    public String getCookiePolicy() {
        return cookiePolicy;
    }

    public void setCookiePolicy(String cookiePolicy) {
        this.cookiePolicy = cookiePolicy;
    }

    public String getAcceptCookies() {
        return acceptCookies;
    }

    public void setAcceptCookies(String acceptCookies) {
        this.acceptCookies = acceptCookies;
    }

    public String getMoreInformation() {
        return moreInformation;
    }

    public void setMoreInformation(String moreInformation) {
        this.moreInformation = moreInformation;
    }

    public boolean isExternalMoreInformationUrl() {
        return isExternalMoreInformationUrl;
    }

    public void setExternalMoreInformationUrl(boolean externalMoreInformationUrl) {
        isExternalMoreInformationUrl = externalMoreInformationUrl;
    }

    public boolean isNoExtentionMoreInformation() {
        return noExtentionMoreInformation;
    }

    public void setNoExtentionMoreInformation(boolean noExtentionMoreInformation) {
        this.noExtentionMoreInformation = noExtentionMoreInformation;
    }

    public String getMoreInformationUrl() {
        return moreInformationUrl;
    }

    public void setMoreInformationUrl(String moreInformationUrl) {
        this.moreInformationUrl = moreInformationUrl;
    }
}
