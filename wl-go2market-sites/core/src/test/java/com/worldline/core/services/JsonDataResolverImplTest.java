package com.worldline.core.services;

import com.day.cq.search.QueryBuilder;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.CountryDDModel;
import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.form.NewsletterLandingForm;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.internal.util.reflection.Whitebox;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.anyMap;
import static org.mockito.Mockito.*;

/**
 * Created by davitp on 9/12/2017.
 */
public class JsonDataResolverImplTest {

    @Spy
    JsonDataResolverImpl jsonDataResolver = new JsonDataResolverImpl();

    @Mock
    private ResourceResolverFactory resourceResolverFactory;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        Whitebox.setInternalState(jsonDataResolver, "resolverFactory", resourceResolverFactory);
    }

    @Test
    public void loadCounties_withNullResource() throws LoginException, RepositoryException {
        Object o = new Object();
        try {
            ResourceResolver resourceResolver = mock(ResourceResolver.class);
            when(resourceResolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resourceResolver);
            jsonDataResolver.loadCounties(o);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "ERROR: Resource is null", e.getMessage());
        }
    }

    @Test
    public void loadCounties_withNullNode_withCountryDDModel() throws LoginException, RepositoryException {
        Object o = new CountryDDModel();
        try {
            ResourceResolver resourceResolver = mock(ResourceResolver.class);
            when(resourceResolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resourceResolver);
            Resource rsrc = mock(Resource.class);
            when(resourceResolver.getResource("/apps/gotomarket/components/data/json/countries.json")).thenReturn(rsrc);
            when(rsrc.adaptTo(Node.class)).thenReturn(null);

            jsonDataResolver.loadCounties(o);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "ERROR: Node is null", e.getMessage());
        }
    }

    @Test
    public void loadCounties_withNullNode_withNewsletterLandingForm() throws LoginException, RepositoryException {
        Object o = new NewsletterLandingForm();
        try {
            ResourceResolver resourceResolver = mock(ResourceResolver.class);
            when(resourceResolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resourceResolver);
            Resource rsrc = mock(Resource.class);
            when(resourceResolver.getResource("/apps/gotomarket/components/data/json/newsletter_counrties.json")).thenReturn(rsrc);
            when(rsrc.adaptTo(Node.class)).thenReturn(null);

            jsonDataResolver.loadCounties(o);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "ERROR: Node is null", e.getMessage());
        }
    }

    @Test
    public void loadCounties_withNullJCRConyent() throws LoginException, RepositoryException {
        Object o = new NewsletterLandingForm();
        try {
            ResourceResolver resourceResolver = mock(ResourceResolver.class);
            when(resourceResolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resourceResolver);
            Resource rsrc = mock(Resource.class);
            when(resourceResolver.getResource("/apps/gotomarket/components/data/json/newsletter_counrties.json")).thenReturn(rsrc);
            Node jsonNode = mock(Node.class);
            when(rsrc.adaptTo(Node.class)).thenReturn(jsonNode);
            when(jsonNode.getNode("jcr:content")).thenReturn(null);
            jsonDataResolver.loadCounties(o);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "ERROR: JCR Content is null ", e.getMessage());
        }
    }

    @Test
    @Ignore
    public void loadCounties_success() throws LoginException, RepositoryException {
        Object o = new NewsletterLandingForm();
        try {
            ResourceResolver resourceResolver = mock(ResourceResolver.class);
            when(resourceResolverFactory.getServiceResourceResolver(anyMap())).thenReturn(resourceResolver);
            Resource rsrc = mock(Resource.class);
            when(resourceResolver.getResource("/apps/gotomarket/components/data/json/newsletter_counrties.json")).thenReturn(rsrc);
            Node jsonNode = mock(Node.class);
            when(rsrc.adaptTo(Node.class)).thenReturn(jsonNode);
            Node jcrContent = mock(Node.class);
            when(jsonNode.getNode("jcr:content")).thenReturn(jcrContent);

            jsonDataResolver.loadCounties(o);
            verify(jcrContent, times(1)).getProperty("jcr:data");
        } catch (GenericException e) {
            fail("Expected a GenericException to be thrown");
        }
    }

}
