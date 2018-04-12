package com.worldline.core.services;


import com.day.commons.datasource.poolservice.DataSourceNotFoundException;
import com.day.commons.datasource.poolservice.DataSourcePool;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.form.User;
import com.worldline.core.models.util.PropertyKey;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Created by varduhis on 5/8/2017.
 */
@Service(value = UserServiceImpl.class)
@Component(/*metatype = true*/ immediate = true)
public class UserServiceImpl implements UserService {

    @Reference
    private DataSourcePool dataSourcePool;
    private static final String DATA_SOURCE_NAME = "gotomarket";
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public int addUser(User user) throws GenericException {
        LOG.info("REGISTERING NEW USER");
        int rowCount = 0;
        if (user == null) {
            throw new GenericException("User is null");
        }
        String query = "INSERT INTO user (first_name, last_name, company, email,country, job) VALUES(?, ?, ?, ?, ?,?);";
        try {
            LOG.info("DATA SOURCE  ", DATA_SOURCE_NAME);
            DataSource dataSource = (DataSource) dataSourcePool.getDataSource(DATA_SOURCE_NAME);
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS)) {
                pstmt.setString(1, user.getFirstName());
                pstmt.setString(2, user.getLastName());
                pstmt.setString(3, user.getCompany());
                pstmt.setString(4, user.getEmail());
                pstmt.setString(5, user.getCountry());
                pstmt.setString(6, user.getJob());
                rowCount = pstmt.executeUpdate();
                LOG.info("ADD user operation result: ", rowCount);
            } catch (SQLException ex) {
                LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
            }
        } catch (DataSourceNotFoundException ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }

        return rowCount;
    }


    public DataSourcePool getDataSourcePool() {
        return dataSourcePool;
    }

    public void setDataSourcePool(DataSourcePool dataSourcePool) {
        this.dataSourcePool = dataSourcePool;
    }
}
