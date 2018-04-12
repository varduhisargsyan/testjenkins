package com.worldline.core.services;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.ArticleBriefItem;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.internal.util.reflection.Whitebox;

import javax.jcr.Session;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;
import static org.mockito.Matchers.anyObject;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Created by davitp on 9/11/2017.
 */
public class JCRDataResolverImplTest {

    @Spy
    JCRDataResolverImpl jcrDataResolver = new JCRDataResolverImpl();

    @Mock
    private ResourceResolverFactory resolverFactory;

    @Mock
    private QueryBuilder builder;

    @Mock
    private Page currentPage;

    private String[] startPaths;
    private String startPath;
    private String[] tags;
    private String itemPerPage;
    private String selector;
    private String orderBy;
    private String sort;
    private String category;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        Whitebox.setInternalState(jcrDataResolver, "resolverFactory", resolverFactory);
        Whitebox.setInternalState(jcrDataResolver, "builder", builder);
        Whitebox.setInternalState(jcrDataResolver, "currentPage", currentPage);

        startPaths = new String[]{""};
        tags = new String[]{"blockchain"};
        itemPerPage = "5";
        selector = "0";
        orderBy = "date";
        sort = "desc";
        startPath = "";
        category = "strategy";
    }

    @Test
    public void getPaginationData_withNullStartPath() {
        startPaths = null;
        try {
            List<ArticleBriefItem> items = jcrDataResolver.getPaginationData(startPaths, tags, itemPerPage, selector, orderBy, sort);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
        }
    }

    @Test
    public void getPaginationData_withEmptyStartPath() {
        startPaths = new String[]{};
        try {
            jcrDataResolver.getPaginationData(startPaths, tags, itemPerPage, selector, orderBy, sort);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
        }
    }

    @Test
    @Ignore
    public void getPaginationData_withNullTag() throws LoginException {
        itemPerPage = "a";
        tags = null;
        try {
            ResourceResolver resolver = mock(ResourceResolver.class);
            Session session = mock(Session.class);
//            Query query = mock(Query.class);
//            when(builder.createQuery(anyObject(), anyObject())).thenReturn(query);
            when(resolverFactory.getAdministrativeResourceResolver(null)).thenReturn(resolver);
            when(resolver.adaptTo(Session.class)).thenReturn(session);
            List<ArticleBriefItem> items = jcrDataResolver.getPaginationData(startPaths, tags, itemPerPage, selector, orderBy, sort);
//            verify(builder, times(1)).createQuery(anyObject(), anyObject());
        } catch (Exception e) {
            fail("Expected a GenericException to be thrown");
        }
    }

    @Test
    public void getBlogArticles_withNullStartPath() {
        startPath = null;
        try {
            List<ArticleBriefItem> items = jcrDataResolver.getBlogArticles(startPath, selector,itemPerPage,  category, tags, orderBy, sort, null);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
        }
    }

    @Test
    public void getBlogArticles_withEmptyStartPath() {
        startPath = "";
        try {
            jcrDataResolver.getBlogArticles(startPath, selector,itemPerPage,  category, tags, orderBy, sort, null);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
        }
    }

//    @Test
//    public void getReleaseArticles_withNullStartPath() {
//        startPath = null;
//        try {
//            List<ArticleBriefItem> items = jcrDataResolver.getReleaseArticles(startPath, itemPerPage, category, tags, orderBy, sort);
//            fail("Expected a GenericException to be thrown");
//        } catch (GenericException e) {
//            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
//        }
//    }

//    @Test
//    public void getReleaseArticles_withEmptyStartPath() {
//        startPath = "";
//        try {
//            jcrDataResolver.getReleaseArticles(startPath, itemPerPage, category, tags, orderBy, sort);
//            fail("Expected a GenericException to be thrown");
//        } catch (GenericException e) {
//            assertEquals("GenericException should thrown with message " + e.getMessage(), "StartPath is null", e.getMessage());
//        }
//    }

}