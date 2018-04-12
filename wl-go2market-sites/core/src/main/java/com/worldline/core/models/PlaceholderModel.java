package com.worldline.core.models;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class)
public class PlaceholderModel {
    @Inject
    @Optional
    private String text;

    @Inject
    private SlingHttpServletResponse response;

    private String content;

    @PostConstruct
    protected void init() throws IOException {
        response.setCharacterEncoding("UTF-8");
        if (text == null) {
            text = "";
        }
        content = text.replaceAll("<(.|\n)+?>", "");
        content = StringEscapeUtils.unescapeHtml(content);
        if (content == null || "".equals(content)) {
            content = "text";
        }
        response.getWriter().print(content);
    }

    public String getContent() {
        return content;
    }
}
