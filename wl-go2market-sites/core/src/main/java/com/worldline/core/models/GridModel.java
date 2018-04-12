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
import com.worldline.core.models.data.GridColumnData;
import com.worldline.core.models.util.PropertyKey;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class GridModel extends WCMUsePojo {
    private static final Logger logger = LoggerFactory.getLogger(GridModel.class);
    private List<GridColumnData> columns;
    private static final String DEFAULT_CSS_CLASS = "grid-col-12";

    @Override
    public void activate() {
        try {
            ValueMap properties = getProperties();
            columns = new ArrayList<>();
            String[] values = properties.get("list", String[].class);

            if (values == null) {
                columns.add(new GridColumnData(DEFAULT_CSS_CLASS));
            } else {
                for (String val : values) {
                    columns.add(new GridColumnData(new JSONObject(val).getString("columnSize")));
                }
            }
        } catch (Exception ex) {
            logger.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
    }

    public List<GridColumnData> getColumns() {
        return columns;
    }

    public void setColumns(List<GridColumnData> columns) {
        this.columns = columns;
    }
}
