package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 9/22/2017.
 */
public class GoogleDataModel extends WCMUsePojo {

    private String codeAnalytics;
    private String headTags;
    private String bodyTags;
    private static final Logger LOG = LoggerFactory.getLogger(GoogleDataModel.class);

    @Override
    public void activate() throws Exception {
        try {
            codeAnalytics = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_GOOGLE_ANALYTICS);
            headTags = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_GOOGLE_HEAD_TAG);
            bodyTags = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_GOOGLE_BODY_TAG);
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public String getCodeAnalytics() {
        return codeAnalytics;
    }

    public void setCodeAnalytics(String codeAnalytics) {
        this.codeAnalytics = codeAnalytics;
    }

    public String getHeadTags() {
        return headTags;
    }

    public void setHeadTags(String headTags) {
        this.headTags = headTags;
    }

    public String getBodyTags() {
        return bodyTags;
    }

    public void setBodyTags(String bodyTags) {
        this.bodyTags = bodyTags;
    }
}
