package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by susannat on 7/26/2017.
 */
public class BlogOverviewTemplateModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(BlogOverviewTemplateModel.class);

    private boolean expertQuote;

    private boolean twitterNews;

    @Override
    public void activate() {

        try {

            expertQuote = PagePropertyUtil.initBooleanProp(getCurrentPage(), PropertyKey.PROP_KEY_EXPERT_QUOTE);
            twitterNews = PagePropertyUtil.initBooleanProp(getCurrentPage(), PropertyKey.PROP_KEY_TWITTER_NEWS);

            LOG.info("Expert quote value ", expertQuote);
            LOG.info("Twitter news value ", twitterNews);
            
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public boolean isExpertQuote() {
        return expertQuote;
    }

    public void setExpertQuote(boolean expertQuote) {
        this.expertQuote = expertQuote;
    }

    public boolean isTwitterNews() {
        return twitterNews;
    }

    public void setTwitterNews(boolean twitterNews) {
        this.twitterNews = twitterNews;
    }
}