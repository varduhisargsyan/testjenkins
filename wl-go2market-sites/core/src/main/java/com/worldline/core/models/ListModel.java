package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by susannat on 6/27/2017.
 */
public class ListModel extends WCMUsePojo {

    private List<String> listItems;
    private static final Logger LOG = LoggerFactory.getLogger(ListModel.class);

    @Override
    public void activate() {
        try {
            listItems = new ArrayList<>();
            ValueMap properties = getProperties();
            if (properties != null && !properties.isEmpty()) {
                String[] props = properties.get("list", String[].class);

                if (props != null) {
                    for (String json : props) {
                        JSONObject jsonObject = new JSONObject(json);
                        listItems.add(jsonObject.getString("item"));
                    }
                }
            }
        } catch (Exception ex) {
            LOG.info("Exception in ListModel", ex);
        }
    }

    public List<String> getListItems() {
        return listItems;
    }

    public void setListItems(List<String> listItems) {
        this.listItems = listItems;
    }
}
