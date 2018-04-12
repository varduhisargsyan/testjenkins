package com.worldline.core.services;

import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.form.User;

/**
 * Created by varduhis on 5/8/2017.
 */


public interface UserService {

    int addUser(User user) throws GenericException;
}
