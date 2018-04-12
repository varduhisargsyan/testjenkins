/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.worldline.core.models.data.CarouselData;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
    Page header can be set either carousel  or small header
    home page teplate can have
    Carousel - when multiple images  are set
    Header- when single item is set to carousel
    Small header - when small header is set  .

     */
public class HeaderPageModel extends WCMUsePojo {

    private List<CarouselData> carouselItems = new ArrayList<>();
    /*
    for small header
     */
    private String smallHeaderImg;
    private static final Logger LOG = LoggerFactory.getLogger(HeaderPageModel.class);

    @Override
    public void activate() {
        try {
/*
in case small header image is set , carousel (including inherited) will be disabled
In case Small header is set  for parent ,  decedent will not be able to set carousel for header. Small header is 1 PRIORITY
 */
            smallHeaderImg = PagePropertyUtil.initStringProp(getCurrentPage(), PropertyKey.PROP_KEY_HEADER_IMAGE_PATH);
            if (!Validator.isEmpty(smallHeaderImg)) {
                LOG.info("Small header is set for page header -inherited carousel will be ignored " + getCurrentPage().getPath()+" "+ smallHeaderImg);
                return;
            }

            carouselItems = PagePropertyUtil.initCarouselItems(getCurrentPage());
            LOG.info("CAROUSELITEMS: "+ Arrays.asList(carouselItems) );
        } catch (Exception ex) {
            LOG.warn("Failed to initialize page header ", ex);
        }
    }

    public List<CarouselData> getCarouselItems() {
        return carouselItems;
    }

    public void setCarouselItems(List<CarouselData> carouselItems) {
        this.carouselItems = carouselItems;
    }

    public String getSmallHeaderImg() {
        return smallHeaderImg;
    }

    public void setSmallHeaderImg(String smallHeaderImg) {
        this.smallHeaderImg = smallHeaderImg;
    }
}
