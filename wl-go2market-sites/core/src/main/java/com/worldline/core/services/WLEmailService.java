package com.worldline.core.services;

import com.worldline.core.exceptions.GenericException;
import java.io.IOException;

/**
 * Created by varduhis on 9/5/2017.
 */

public interface WLEmailService {
   void send(String param, String[] recipients) throws IOException, GenericException;
}
