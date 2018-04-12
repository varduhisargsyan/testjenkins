package com.worldline.core.services;

import com.adobe.acs.commons.email.EmailService;
import com.day.commons.datasource.poolservice.DataSourcePool;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.form.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.internal.util.reflection.Whitebox;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

/**
 * Created by davitp on 9/13/2017.
 */
public class UserServiceImplTest {

    @Spy
    UserServiceImpl userService = new UserServiceImpl();

    @Mock
    private DataSourcePool dataSourcePool;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        Whitebox.setInternalState(userService, "dataSourcePool", dataSourcePool);
    }

    @Test
    public void addUser_withNullUser() throws IOException, GenericException {
        User user = null;
        try {
            userService.addUser(user);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "User is null", e.getMessage());
        }

    }
}
