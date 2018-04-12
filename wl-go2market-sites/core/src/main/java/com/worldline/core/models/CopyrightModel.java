package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 5/12/2017.
 */

public class CopyrightModel extends WCMUsePojo {
    private static final Logger LOG = LoggerFactory.getLogger(CopyrightModel.class);


    private String brand;
    private  String copyright;
    private String terms;
    private String rss;
    private String privacy;
    private String accessibility;
    private String statement1st;
    private String statement2nd;

    private String termsUrl;
    private String rssUrl;
    private String privacyUrl;
    private String accessibilityUrl;
    private String statement1stUrl;
    private String statement2ndUrl;

    private boolean isExternalTermsUrl;
    private boolean isExternalRssUrl;
    private boolean isExternalPrivacyUrl;
    private boolean isExternalAccessUrl;
    private boolean isExternalStatement2ndUrl;
    private boolean isExternalStatement1stUrl;


    @Override
    public void activate() {
        try {
            String key = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_BRAND);
            brand = PagePropertyUtil.getBrandPropertyName(key);

            copyright=PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_COPYRIGHT);
            terms = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_TERMS);
            rss = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_RSS);
            privacy = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_PRIVACY);
            accessibility = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_ACCESS);
            statement1st = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_STATEMENT1ST);
            statement2nd = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_STATEMENT2ND);

            termsUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_TERMS_URL);
            rssUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_RSS_URL);
            privacyUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_PRIVACY_URL);
            accessibilityUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_ACCESS_URL);
            statement1stUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_STATEMENT1ST_URL);
            statement2ndUrl = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_STATEMENT2ND_URL);

            isExternalTermsUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_TERMS_URL);
            isExternalRssUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_RSS_URL);
            isExternalPrivacyUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_PRIVACY_URL);
            isExternalAccessUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_ACCESS_URL);
            isExternalStatement1stUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_STATEMENT1ST_URL);
            isExternalStatement2ndUrl = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_IS_EXTERNAL_STATEMENT2ND_URL);


        }catch (Exception ex){
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getTerms() {
        return terms;
    }

    public void setTerms(String terms) {
        this.terms = terms;
    }

    public String getRss() {
        return rss;
    }

    public void setRss(String rss) {
        this.rss = rss;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }

    public String getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(String accessibility) {
        this.accessibility = accessibility;
    }

    public String getStatement1st() {
        return statement1st;
    }

    public void setStatement1st(String statement1st) {
        this.statement1st = statement1st;
    }

    public String getStatement2nd() {
        return statement2nd;
    }

    public void setStatement2nd(String statement2nd) {
        this.statement2nd = statement2nd;
    }

    public String getTermsUrl() {
        return termsUrl;
    }

    public void setTermsUrl(String termsUrl) {
        this.termsUrl = termsUrl;
    }

    public String getRssUrl() {
        return rssUrl;
    }

    public void setRssUrl(String rssUrl) {
        this.rssUrl = rssUrl;
    }

    public String getPrivacyUrl() {
        return privacyUrl;
    }

    public void setPrivacyUrl(String privacyUrl) {
        this.privacyUrl = privacyUrl;
    }

    public String getAccessibilityUrl() {
        return accessibilityUrl;
    }

    public void setAccessibilityUrl(String accessibilityUrl) {
        this.accessibilityUrl = accessibilityUrl;
    }

    public String getStatement1stUrl() {
        return statement1stUrl;
    }

    public void setStatement1stUrl(String statement1stUrl) {
        this.statement1stUrl = statement1stUrl;
    }

    public String getStatement2ndUrl() {
        return statement2ndUrl;
    }

    public void setStatement2ndUrl(String statement2ndUrl) {
        this.statement2ndUrl = statement2ndUrl;
    }

    public boolean isExternalTermsUrl() {
        return isExternalTermsUrl;
    }

    public void setExternalTermsUrl(boolean externalTermsUrl) {
        isExternalTermsUrl = externalTermsUrl;
    }

    public boolean isExternalRssUrl() {
        return isExternalRssUrl;
    }

    public void setExternalRssUrl(boolean externalRssUrl) {
        isExternalRssUrl = externalRssUrl;
    }

    public boolean isExternalPrivacyUrl() {
        return isExternalPrivacyUrl;
    }

    public void setExternalPrivacyUrl(boolean externalPrivacyUrl) {
        isExternalPrivacyUrl = externalPrivacyUrl;
    }

    public boolean isExternalAccessUrl() {
        return isExternalAccessUrl;
    }

    public void setExternalAccessUrl(boolean externalAccessUrl) {
        isExternalAccessUrl = externalAccessUrl;
    }

    public boolean isExternalStatement2ndUrl() {
        return isExternalStatement2ndUrl;
    }

    public void setExternalStatement2ndUrl(boolean externalStatement2ndUrl) {
        isExternalStatement2ndUrl = externalStatement2ndUrl;
    }

    public boolean isExternalStatement1stUrl() {
        return isExternalStatement1stUrl;
    }

    public void setExternalStatement1stUrl(boolean externalStatement1stUrl) {
        isExternalStatement1stUrl = externalStatement1stUrl;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }
}
