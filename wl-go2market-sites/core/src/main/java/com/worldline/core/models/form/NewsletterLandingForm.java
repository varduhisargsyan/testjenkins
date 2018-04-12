package com.worldline.core.models.form;

/**
 * Created by varduhis on 5/5/2017.
 */
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.CountryItem;
import com.worldline.core.services.JsonDataResolver;
import com.worldline.core.util.GlobalKeys;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.servlet.http.HttpSession;
import java.util.List;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class NewsletterLandingForm{

    private String email;
    private String firstName;
    private String lastName;
    private String job;
    private String country;
    private String company;
    private String gender;

    private List<CountryItem> countryList;
    @Inject
    private SlingHttpServletRequest request;
    @Inject
    private JsonDataResolver jsonDataResolver;

    @PostConstruct
    public void init() throws LoginException, RepositoryException, GenericException {
        countryList = jsonDataResolver.loadCounties(this);
        HttpSession session = request.getSession();

        if (session != null){
            email = (String) session.getAttribute(GlobalKeys.EMAIL);
        }
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<CountryItem> getCountryList() {
        return countryList;
    }

    public void setCountryList(List<CountryItem> countryList) {
        this.countryList = countryList;
    }

    public JsonDataResolver getJsonDataResolver() {
        return jsonDataResolver;
    }

    public void setJsonDataResolver(JsonDataResolver jsonDataResolver) {
        this.jsonDataResolver = jsonDataResolver;
    }

    public SlingHttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(SlingHttpServletRequest request) {
        this.request = request;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}