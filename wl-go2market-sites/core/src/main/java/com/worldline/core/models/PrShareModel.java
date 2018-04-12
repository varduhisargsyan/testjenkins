package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.SocialIcon;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PageUtils;
import com.worldline.core.models.util.PropertyKey;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.scripting.core.ScriptHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by davitp on 6/27/2017.
 */
public class PrShareModel extends WCMUsePojo {

    private String prShareText;
    private List<SocialIcon> socials=new ArrayList<>();
    private String articleUrl;

    private static final Logger LOG = LoggerFactory.getLogger(PrShareModel.class);

    @Override
    public void activate() {
        try {
            socials = PagePropertyUtil.initSocials(getCurrentPage(), PropertyKey.PROP_KEY_ASOCIALS);
            LOG.info("aSocials   "+ socials.toString());
            ResourceResolver resourceResolver = getSlingScriptHelper().getRequest().getResourceResolver();
            Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);

           Page appRoot= PageUtils.getApplicationRoot(getCurrentPage());
            LOG.info("Application root "+ appRoot.getName());

            articleUrl= externalizer.externalLink(resourceResolver,appRoot.getName(), getCurrentPage().getPath())+".html";

             LOG.info("Domain " +appRoot.getName()+ " to be used for  resource URL  "+  articleUrl);
            prShareText = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_SHARE_TEXT);
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public String getPrShareText() {
        return prShareText;
    }

    public void setPrShareText(String prShareText) {
        this.prShareText = prShareText;
    }

    public List<SocialIcon> getSocials() {
        return socials;
    }

    public void setSocials(List<SocialIcon> socials) {
        this.socials = socials;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
    }
}

