package com.worldline.core.util;

import org.apache.commons.validator.routines.EmailValidator;

import javax.jcr.Property;
import javax.jcr.RepositoryException;

/**
 * Created by varduhis on 5/4/2017.
 */
public class Validator {

    private Validator() {
        // DO NOTHING
    }

    public static boolean isEmpty(String str) {
        return str == null || str.trim().length() == 0;
    }

    public static boolean isEmpty(Object[] str) {
        return str == null || str.length == 0;
    }

    public static void isEmpty(Property property) throws RepositoryException {
        if (property == null || property.getString() == null || property.getString().trim().length() == 0) {
            StringBuilder builder = new StringBuilder();
            builder.append("Invalid Property Found ");
            builder.append(property);
            throw new RepositoryException(builder.toString());
        }
    }

    public static boolean isValidEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

}
