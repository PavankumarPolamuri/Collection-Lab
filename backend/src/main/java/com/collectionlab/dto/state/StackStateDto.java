package com.collectionlab.dto.state;

import java.util.List;

public class StackStateDto {
    private List<Object> elements;
    private int size;
    private Object topValue;
    private boolean isEmpty;

    public StackStateDto(List<Object> elements, int size, Object topValue, boolean isEmpty) {
        this.elements = elements;
        this.size = size;
        this.topValue = topValue;
        this.isEmpty = isEmpty;
    }

    public List<Object> getElements() { return elements; }
    public int getSize() { return size; }
    public Object getTopValue() { return topValue; }
    public boolean isEmpty() { return isEmpty; }
}
