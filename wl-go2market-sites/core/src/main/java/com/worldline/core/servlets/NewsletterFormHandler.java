package com.worldline.core.servlets;

import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by varduhis on 5/3/2017.
 */
@SuppressWarnings("serial")
@SlingServlet(paths = "/bin/newsletterFormHandler", methods = "POST")
public class NewsletterFormHandler extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 2598426539166789515L;
    private static final Logger LOGGER = LoggerFactory.getLogger(NewsletterFormHandler.class);


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("newsletter-email");
        if (!Validator.isEmpty(email)) {
            HttpSession session = request.getSession();

            session.setAttribute(GlobalKeys.EMAIL, email);
            response.sendRedirect("/content/gotomarket/en/landings.html");
            LOGGER.info("SESSION ", session.getId());
            return;
        }
        LOGGER.warn("Invalid input parametter newsletter-email: null");
        response.sendRedirect("/content/gotomarket/error.html");
    }
}
