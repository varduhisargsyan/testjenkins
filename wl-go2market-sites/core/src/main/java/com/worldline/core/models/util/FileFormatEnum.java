package com.worldline.core.models.util;

/**
 * Created by davitp on 11/9/2017.
 */
public enum FileFormatEnum {

    PDF("application/pdf"),
    DOCX("application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    PPTX("application/vnd.openxmlformats-officedocument.presentationml.presentation"),
    XLSX("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    TXT("text/plain");

    private String name;

    FileFormatEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
