package com.collectionlab.dto.state;

import java.util.List;

public class HashSetStateDto {

    public static class BucketDto {
        private int index;
        private List<Object> elements;

        public BucketDto(int index, List<Object> elements) {
            this.index = index;
            this.elements = elements;
        }

        public int getIndex() { return index; }
        public List<Object> getElements() { return elements; }
    }

    private List<BucketDto> buckets;
    private int size;
    private int capacity;

    public HashSetStateDto(List<BucketDto> buckets, int size, int capacity) {
        this.buckets = buckets;
        this.size = size;
        this.capacity = capacity;
    }

    public List<BucketDto> getBuckets() { return buckets; }
    public int getSize() { return size; }
    public int getCapacity() { return capacity; }
}
