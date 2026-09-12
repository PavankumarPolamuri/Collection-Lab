package com.collectionlab.dto.state;

import java.util.List;

public class PriorityQueueStateDto {

    private List<Object> heapArray;
    private int size;
    private int capacity;
    private Object minRoot;

    public PriorityQueueStateDto() {}

    public PriorityQueueStateDto(List<Object> heapArray, int size, int capacity, Object minRoot) {
        this.heapArray = heapArray;
        this.size = size;
        this.capacity = capacity;
        this.minRoot = minRoot;
    }

    public List<Object> getHeapArray() { return heapArray; }
    public void setHeapArray(List<Object> heapArray) { this.heapArray = heapArray; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public Object getMinRoot() { return minRoot; }
    public void setMinRoot(Object minRoot) { this.minRoot = minRoot; }
}
