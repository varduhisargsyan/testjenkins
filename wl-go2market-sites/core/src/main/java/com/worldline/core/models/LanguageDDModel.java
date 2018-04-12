package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PageUtils;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by susannat on 8/21/2017.
 */
public class LanguageDDModel extends WCMUsePojo {

    private boolean isLangPage;
    private static final Logger LOG = LoggerFactory.getLogger(LanguageDDModel.class);
    private List<Page> langList = new ArrayList<>();

    @Override
    public void activate() {
        try {
            Page parent = PageUtils.getApplicationRoot(getCurrentPage());
            LOG.info("Application Root is defined "+ parent.getPath());
            Iterator<Page> children = parent.listChildren();
            while (children.hasNext()) {
                Page childPage = children.next();
                LOG.info("Found application root child : "+ childPage.getPath());
                isLangPage = PagePropertyUtil.initBooleanPropSelf(childPage, PropertyKey.PROP_KEY_LANG);
                if (isLangPage) {
                   LOG.info("Language Pages URL ", childPage.getPath());
                    langList.add(childPage);
                }
            }
            LOG.info(langList.toString());
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public boolean isLangPage() {
        return isLangPage;
    }

    public void setLangPage(boolean langPage) {
        isLangPage = langPage;
    }

    public List<Page> getLangList() {
        return langList;
    }

    public void setLangList(List<Page> langList) {
        this.langList = langList;
    }
}
