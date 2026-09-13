package com.collectionlab.dto.state;

import java.util.List;

public class HeapStateDto {
    private List<Object> heapArray;
    private int size;
    private Object minRoot;

    public HeapStateDto(List<Object> heapArray, int size, Object minRoot) {
        this.heapArray = heapArray;
        this.size = size;
        this.minRoot = minRoot;
    }

    public List<Object> getHeapArray() { return heapArray; }
    public int getSize() { return size; }
    public Object getMinRoot() { return minRoot; }
}
