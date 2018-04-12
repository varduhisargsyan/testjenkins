package com.worldline.core.servlets;

import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.form.User;
import com.worldline.core.services.UserServiceImpl;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import java.io.IOException;

/**
 * Created by varduhis on 5/8/2017.
 */
@SuppressWarnings("serial")
@SlingServlet(paths = "/bin/newsletterLandingFormHandler", methods = "POST")
public class NewsletterLandingFormHandler extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 2598426222166759515L;
    private static final Logger LOG = LoggerFactory.getLogger(NewsletterLandingFormHandler.class);
    @Reference
    private transient UserServiceImpl userService;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {

        String firstName = request.getParameter("newsletter-firstname");
        String lastName = request.getParameter("newsletter-lastname");
        String company = request.getParameter("newsletter-company");
        String email = request.getParameter("newsletter-email");
        String country = request.getParameter("newsletter-country");
        String job = request.getParameter("newsletter-job");
        String gender = request.getParameter("newsletter-gender");

        boolean isValid = true;

        if (Validator.isEmpty(firstName)) {
            LOG.warn("invalid param:newsletter-firstname");
            isValid = false;
        } else if (Validator.isEmpty(lastName)) {
            LOG.warn("invalid param:newsletter-lastname");
            isValid = false;
        } else if (Validator.isEmpty(company)) {
            LOG.warn("invalid param:newsletter-company");
            isValid = false;
        } else if (Validator.isEmpty(email)) {
            LOG.warn("invalid param:newsletter-email");
            isValid = false;
        } else if (Validator.isEmpty(country)) {
            LOG.warn("invalid param:newsletter-country");
            isValid = false;
        } else if (Validator.isEmpty(job)) {
            LOG.warn("invalid param:newsletter-job");
            isValid = false;
        } else if (Validator.isEmpty(gender)) {
            LOG.warn("invalid param:newsletter-gender");
            isValid = false;
        }
        if (isValid) {
            LOG.debug("request for {}, with selector {}", request
                    .getRequestPathInfo().getResourcePath(), request
                    .getRequestPathInfo().getSelectorString());

            User user = new User(firstName, lastName, job, email, country, company);
            try {
                userService.addUser(user);
            } catch (GenericException e) {
                LOG.warn("User is null");
            }
            response.sendRedirect("/content/gotomarket/en/landings/thankyou.html");
            LOG.info("DONE ");
            return;
        }
        response.sendRedirect("/content/gotomarket/en/landings/error.html");

    }

    public UserServiceImpl getUserService() {
        return userService;
    }

    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }
}