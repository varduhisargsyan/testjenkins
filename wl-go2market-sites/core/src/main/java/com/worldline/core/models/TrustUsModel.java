package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.data.ImageItem;
import com.worldline.core.models.util.PropertyKey;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by davitp on 6/6/2017.
 */
public class TrustUsModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(TrustUsModel.class);
    private List<ImageItem> trustUsItems ;
    private final List<List<ImageItem>> trust=new ArrayList<>();


    @Override
    public void activate() throws Exception {
        try {
            initProperties();
        }catch (Exception ex){
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    private void initProperties() throws JSONException {

        if (getProperties().containsKey(PropertyKey.PROP_TRUST_US_ITEMS)) {
            String[] jsonArray =  getProperties().get(PropertyKey.PROP_TRUST_US_ITEMS, String[].class);

            for (String s : jsonArray) {
                trustUsItems = new ArrayList<>();
                JSONObject jsonObject = new JSONObject(s);
                String item1 = jsonObject.getString("imagePath1");
                String item2 = jsonObject.getString("imagePath2");
                String item3 = jsonObject.getString("imagePath3");
                String item4 = jsonObject.getString("imagePath4");

                String url1 = jsonObject.getString("url1");
                String url2 = jsonObject.getString("url2");
                String url3 = jsonObject.getString("url3");
                String url4 = jsonObject.getString("url4");

                trustUsItems.add(new ImageItem(item1, url1));
                trustUsItems.add(new ImageItem(item2, url2));
                trustUsItems.add(new ImageItem(item3, url3));
                trustUsItems.add(new ImageItem(item4, url4));

                trust.add(trustUsItems);
            }
        }
    }

    public List<ImageItem> getTrustUsItems() {
        return trustUsItems;
    }

    public void setTrustUsItems(List<ImageItem> trustUsItems) {
        this.trustUsItems = trustUsItems;
    }

    public List<List<ImageItem>> getTrust() {
        return trust;
    }
}
