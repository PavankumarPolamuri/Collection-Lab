package com.collectionlab.dto.state;

import java.util.List;

public class DequeStateDto {
    private List<Object> elements;
    private int size;
    private Object firstValue;
    private Object lastValue;
    private boolean isEmpty;

    public DequeStateDto(List<Object> elements, int size, Object firstValue, Object lastValue, boolean isEmpty) {
        this.elements = elements;
        this.size = size;
        this.firstValue = firstValue;
        this.lastValue = lastValue;
        this.isEmpty = isEmpty;
    }

    public List<Object> getElements() { return elements; }
    public int getSize() { return size; }
    public Object getFirstValue() { return firstValue; }
    public Object getLastValue() { return lastValue; }
    public boolean isEmpty() { return isEmpty; }
}
