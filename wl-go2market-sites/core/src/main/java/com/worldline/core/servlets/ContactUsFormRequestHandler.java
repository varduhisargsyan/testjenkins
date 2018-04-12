package com.worldline.core.servlets;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import javax.servlet.ServletException;
import java.io.IOException;


@SlingServlet(paths = "/bin/test/contactus", methods = "POST")
public class ContactUsFormRequestHandler extends SlingAllMethodsServlet {

    private static final String H1_TAG = "<h1>";
    private static final String H1_TAG_END = "</h1>";

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String selectTitle = request.getParameter("selectTitle");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String companyName = request.getParameter("companyName");
        String jobTitle = request.getParameter("jobTitle");
        String selectCountry = request.getParameter("selectCountry");
        String selectMarket = request.getParameter("selectMarket");
        String selectSubject = request.getParameter("selectSubject");
        String yourQuestion = request.getParameter("yourQuestion");


        response.setContentType("text/html");

        response.getWriter().write(H1_TAG + selectTitle + H1_TAG_END
                + H1_TAG + firstName + H1_TAG_END
                + H1_TAG + lastName + H1_TAG_END
                + H1_TAG + companyName + H1_TAG_END
                + H1_TAG + jobTitle + H1_TAG_END
                + H1_TAG + selectCountry + H1_TAG_END
                + H1_TAG + selectMarket + H1_TAG_END
                + H1_TAG + selectSubject + H1_TAG_END
                + H1_TAG + yourQuestion + H1_TAG_END
        );


    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        // DO NOTHING
    }
}
