package com.collectionlab.dto.state;

import java.util.List;

public class QueueStateDto {
    private List<Object> elements;
    private int size;
    private Object frontValue;
    private Object rearValue;
    private boolean isEmpty;

    public QueueStateDto(List<Object> elements, int size, Object frontValue, Object rearValue, boolean isEmpty) {
        this.elements = elements;
        this.size = size;
        this.frontValue = frontValue;
        this.rearValue = rearValue;
        this.isEmpty = isEmpty;
    }

    public List<Object> getElements() { return elements; }
    public int getSize() { return size; }
    public Object getFrontValue() { return frontValue; }
    public Object getRearValue() { return rearValue; }
    public boolean isEmpty() { return isEmpty; }
}
