package com.worldline.core.models.util;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Model(adaptables = SlingHttpServletRequest.class)
public class DateFormatter {
    @Inject
    @Optional
    private Calendar date;

    @Inject
    private String format;

    private String value;

    @PostConstruct
    protected void init() {
        if (date == null) return;
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        value = formatter.format(date.getTime());
    }

    public String getValue() {
        return value;
    }
}
