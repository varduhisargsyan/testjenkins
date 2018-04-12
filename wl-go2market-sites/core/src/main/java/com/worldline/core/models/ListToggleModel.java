package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.data.ListToggleData;
import com.worldline.core.models.util.PropertyKey;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by susannat on 8/29/2017.
 */
public class ListToggleModel extends WCMUsePojo {

    private List<ListToggleData> listItems;
    private static final Logger LOG = LoggerFactory.getLogger(ListToggleModel.class);

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
                        ListToggleData data = new ListToggleData(jsonObject.getString("acardion"), jsonObject.getString("text"));
                        listItems.add(data);
                        LOG.info("List items ", Arrays.asList(listItems));
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public List<ListToggleData> getListItems() {
        return listItems;
    }

    public void setListItems(List<ListToggleData> listItems) {
        this.listItems = listItems;
    }
}
