package com.worldline.core.servlets;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import javax.servlet.ServletException;
import java.io.IOException;

/**
 * Created by varduhis on 8/23/2017.
 *
 */
@SlingServlet(paths = "/bin/redirectHandler", methods = "GET")
public class RedirectPageHandler  extends SlingAllMethodsServlet {
    private static final long serialVersionUID = 2563987129166789515L;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        // TODO
    }

}
