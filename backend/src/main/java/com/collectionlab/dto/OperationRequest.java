package com.collectionlab.dto;

import java.util.Map;

public class OperationRequest {

    private String value;
    private String key;
    private Integer index;
    private Map<String, Object> extraParams;

    public OperationRequest() {}

    public OperationRequest(String value) {
        this.value = value;
    }

    public OperationRequest(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public OperationRequest(Integer index, String value) {
        this.index = index;
        this.value = value;
    }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public Integer getIndex() { return index; }
    public void setIndex(Integer index) { this.index = index; }

    public Map<String, Object> getExtraParams() { return extraParams; }
    public void setExtraParams(Map<String, Object> extraParams) { this.extraParams = extraParams; }
}
