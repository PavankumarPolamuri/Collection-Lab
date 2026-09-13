package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class CustomHashSet<E> {
    private LinkedList<E>[] buckets;
    private int size;
    private int capacity;
    private static final float DEFAULT_LOAD_FACTOR = 0.75f;

    @SuppressWarnings("unchecked")
    public CustomHashSet(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
    }

    public CustomHashSet() {
        this(8);
    }

    private int getBucketIndex(E element) {
        if (element == null) return 0;
        int h = element.hashCode();
        return Math.abs(h % capacity);
    }

    public boolean add(E element, List<String> steps) {
        int idx = getBucketIndex(element);
        if (steps != null) {
            steps.add("Computed hash bucket for '" + element + "': index " + idx + ".");
        }
        if (buckets[idx].contains(element)) {
            if (steps != null) {
                steps.add("Element '" + element + "' already exists in HashSet (duplicate ignored).");
            }
            return false;
        }

        buckets[idx].add(element);
        size++;
        if (steps != null) {
            steps.add("Inserted '" + element + "' into bucket " + idx + ". Size is now " + size + ".");
        }

        if ((float) size / capacity >= DEFAULT_LOAD_FACTOR) {
            rehash(steps);
        }
        return true;
    }

    public boolean remove(E element, List<String> steps) {
        int idx = getBucketIndex(element);
        if (steps != null) {
            steps.add("Searching bucket " + idx + " for '" + element + "'.");
        }
        boolean removed = buckets[idx].remove(element);
        if (removed) {
            size--;
            if (steps != null) {
                steps.add("Removed '" + element + "' from HashSet. New size is " + size + ".");
            }
        } else {
            if (steps != null) {
                steps.add("Element '" + element + "' not found in HashSet.");
            }
        }
        return removed;
    }

    public boolean contains(E element, List<String> steps) {
        int idx = getBucketIndex(element);
        if (steps != null) {
            steps.add("Checking bucket " + idx + " for element '" + element + "'.");
        }
        boolean found = buckets[idx].contains(element);
        if (steps != null) {
            steps.add(found ? "Element '" + element + "' exists in HashSet." : "Element '" + element + "' is NOT in HashSet.");
        }
        return found;
    }

    @SuppressWarnings("unchecked")
    private void rehash(List<String> steps) {
        int oldCap = capacity;
        capacity *= 2;
        if (steps != null) {
            steps.add("Load factor threshold reached. Expanding HashSet capacity from " + oldCap + " to " + capacity + ".");
        }
        LinkedList<E>[] oldBuckets = buckets;
        buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
        size = 0;
        for (LinkedList<E> bucket : oldBuckets) {
            for (E item : bucket) {
                add(item, null);
            }
        }
    }

    public int size() { return size; }
    public int capacity() { return capacity; }
    public boolean isEmpty() { return size == 0; }

    public void clear() {
        for (int i = 0; i < capacity; i++) {
            buckets[i].clear();
        }
        size = 0;
    }

    public LinkedList<E>[] getBuckets() {
        return buckets;
    }

    public List<E> getAllElements() {
        List<E> list = new ArrayList<>();
        for (LinkedList<E> bucket : buckets) {
            list.addAll(bucket);
        }
        return list;
    }
}
