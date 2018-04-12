package com.worldline.core.services;

import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.CountryItem;
import org.apache.sling.api.resource.LoginException;

import javax.jcr.RepositoryException;
import java.util.List;

/**
 * Created by varduhis on 4/25/2017.
 */
public interface JsonDataResolver {
    List<CountryItem> loadCounties(Object object) throws LoginException, RepositoryException, GenericException;
}
