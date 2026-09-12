package com.collectionlab.collections;

import java.util.Objects;

/**
 * Custom implementation of a Hash Map from scratch using Separate Chaining.
 * Does NOT use java.util.HashMap, java.util.Hashtable, or any built-in collection.
 *
 * @param <K> Key type
 * @param <V> Value type
 */
public class CustomHashMap<K, V> {

    public static class Entry<K, V> {
        public final K key;
        public V value;
        public final int hash;
        public Entry<K, V> next;

        public Entry(K key, V value, int hash, Entry<K, V> next) {
            this.key = key;
            this.value = value;
            this.hash = hash;
            this.next = next;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }

    private static final int DEFAULT_CAPACITY = 8;
    private static final float DEFAULT_LOAD_FACTOR = 0.75f;

    @SuppressWarnings("unchecked")
    private Entry<K, V>[] table = (Entry<K, V>[]) new Entry[DEFAULT_CAPACITY];
    private int size = 0;
    private float loadFactor = DEFAULT_LOAD_FACTOR;

    public CustomHashMap() {
        this(DEFAULT_CAPACITY, DEFAULT_LOAD_FACTOR);
    }

    @SuppressWarnings("unchecked")
    public CustomHashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("Initial capacity must be positive: " + initialCapacity);
        }
        if (loadFactor <= 0 || Float.isNaN(loadFactor)) {
            throw new IllegalArgumentException("Invalid load factor: " + loadFactor);
        }
        this.table = (Entry<K, V>[]) new Entry[initialCapacity];
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    /**
     * Calculates secondary hash code for key.
     */
    public int hash(Object key) {
        if (key == null) return 0;
        int h = key.hashCode();
        return h ^ (h >>> 16);
    }

    /**
     * Calculates bucket index for hash given table capacity.
     */
    public int getBucketIndex(int hash, int capacity) {
        return Math.abs(hash) % capacity;
    }

    public V put(K key, V value) {
        return put(key, value, null);
    }

    public V put(K key, V value, java.util.List<String> steps) {
        int h = hash(key);
        int index = getBucketIndex(h, table.length);

        if (steps != null) {
            steps.add("Request to PUT key '" + key + "', value '" + value + "'");
            steps.add("Calculated hash code: " + h);
            steps.add("Calculated bucket index: " + index + " (formula: hash % capacity = " + h + " % " + table.length + ")");
        }

        Entry<K, V> head = table[index];

        // Check for existing key in bucket chain (Update operation)
        Entry<K, V> curr = head;
        int chainPosition = 0;
        while (curr != null) {
            if (curr.hash == h && Objects.equals(curr.key, key)) {
                V oldVal = curr.value;
                curr.value = value;
                if (steps != null) {
                    steps.add("Key '" + key + "' found in bucket [" + index + "] at position " + chainPosition + ".");
                    steps.add("Updated value from '" + oldVal + "' to '" + value + "'.");
                }
                return oldVal;
            }
            curr = curr.next;
            chainPosition++;
        }

        // Key not found in chain, prepending new Entry (Collision handling via Separate Chaining)
        boolean isCollision = (head != null);
        if (steps != null) {
            if (isCollision) {
                steps.add("COLLISION DETECTED at bucket [" + index + "]! Existing chain length: " + chainPosition);
                steps.add("Prepending new Entry to head of bucket [" + index + "] separate chain.");
            } else {
                steps.add("No collision. Bucket [" + index + "] was empty.");
                steps.add("Inserted new Entry into bucket [" + index + "].");
            }
        }

        Entry<K, V> newEntry = new Entry<>(key, value, h, head);
        table[index] = newEntry;
        size++;

        if (steps != null) {
            steps.add("Updated total map size to " + size + ". Current load ratio: " + (float) size / table.length);
        }

        // Check if resize threshold is exceeded
        int threshold = (int) (table.length * loadFactor);
        if (size > threshold) {
            if (steps != null) {
                steps.add("LOAD FACTOR THRESHOLD EXCEEDED (" + size + " > " + threshold + ")");
            }
            resize(table.length * 2, steps);
        }

        return null;
    }

    public V get(K key) {
        return get(key, null);
    }

    public V get(K key, java.util.List<String> steps) {
        int h = hash(key);
        int index = getBucketIndex(h, table.length);

        if (steps != null) {
            steps.add("GET key '" + key + "'");
            steps.add("Calculated hash: " + h + ", Bucket index: " + index);
        }

        Entry<K, V> curr = table[index];
        int depth = 0;

        while (curr != null) {
            if (curr.hash == h && Objects.equals(curr.key, key)) {
                if (steps != null) {
                    steps.add("Key '" + key + "' found at bucket [" + index + "] position " + depth + " with value '" + curr.value + "'");
                }
                return curr.value;
            }
            curr = curr.next;
            depth++;
        }

        if (steps != null) {
            steps.add("Key '" + key + "' not found in bucket [" + index + "].");
        }
        return null;
    }

    public boolean containsKey(K key) {
        return containsKey(key, null);
    }

    public boolean containsKey(K key, java.util.List<String> steps) {
        return get(key, steps) != null || (key == null && containsNullKey(steps));
    }

    public boolean containsValue(V value) {
        return containsValue(value, null);
    }

    public boolean containsValue(V value, java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Searching for value '" + value + "' linearly across all buckets...");
        }
        for (int i = 0; i < table.length; i++) {
            Entry<K, V> curr = table[i];
            while (curr != null) {
                if (Objects.equals(curr.value, value)) {
                    if (steps != null) {
                        steps.add("Value '" + value + "' found in bucket [" + i + "] for key '" + curr.key + "'");
                    }
                    return true;
                }
                curr = curr.next;
            }
        }
        if (steps != null) {
            steps.add("Value '" + value + "' not found in CustomHashMap.");
        }
        return false;
    }

    private boolean containsNullKey(java.util.List<String> steps) {
        Entry<K, V> curr = table[0];
        while (curr != null) {
            if (curr.key == null) return true;
            curr = curr.next;
        }
        return false;
    }

    public V remove(K key) {
        return remove(key, null);
    }

    public V remove(K key, java.util.List<String> steps) {
        int h = hash(key);
        int index = getBucketIndex(h, table.length);

        if (steps != null) {
            steps.add("REMOVE key '" + key + "'");
            steps.add("Calculated bucket index: " + index);
        }

        Entry<K, V> curr = table[index];
        Entry<K, V> prev = null;

        while (curr != null) {
            if (curr.hash == h && Objects.equals(curr.key, key)) {
                if (prev == null) {
                    table[index] = curr.next;
                } else {
                    prev.next = curr.next;
                }
                size--;
                if (steps != null) {
                    steps.add("Removed entry key '" + key + "' (value: '" + curr.value + "') from bucket [" + index + "]. New size: " + size);
                }
                return curr.value;
            }
            prev = curr;
            curr = curr.next;
        }

        if (steps != null) {
            steps.add("Key '" + key + "' not found to remove.");
        }
        return null;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int capacity() {
        return table.length;
    }

    public float loadFactor() {
        return loadFactor;
    }

    @SuppressWarnings("unchecked")
    public void clear() {
        clear(null);
    }

    @SuppressWarnings("unchecked")
    public void clear(java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Clearing all buckets in CustomHashMap...");
        }
        this.table = (Entry<K, V>[]) new Entry[DEFAULT_CAPACITY];
        this.size = 0;
    }

    public Entry<K, V>[] getBuckets() {
        return table;
    }

    @SuppressWarnings("unchecked")
    private void resize(int newCapacity, java.util.List<String> steps) {
        int oldCapacity = table.length;
        if (steps != null) {
            steps.add("RESIZING HASH MAP: Old capacity = " + oldCapacity + " -> New capacity = " + newCapacity);
            steps.add("Allocating new bucket array of size " + newCapacity + "...");
            steps.add("Rehashing existing " + size + " entries into new buckets...");
        }

        Entry<K, V>[] newTable = (Entry<K, V>[]) new Entry[newCapacity];

        for (int i = 0; i < oldCapacity; i++) {
            Entry<K, V> curr = table[i];
            while (curr != null) {
                Entry<K, V> next = curr.next;
                int newIndex = getBucketIndex(curr.hash, newCapacity);

                // Relink to new table
                curr.next = newTable[newIndex];
                newTable[newIndex] = curr;

                if (steps != null) {
                    steps.add("  Rehashed key '" + curr.key + "' from old bucket [" + i + "] -> new bucket [" + newIndex + "]");
                }

                curr = next;
            }
        }

        this.table = newTable;
        if (steps != null) {
            steps.add("Rehashing completed. Capacity successfully updated to " + newCapacity);
        }
    }
}
