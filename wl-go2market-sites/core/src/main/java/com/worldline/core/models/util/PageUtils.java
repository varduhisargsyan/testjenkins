package com.worldline.core.models.util;

import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.PageNotFoundException;
import com.worldline.core.models.StayinTouchModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Iterator;

/**
 * Created by susannat on 8/10/2017.
 */
public class PageUtils {

    private static final int ROOT_LEVEL = 1;
    private static final Logger LOG = LoggerFactory.getLogger(PageUtils.class);

    private PageUtils() {
        // DO NOTHING
    }

    public static Page getApplicationRoot(Page currentPage) throws PageNotFoundException {
        try {
            return currentPage.getAbsoluteParent(ROOT_LEVEL);
        } catch (Exception ex) {
            throw new PageNotFoundException("Failed to retrieve application root");
        }
    }

    public static Page getChildByLevel(Page currentPage, String childName, int level) throws PageNotFoundException {
        Page child=null;
        try {
           Page root= currentPage.getAbsoluteParent(level);

           Iterator<Page> rootChildren=root.listChildren();
           while (rootChildren.hasNext()){
               child=rootChildren.next();
               if(childName.equals(child.getName())){
                   LOG.info("Root children found "+ childName);
                   return child;
               }
           }
            LOG.info("Root children not found "+ childName + "  root "+ root.getPath());
        } catch (Exception ex) {
            throw new PageNotFoundException("Failed to retrieve application root");
        }

       return child;
    }

    public static Page getParentByName(Page currentPage, String parentName) throws PageNotFoundException {
        if (currentPage == null) {
            throw new PageNotFoundException("Fail to retrieve page parent ");
        }

        if (parentName.equals(currentPage.getName())) {
            return currentPage;

        }
        return getParentByName(currentPage.getParent(), parentName);
    }

    public static Page getChildByName(Page parent, String childName) throws PageNotFoundException {
        if (parent == null) {
            throw new PageNotFoundException("Fail to retrieve page parent: null");
        }
        if (childName == null) {
            throw new PageNotFoundException("Invalid child name parameter: null");
        }
        if (parent.getName().equals(childName)) {
            return parent;
        }

        final Iterator<Page> it = parent.listChildren();
        Page child = null;
        while (it.hasNext()) {
            child = it.next();
            if (childName.equals(child.getName())) {
                break;
            }
        }
        return child;
    }

    public static Page getSearchResultPage(Page currentPage, String pageName) throws PageNotFoundException {
        /*
        to get parent by specified name
         */
        final Page root = getParentByName(currentPage, pageName);
       /*
       to get search result page under  theroot
        */
        final Page resultPage = getChildByName(root, PropertyKey.SEARCH);
        if (resultPage == null) {
            throw new PageNotFoundException("Cant retrieve  search result page  under the path :" + root.getPath());
        }
        return resultPage;
    }

}
