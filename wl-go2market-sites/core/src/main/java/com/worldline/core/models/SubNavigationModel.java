package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.exceptions.PageNotFoundException;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by varduhis on 8/16/2017.
 */
public class SubNavigationModel extends WCMUsePojo {


    private List<Page> pages;
    private String jumplinksTitle;
    private boolean isInternalMenuHidden;

    private static final Logger LOG = LoggerFactory.getLogger(SubNavigationModel.class);

    @Override
    public void activate() {
        StringBuilder logMessage = new StringBuilder();
        try {
            jumplinksTitle = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_JUMPLINKS_TITLE);
            isInternalMenuHidden = PagePropertyUtil.initBooleanProp1(getCurrentPage(), PropertyKey.PROP_KEY_HIDE_INTERNAL_MENU);
            logMessage.append(getCurrentPage().getPath());
            logMessage.append(" jumplinksTitle=  ");
            logMessage.append(jumplinksTitle);
            LOG.info("Jumplinks title set for page : ", logMessage.toString());

            pages = getLevelOnePages();
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }


    private List<Page> getLevelOnePages() throws GenericException {

        List<Page> children = new ArrayList<>();
        Page root = null;
        Iterator<Page> it=null;

        /*
        if current page has Sub-Content children :  SubNavigation displays current page Sub-Content children
        else SubNavigation displays current page first  Sub-Content parent's children
         */
        if(getCurrentPage()!=null && getCurrentPage().listChildren().hasNext()){
            root= getCurrentPage();
        }else {
           /*
         get fist Sub-Content Parent
         */
            root = getCurrentPage().getParent();
        }
            if (root == null) {
            StringBuilder exceptionMessage = new StringBuilder();
            exceptionMessage.append("Failed to  get root page for internal menu: No Sub-content parent found for page ");
            exceptionMessage.append(getCurrentPage());
                throw new PageNotFoundException(exceptionMessage.toString());
            }


                LOG.info("Root for Sub-content pages found: ", root.getPath());
                String prop = PagePropertyUtil.initStringProp(root, PropertyKey.PROP_KEY_SHOW_IN);

                if (Validator.isEmpty(prop)) {
                    LOG.warn("Invalid page property /showin/ found for Sub-Content page: property either null or not set to value=top | main");
                }
                it = root.listChildren();
                children.add(root);

                while (it.hasNext()) {
                    Page childPage = it.next();
                    boolean isHidden = PagePropertyUtil.initBooleanPropSelf(childPage, PropertyKey.PROP_KEY_HIDE_IN_NAV);
                    if (!isHidden) {
                        children.add(childPage);
                    }
                }
                return children;

    }


    public void setPages(List<Page> pages) {
        this.pages = pages;
    }


    public List<Page> getPages() {
        return pages;
    }

    public String getJumplinksTitle() {
        return jumplinksTitle;
    }

    public void setJumplinksTitle(String jumplinksTitle) {
        this.jumplinksTitle = jumplinksTitle;
    }

    public boolean isInternalMenuHidden() {
        return isInternalMenuHidden;
    }

    public void setInternalMenuHidden(boolean internalMenuHidden) {
        isInternalMenuHidden = internalMenuHidden;
    }
}
