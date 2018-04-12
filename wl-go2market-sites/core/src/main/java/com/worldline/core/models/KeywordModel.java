package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by varduhis on 8/18/2017.
 */
public class KeywordModel extends WCMUsePojo {
    String keywords;
    private static final Logger LOG = LoggerFactory.getLogger(KeywordModel.class);

    @Override
    public void activate() {
        try {
           keywords = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_KEYWORDS);

            if (Validator.isEmpty(keywords)) {
                keywords = "";
                LOG.warn("Invalid property keywords: not set");
                return;
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
