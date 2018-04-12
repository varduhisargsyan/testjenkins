package com.worldline.core.services;

import com.day.cq.tagging.Tag;

import java.util.List;
import java.util.Locale;
import java.util.Map;

public interface TagManagerService {
    Map<String, String> getTagsByNamespace(String namespace, Locale locale);

    boolean isInBlogNamespace(String name, Locale locale);

    boolean isInCategoryNamespace(String name, Locale locale);

    List<Tag> resolveToTag(String[] propertyTagNames);



}