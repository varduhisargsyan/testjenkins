package com.worldline.core.services;

import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.ArticleBriefItem;
import org.apache.sling.api.SlingHttpServletRequest;

import java.util.List;
import java.util.Locale;

public interface JCRDataResolver {

    List<ArticleBriefItem> getPaginationData(String[] startPaths, String[] tags, String itemPerPage, String selector, String orderBy, String orderSort, SlingHttpServletRequest request) throws GenericException;

    List<ArticleBriefItem> getBlogArticles(String startPath, String selector, String itemPerPage,
                                           String category, String[] tags, String orderBy, String orderSort, SlingHttpServletRequest request, Locale locale) throws GenericException;

    List<ArticleBriefItem> getReleaseArticles(String [] startPath, String itemPerPage,
                                              String [] categories, String[] tags, String orderBy, String orderSort, String releaseImagePath, SlingHttpServletRequest request) throws GenericException;

    String getMatches();

    void deleteProperty(String a, String b);

}
