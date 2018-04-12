package com.worldline.core.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.CountryDDModel;
import com.worldline.core.models.data.CountryItem;
import com.worldline.core.models.form.NewsletterLandingForm;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by varduhis on 4/25/2017.
 */
@Service(value = JsonDataResolver.class)
@Component(/*metatype = true, */immediate = true)
public class JsonDataResolverImpl implements JsonDataResolver {

    @Reference
    private ResourceResolverFactory resolverFactory;

    @Override
    public List<CountryItem> loadCounties(Object model) throws LoginException, RepositoryException, GenericException {

        java.util.List<CountryItem> countryList;
        Map<String, Object> param = new HashMap<>();
        param.put(ResourceResolverFactory.SUBSERVICE, "countryDDAdapter");
        param.put(ResourceResolverFactory.USER, "g2m-tech-user");
        ResourceResolver resourceResolver = resolverFactory.getServiceResourceResolver(param);

        Resource resource = null;
        if (model instanceof CountryDDModel) {
            resource = resourceResolver.getResource("/apps/gotomarket/components/data/json/countries.json");
        } else if (model instanceof NewsletterLandingForm) {
            resource = resourceResolver.getResource("/apps/gotomarket/components/data/json/newsletter_counrties.json");
        }
        if (resource == null) {
            throw new GenericException("ERROR: Resource is null");
        }
        Node jsonNode = resource.adaptTo(Node.class);

        if (jsonNode == null) {
            throw new GenericException("ERROR: Node is null");
        }
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        builder.setPrettyPrinting();
        Node jcrContent = jsonNode.getNode("jcr:content");
        if (jcrContent == null) {
            throw new GenericException("ERROR: JCR Content is null ");
        }
        Binary binary = jcrContent.getProperty("jcr:data").getBinary();

        Type listType = new TypeToken<ArrayList<CountryItem>>() {
        }.getType();

        countryList = gson.fromJson(new InputStreamReader(binary.getStream()), listType);

        return countryList;
    }

}
