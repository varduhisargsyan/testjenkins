package com.worldline.core.services;

import com.adobe.acs.commons.email.EmailService;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.util.DateTimeUtil;
import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.*;
import java.io.IOException;
import java.util.*;

/**
 * Created by varduhis on 9/5/2017.
 */


@Service(value = WLEmailService.class)
@Component(/*metatype = true*/ immediate = true)
public class WLEmailServiceImpl implements WLEmailService {

    private static final Logger LOG = LoggerFactory.getLogger(WLEmailServiceImpl.class);

    private String[] recipients;

    @Reference
    private EmailService emailService;

    @Override
    public void send(String param, String[] recipients) throws IOException, GenericException {

        if (Validator.isEmpty(param)) {
            throw new GenericException("EmailService: email is null or empty");
        }
        if (recipients != null && recipients.length != 0) {
            for (String recipient : recipients) {
                if (!Validator.isValidEmail(recipient)) {
                    throw new GenericException("Recipient email is invalid : " + recipient);
                }
            }
        } else {
            throw new GenericException("Recipient emails not found");
        }
        Map<String, String> params = new HashMap<>();
        params.put("email", param);
        params.put("date", DateTimeUtil.getFormattedDateTime(LocalDateTime.now()));
        List<String> failureList = emailService.sendEmail(GlobalKeys.EMAIL_TEMPLATE_PATH, params, recipients);
        if (!failureList.isEmpty()) {
            StringBuilder exceptionMessage = new StringBuilder();
            exceptionMessage.append("Failed to sent email to ");
            exceptionMessage.append(Arrays.asList(failureList));
            throw new GenericException(exceptionMessage.toString());
        }
    }

    public EmailService getEmailService() {
        return emailService;
    }

    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    public String[] getRecipients() {
        return recipients;
    }

    public void setRecipients(String[] recipients) {
        this.recipients = recipients;
    }
}
