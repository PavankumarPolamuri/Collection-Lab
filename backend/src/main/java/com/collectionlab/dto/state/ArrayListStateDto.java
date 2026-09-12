package com.collectionlab.dto.state;

import java.util.List;

public class ArrayListStateDto {
    private List<Object> elements;
    private int size;
    private int capacity;

    public ArrayListStateDto() {}

    public ArrayListStateDto(List<Object> elements, int size, int capacity) {
        this.elements = elements;
        this.size = size;
        this.capacity = capacity;
    }

    public List<Object> getElements() { return elements; }
    public void setElements(List<Object> elements) { this.elements = elements; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}
