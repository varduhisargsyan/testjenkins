package com.worldline.core.util;

import com.worldline.core.exceptions.GenericException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.Locale;
//CODE REVIEW / Reviewer Varduhi Sargsyan

public class DateTimeUtil {

    private static final Logger LOG = LoggerFactory.getLogger(DateTimeUtil.class);
    private static final DateTimeFormatter FORMATTER_MMYYYY = DateTimeFormatter.ofPattern("MMM.YYYY", Locale.ENGLISH);
    private static final DateTimeFormatter FORMATTER_ddMMMYYYY = DateTimeFormatter.ofPattern("ddMMM.YYYY", Locale.ENGLISH);
    private static final DateTimeFormatter FORMATTER_FULL = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSz", Locale.ENGLISH);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm", Locale.ENGLISH);
    private static final DateFormat SIMPLE_DATE_FORMATTER = new SimpleDateFormat("dd MMM, yyyy");


    private DateTimeUtil() {
        //NOTHING TO DO
    }

    public static String convert(Date date) {
        return SIMPLE_DATE_FORMATTER.format(date);
    }

    public static String getFormattedDateTime(LocalDateTime dateTime) {
        return dateTime.format(FORMATTER);

    }

    public static String getFormattedStringDate(String pageDate) throws GenericException {
        if (pageDate != null) {
            try {
                LocalDate date = LocalDate.parse(pageDate, FORMATTER_FULL);
                return FORMATTER_ddMMMYYYY.format(date);
            } catch (DateTimeParseException exc) {
                throw new GenericException("ERROR: Date format is not correct");
            }
        } else {
            LOG.warn("Page Date is null for current page");
        }
        return "";
    }

    public static String getFormattedStringDate_short(String pageDate) throws GenericException {
        if (pageDate != null) {
            try {
                LocalDate date = LocalDate.parse(pageDate, FORMATTER_FULL);

                return FORMATTER_MMYYYY.format(date);
            } catch (DateTimeParseException exc) {
                throw new GenericException("ERROR: Date format is not correct");
            }
        } else {
            LOG.warn("Page Date is null for current page");
        }
        return "";
    }

    public static boolean isBefore(String date) throws GenericException {
        //Pars String to zoneDateTime to extract the zone
        ZonedDateTime dateTime=ZonedDateTime.parse(date);

        //Get current date with particular  provided dateTime zone
        LocalDateTime localDateTime= LocalDateTime.now(dateTime.getZone());
        LOG.info("LDT ---"+ localDateTime+ "  aDT "+ dateTime.toLocalDateTime());

        return dateTime.toLocalDateTime().isBefore(localDateTime);
    }
    public static boolean isAfter(String date) throws GenericException {
        //Pars String to zoneDateTime to extract the zone
        ZonedDateTime dateTime=ZonedDateTime.parse(date);

        //Get current date with particular  provided dateTime zone
        LocalDateTime localDateTime= LocalDateTime.now(dateTime.getZone());
        LOG.info("LDT ---"+ localDateTime+ "  aDT "+ dateTime.toLocalDateTime());

        return dateTime.toLocalDateTime().isAfter(localDateTime);

    }
}
