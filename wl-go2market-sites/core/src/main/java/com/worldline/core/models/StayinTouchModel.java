package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.SocialIcon;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PageUtils;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JCRDataResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created by varduhis on 5/15/2017.
 */
public class StayinTouchModel extends WCMUsePojo {

    private String title;
    private String imagePath;
    private String contactUsUrl;
    private String contactUs;
    private String joinUs;
    private String joinUsUrl;
    private boolean isExternalUrlJoinUs;
    private boolean isExternalUrlContactUs;
    private boolean noExtentionJoinUs;
    private boolean noExtentionContactUs;
    private boolean isStickyContactHidden;

    private List<SocialIcon> socials ;

    private static final Logger LOG = LoggerFactory.getLogger(StayinTouchModel.class);

    @Override
    public void activate() {
        try {
            Page home= PageUtils.getChildByLevel(getCurrentPage(), PropertyKey.HOME, 2);

            socials = PagePropertyUtil.initSocials(home, PropertyKey.PROP_KEY_SOCIALS);
            title = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_TITLE);
            imagePath = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_IMAGE_PATH);

            contactUs = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_CONTACT_US);
            contactUsUrl = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_CONTACT_US_URL);

            joinUs = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_JOIN_US);
            joinUsUrl = PagePropertyUtil.initStringProp(home, PropertyKey.PROP_KEY_JOIN_US_URL);

            isExternalUrlJoinUs = PagePropertyUtil.initBooleanProp1(home, PropertyKey.PROP_KEY_IS_EXTERNAL_JOIN_US_URL);
            isExternalUrlContactUs= PagePropertyUtil.initBooleanProp1(home, PropertyKey.PROP_KEY_IS_EXTERNAL_CONTACT_US_URL);
            noExtentionJoinUs = PagePropertyUtil.initBooleanProp1(home, PropertyKey.PROP_KEY_NO_EXTENTION_JOIN_US);

            noExtentionContactUs = PagePropertyUtil.initBooleanProp1(home, PropertyKey.PROP_KEY_NO_EXTENTION_CONTACT_US);
            isStickyContactHidden = PagePropertyUtil.initBooleanProp1(home, PropertyKey.PROP_KEY_IS_STICKY_CONTACT_HIDDEN);

        } catch (Exception ex) {
            LOG.error(ex.toString());
        }
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getContactUs() {
        return contactUs;
    }

    public void setContactUs(String contactUs) {
        this.contactUs = contactUs;
    }

    public String getJoinUs() {
        return joinUs;
    }

    public void setJoinUs(String joinUs) {
        this.joinUs = joinUs;
    }

    public List<SocialIcon> getSocials() {
        return socials;
    }

    public void setSocials(List<SocialIcon> socials) {
        this.socials = socials;
    }

    public String getContactUsUrl() {
        return contactUsUrl;
    }

    public void setContactUsUrl(String contactUsUrl) {
        this.contactUsUrl = contactUsUrl;
    }

    public String getJoinUsUrl() {
        return joinUsUrl;
    }

    public void setJoinUsUrl(String joinUsUrl) {
        this.joinUsUrl = joinUsUrl;
    }

    public boolean isExternalUrlJoinUs() {
        return isExternalUrlJoinUs;
    }

    public void setExternalUrlJoinUs(boolean externalUrlJoinUs) {
        isExternalUrlJoinUs = externalUrlJoinUs;
    }

    public boolean isExternalUrlContactUs() {
        return isExternalUrlContactUs;
    }

    public void setExternalUrlContactUs(boolean externalUrlContactUs) {
        isExternalUrlContactUs = externalUrlContactUs;
    }

    public boolean isNoExtentionJoinUs() {
        return noExtentionJoinUs;
    }

    public void setNoExtentionJoinUs(boolean noExtentionJoinUs) {
        this.noExtentionJoinUs = noExtentionJoinUs;
    }

    public boolean isNoExtentionContactUs() {
        return noExtentionContactUs;
    }

    public void setNoExtentionContactUs(boolean noExtentionContactUs) {
        this.noExtentionContactUs = noExtentionContactUs;
    }

    public boolean isStickyContactHidden() {
        return isStickyContactHidden;
    }

    public void setStickyContactHidden(boolean stickyContactHidden) {
        isStickyContactHidden = stickyContactHidden;
    }
}
