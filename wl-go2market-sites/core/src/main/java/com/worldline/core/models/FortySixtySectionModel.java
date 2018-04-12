package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PropertyKey;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by susannat on 6/21/2017.
 */
public class FortySixtySectionModel extends WCMUsePojo {

    private List<String> sections;
    private static final Logger LOG = LoggerFactory.getLogger(FortySixtySectionModel.class);

    @Override
    public void activate() {
        try {
            sections = new ArrayList<>();
            ValueMap properties = getProperties();

            if(properties !=null && !properties.isEmpty()){
               String[] props = properties.get("list", String[].class);

                if (props != null) {
                    for (String json : props) {
                        JSONObject jsonObject = new JSONObject(json);
                        sections.add(jsonObject.getString("section"));
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public List<String> getSections() {
        return sections;
    }

    public void setSections(List<String> sections) {
        this.sections = sections;
    }
}
