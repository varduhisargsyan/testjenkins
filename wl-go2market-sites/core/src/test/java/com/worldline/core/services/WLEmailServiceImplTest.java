package com.worldline.core.services;

import com.adobe.acs.commons.email.EmailService;
import com.worldline.core.exceptions.GenericException;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.internal.util.reflection.Whitebox;

import javax.jcr.RepositoryException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * Created by davitp on 9/13/2017.
 */
public class WLEmailServiceImplTest {

    @Spy
    WLEmailServiceImpl wlEmailService = new WLEmailServiceImpl();

    @Mock
    private EmailService emailService;

    private String[] recipients;
    private String param;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        Whitebox.setInternalState(wlEmailService, "emailService", emailService);

        recipients = new String[]{"asdf@gmail.com"};
        param = "qwer@gmail.com";
    }

    @Test
    public void send_withNullParam() throws IOException, GenericException {
        param = null;
        try {
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "EmailService: email is null or empty", e.getMessage());
        }
    }

    @Test
    public void send_withEmptyParam() throws IOException, GenericException {
        param = "";
        try {
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "EmailService: email is null or empty", e.getMessage());
        }
    }

    @Test
    public void send_withNullRecipients() throws IOException, GenericException {
        recipients = null;
        try {
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "Recipient emails not found", e.getMessage());
        }
    }

    @Test
    public void send_withEmptyRecipients() throws IOException, GenericException {
        recipients = new String[]{};
        try {
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "Recipient emails not found", e.getMessage());
        }
    }

    @Test
    public void send_withInvalidRecipientEmail() throws IOException, GenericException {
        recipients = new String[]{"asdfgmail.com"};
        try {
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "Recipient email is invalid : " + recipients[0], e.getMessage());
        }
    }

    @Test
    @Ignore
    public void send_with() throws IOException, GenericException {
        String param = "asdf@test.com";
        try {
//            List<String> failureList = mock(List.class);
            when(emailService.sendEmail(anyString(), anyMap(), any(String[].class))).thenReturn(new ArrayList<>());
            wlEmailService.send(param, recipients);
            fail("Expected a GenericException to be thrown");
        } catch (GenericException e) {
            assertEquals("GenericException should thrown with message " + e.getMessage(), "EmailService: email is null or empty", e.getMessage());
        }
    }

}
