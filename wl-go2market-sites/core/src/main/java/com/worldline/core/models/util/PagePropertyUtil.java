package com.worldline.core.models.util;

import com.adobe.fd.fp.util.PropertyUtils;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.worldline.core.models.data.CarouselData;
import com.worldline.core.models.data.SocialIcon;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by varduhis on 6/9/2017.
 */
public class PagePropertyUtil {
    private static final Logger LOG = LoggerFactory.getLogger(PropertyUtils.class);

    private static final String DEFAULT_LOG_MESSAGE = "Failed to get page properties : ";


    private PagePropertyUtil() {
    }


    public static List<SocialIcon> initSocials(Page page, String propertyKey) {
        List<SocialIcon> socials = new ArrayList<>();
        try {
            InheritanceValueMap props = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            String[] jsonArray = props.getInherited(propertyKey, String[].class);

            if (jsonArray != null) {
                for (String s : jsonArray) {
                    JSONObject jsonObject = new JSONObject(s);
                    SocialIcon icon = new SocialIcon(jsonObject.getString("name"), jsonObject.getString("link"));
                    socials.add(icon);
                }
            }

        } catch (JSONException e) {
            LOG.info("Failed to page property 'socials' : ", page.getPath());
        } catch (Exception ex){
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());
        }
        return socials;
    }
    public static List<CarouselData> initCarouselItems(Page page) {
        List<CarouselData> carouselItems = null;
        try {
            InheritanceValueMap props = new HierarchyNodeInheritanceValueMap(page.getContentResource());

            String[] jsonArray = props.getInherited(PropertyKey.PROP_KEY_CAROUSEL_ITEMS, String[].class);
            if (jsonArray != null) {
                carouselItems = new ArrayList<>();
                for (String s : jsonArray) {
                    JSONObject jsonObject = new JSONObject(s);
                    CarouselData item = new CarouselData(jsonObject.getString("title"), jsonObject.getString("subtitle"), jsonObject.getString("description"), jsonObject.getString("imagePath"), jsonObject.getString("link"));
                    carouselItems.add(item);
                }
            }

        }  catch (JSONException e) {
            LOG.info("Failed to page property 'carouselItems' : ", page.getPath());
        } catch (Exception ex) {
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());

        }
        return carouselItems;
    }

    public static String initStringProp(Page page, String propkey) {
        try {
            InheritanceValueMap props = null;
            props = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            return props.getInherited(propkey, String.class);
        } catch (Exception ex) {
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());
            return null;

        }
    }
    /*
    To get page property -not inherited ex. page icon should be set on page and not inherited from parent
     */
    public static String initStringPropSelf(Page page, String propkey) {
        try {
            ValueMap props = page.getProperties();
            return (props != null) ? props.get(propkey, String.class) : null;
        } catch (Exception ex) {
            return null;

        }
    }

    /*
    To get inherited boolean property : Special case to be used for footer  components
    if not set OR reset - component is visible
     */
    public static Boolean initBooleanProp(Page page, String propkey) {
        try {
            InheritanceValueMap props = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            Boolean value = props.getInherited(propkey, Boolean.class);
            return (value != null) ? value : true;
        } catch (Exception ex) {
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());

        }
        return true;
    }

    /*
        To  get boolean SELF (not inherited) property
     */
    public static Boolean initBooleanPropSelf(Page page, String propkey) {
        try {
            ValueMap props = page.getProperties();
            Boolean value = props.get(propkey, Boolean.class);
            return value != null ? value : false;
        } catch (Exception ex) {
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());
        }
        return false;
    }

    public static Boolean initBooleanProp1(Page page, String propkey) {
        try {
            InheritanceValueMap props = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            Boolean value = props.getInherited(propkey, Boolean.class);
            return (value!=null)? value :false;

        } catch (Exception ex) {
            LOG.info(DEFAULT_LOG_MESSAGE, page.getPath());
            return false;
        }

    }


    public static String[] initListProp(Page page, String property) {
        String[] list = null;
        try {
            InheritanceValueMap props = null;
            props = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            list = props.getInherited(property, String[].class);
            return list;
        } catch (Exception ex) {
            return list;
        }

    }


    public static String getBrandPropertyName(String key) {
        if (PropertyKey.PROP_VALUE_WORLDLINE.equalsIgnoreCase(key)) {
            return PropertyKey.PROP_VALUE_WORLDLINE;
        } else if (PropertyKey.PROP_VALUE_EQUENSEWORLDLINE.equalsIgnoreCase(key)) {
            return PropertyKey.PROP_VALUE_EQUENSEWORLDLINE;
        } else if (PropertyKey.PROP_VALUE_ATOS.equalsIgnoreCase(key)) {
            return PropertyKey.PROP_VALUE_ATOS;

        } else {
            return PropertyKey.PROP_VALUE_WORLDLINE;

        }

    }
}