package com.collectionlab.dto.state;

import java.util.List;

public class HashMapStateDto {

    public static class EntryDto {
        private Object key;
        private Object value;
        private int hash;

        public EntryDto() {}

        public EntryDto(Object key, Object value, int hash) {
            this.key = key;
            this.value = value;
            this.hash = hash;
        }

        public Object getKey() { return key; }
        public void setKey(Object key) { this.key = key; }

        public Object getValue() { return value; }
        public void setValue(Object value) { this.value = value; }

        public int getHash() { return hash; }
        public void setHash(int hash) { this.hash = hash; }
    }

    public static class BucketDto {
        private int index;
        private List<EntryDto> entries;

        public BucketDto() {}

        public BucketDto(int index, List<EntryDto> entries) {
            this.index = index;
            this.entries = entries;
        }

        public int getIndex() { return index; }
        public void setIndex(int index) { this.index = index; }

        public List<EntryDto> getEntries() { return entries; }
        public void setEntries(List<EntryDto> entries) { this.entries = entries; }
    }

    private List<BucketDto> buckets;
    private int size;
    private int capacity;
    private float loadFactor;
    private int threshold;

    public HashMapStateDto() {}

    public HashMapStateDto(List<BucketDto> buckets, int size, int capacity, float loadFactor, int threshold) {
        this.buckets = buckets;
        this.size = size;
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.threshold = threshold;
    }

    public List<BucketDto> getBuckets() { return buckets; }
    public void setBuckets(List<BucketDto> buckets) { this.buckets = buckets; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public float getLoadFactor() { return loadFactor; }
    public void setLoadFactor(float loadFactor) { this.loadFactor = loadFactor; }

    public int getThreshold() { return threshold; }
    public void setThreshold(int threshold) { this.threshold = threshold; }
}
