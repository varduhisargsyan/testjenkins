package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by varduhis on 8/25/2017.
 */
public class HeaderSingleModel extends WCMUsePojo {
    private String headerImage;
    private String title;
    private  String subtitle;
    private  String description;
    private String linkTo;
    private String colorTitle;
    private static final Logger LOG = LoggerFactory.getLogger(HeaderSingleModel.class);

    @Override
    public void activate() {
        try {
            headerImage = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_IMAGE_PATH);
            title= PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_TITLE);
            subtitle= PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_SUBTITLE);
            description=PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_DESCRIPTION);
            colorTitle=PagePropertyUtil.initStringPropSelf(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_TITLE_COLOR);
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public String getHeaderImage() {
        return headerImage;
    }

    public void setHeaderImage(String headerImage) {
        this.headerImage = headerImage;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLinkTo() {
        return linkTo;
    }

    public void setLinkTo(String linkTo) {
        this.linkTo = linkTo;
    }

    public String getColorTitle() {
        return colorTitle;
    }

    public void setColorTitle(String colorTitle) {
        this.colorTitle = colorTitle;
    }
}
