package com.worldline.core.models;

import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.CountryItem;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.JsonDataResolver;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by varduhis on 4/25/2017.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class CountryDDModel {

    private static final Logger LOG = LoggerFactory.getLogger(CountryDDModel.class);

    @Inject
    private JsonDataResolver jsonDataResolver;
    @Inject
    private Page resourcePage;

    private List<CountryItem> countryListLeft=new ArrayList<>();

    private List<CountryItem> countryListRight=new ArrayList<>();

    private String isCountryListDD;

    @PostConstruct
    public void init() throws LoginException, RepositoryException, GenericException {

        if (resourcePage != null) {
            isCountryListDD = PagePropertyUtil.initStringProp(resourcePage, PropertyKey.PROP_KEY_COUNTRY_LIST_DROP_DOWN);
        } else {
            LOG.warn("Failed to initialize CountryListDD : Resource page is null");
        }

        if (jsonDataResolver != null) {
            List<CountryItem> countryList = jsonDataResolver.loadCounties(this);
            final int firstIndex = 0;
            final int midIndex = countryList.size() / 2;
            final int lastIndex = countryList.size();
            countryListLeft = countryList.subList(firstIndex, midIndex);
            countryListRight = countryList.subList(midIndex, lastIndex);
        } else {
            LOG.warn("Json data Resolver is null");
            throw new GenericException("Can not get reference to  JsonDataResolverImpl");
        }

    }

    public Page getResourcePage() {
        return resourcePage;
    }

    public void setResourcePage(Page resourcePage) {
        this.resourcePage = resourcePage;
    }

    public JsonDataResolver getJsonDataResolver() {
        return jsonDataResolver;
    }

    public void setJsonDataResolver(JsonDataResolver jsonDataResolver) {
        this.jsonDataResolver = jsonDataResolver;
    }

    @Inject
    public List<CountryItem> getCountryListLeft() {
        return countryListLeft;
    }

    public void setCountryListLeft(List<CountryItem> countryListLeft) {
        this.countryListLeft = countryListLeft;
    }

    @Inject
    public List<CountryItem> getCountryListRight() {
        return countryListRight;
    }

    public void setCountryListRight(List<CountryItem> countryListRight) {
        this.countryListRight = countryListRight;
    }

    public String getIsCountryListDD() {
        return isCountryListDD;
    }

    public void setIsCountryListDD(String isCountryListDD) {
        this.isCountryListDD = isCountryListDD;
    }
}
