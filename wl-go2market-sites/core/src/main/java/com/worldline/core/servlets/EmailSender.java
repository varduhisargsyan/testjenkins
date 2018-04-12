package com.worldline.core.servlets;

import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.services.WLEmailService;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

/**
 * Created by varduhis on 9/5/2017.
 */
@SlingServlet(paths = "/bin/emailSender", methods = "POST")
public class EmailSender extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 2598471129002589515L;
    @Reference
    private transient WLEmailService emailService;
    private static final Logger LOG = LoggerFactory.getLogger(EmailSender.class);


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String[] recipients = null;
        try {
            String path = request.getParameter("resourcePath");
            final String email = request.getParameter("email");
            if (path == null) {
                LOG.info("EmailSender servlet got invalid resource path");
                return;
            }
            LOG.info("New email subscription submitted to Email Sender service : preparing to send user's email to recipients");
            Resource resource = request.getResourceResolver().getResource(path);
            if (resource != null) {
                Page currentPage = resource.adaptTo(Page.class);

                if (currentPage == null) {
                    LOG.info("Email sender service : failed to addapt resource into current page path= "+ path);
                    return;
                }
                recipients = PagePropertyUtil.initListProp(currentPage, PropertyKey.PROP_KEY_RECIPIENTS);
                if(!Validator.isEmpty(recipients)) {
                    LOG.info("Email sender service: successfully recipients list "+ Arrays.asList(recipients));
                }
            }

            if (Validator.isValidEmail(email)) {
                emailService.send(email, recipients);
                LOG.info("Subscriber email has been sent ", email);
                return;
            }
            LOG.info("Invalid input parameter email= ", email);
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
        } catch (GenericException ex) {
            LOG.error(PropertyKey.EXPECTED_EXCEPTION, ex.getMessage());
            response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex.getMessage());
            response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        }

    }

    public WLEmailService getEmailService() {
        return emailService;
    }

    public void setEmailService(WLEmailService emailService) {
        this.emailService = emailService;
    }

    /**
     * To avoid to store clear email in logs
     * returns  ex. p********l@domain.com
     * @param aEmail
     * @return storableEmail OR aEmail if  aEmail.indexOf('@')<=2
     */
    private static final String pattern="(?<=.).(?=[^@]*?.@)";

    public static String getStorableValueForUserEmail(String aEmail) {
        StringBuilder storableEmail ;
        if (!Validator.isEmpty(aEmail)) {
            storableEmail=new StringBuilder(aEmail.replaceAll(pattern, "*"));
            return storableEmail.toString();

        }
        LOG.warn("Failed to get storable value for user email:unmasked email will be logged  "+ aEmail);
        return aEmail;
    }
}
