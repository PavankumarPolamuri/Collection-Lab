package com.collectionlab.collections;

import java.util.NoSuchElementException;

/**
 * Custom implementation of a Binary Min-Heap Priority Queue from scratch using dynamic arrays.
 * Does NOT use java.util.PriorityQueue or any built-in collection classes.
 *
 * @param <T> Element type (must implement Comparable)
 */
public class CustomPriorityQueue<T extends Comparable<T>> {

    private static final int DEFAULT_CAPACITY = 8;
    private Object[] heap;
    private int size;

    public CustomPriorityQueue() {
        this(DEFAULT_CAPACITY);
    }

    public CustomPriorityQueue(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("Initial capacity must be positive: " + initialCapacity);
        }
        this.heap = new Object[initialCapacity];
        this.size = 0;
    }

    public boolean offer(T element) {
        return offer(element, null);
    }

    public boolean offer(T element, java.util.List<String> steps) {
        if (element == null) {
            throw new NullPointerException("Null elements not supported in CustomPriorityQueue");
        }

        if (steps != null) {
            steps.add("Request to OFFER (insert) element: '" + element + "'");
        }

        ensureCapacity(steps);

        heap[size] = element;
        if (steps != null) {
            steps.add("Placed element '" + element + "' at array index " + size + " (end of heap)");
        }

        siftUp(size, steps);
        size++;

        if (steps != null) {
            steps.add("Completed OFFER. Updated heap size to " + size);
        }
        return true;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        return peek(null);
    }

    @SuppressWarnings("unchecked")
    public T peek(java.util.List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Heap is empty. PEEK returns null.");
            }
            return null;
        }
        T min = (T) heap[0];
        if (steps != null) {
            steps.add("PEEK at root element (min value): '" + min + "'");
        }
        return min;
    }

    @SuppressWarnings("unchecked")
    public T poll() {
        return poll(null);
    }

    @SuppressWarnings("unchecked")
    public T poll(java.util.List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Heap is empty. POLL returns null.");
            }
            return null;
        }

        T result = (T) heap[0];
        if (steps != null) {
            steps.add("POLL root element (min value): '" + result + "'");
        }

        T lastElement = (T) heap[size - 1];
        heap[size - 1] = null;
        size--;

        if (size > 0) {
            heap[0] = lastElement;
            if (steps != null) {
                steps.add("Moved last element '" + lastElement + "' from array index " + size + " to root (index 0)");
                steps.add("Starting siftDown algorithm from root (index 0)...");
            }
            siftDown(0, steps);
        } else {
            if (steps != null) {
                steps.add("Queue is now empty.");
            }
        }

        return result;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int capacity() {
        return heap.length;
    }

    public void clear() {
        clear(null);
    }

    public void clear(java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Clearing all heap array elements...");
        }
        for (int i = 0; i < size; i++) {
            heap[i] = null;
        }
        size = 0;
    }

    public Object[] getHeapArray() {
        Object[] copy = new Object[size];
        System.arraycopy(heap, 0, copy, 0, size);
        return copy;
    }

    @SuppressWarnings("unchecked")
    private void siftUp(int k, java.util.List<String> steps) {
        T key = (T) heap[k];
        if (steps != null && k > 0) {
            steps.add("Starting siftUp algorithm for inserted element '" + key + "' from index " + k + "...");
        }

        while (k > 0) {
            int parentIndex = (k - 1) >>> 1;
            T parent = (T) heap[parentIndex];

            if (key.compareTo(parent) >= 0) {
                if (steps != null) {
                    steps.add("  Index " + k + " ('" + key + "') >= Parent index " + parentIndex + " ('" + parent + "'). Min-Heap property satisfied.");
                }
                break; // Min-heap property satisfied
            }

            if (steps != null) {
                steps.add("  Index " + k + " ('" + key + "') < Parent index " + parentIndex + " ('" + parent + "'). Swapping index " + k + " and " + parentIndex + ".");
            }

            heap[k] = parent;
            k = parentIndex;
        }
        heap[k] = key;
        if (steps != null) {
            steps.add("Final position of '" + key + "' set to index " + k);
        }
    }

    @SuppressWarnings("unchecked")
    private void siftDown(int k, java.util.List<String> steps) {
        T key = (T) heap[k];
        int half = size >>> 1; // loop while k has at least one child

        while (k < half) {
            int leftChildIndex = (k << 1) + 1;
            int rightChildIndex = leftChildIndex + 1;
            int smallestIndex = leftChildIndex;
            T smallestChild = (T) heap[leftChildIndex];

            if (rightChildIndex < size && ((T) heap[rightChildIndex]).compareTo(smallestChild) < 0) {
                smallestIndex = rightChildIndex;
                smallestChild = (T) heap[rightChildIndex];
            }

            if (key.compareTo(smallestChild) <= 0) {
                if (steps != null) {
                    steps.add("  Element '" + key + "' at index " + k + " <= Smallest child '" + smallestChild + "' at index " + smallestIndex + ". Heap property satisfied.");
                }
                break;
            }

            if (steps != null) {
                steps.add("  Element '" + key + "' at index " + k + " > Smallest child '" + smallestChild + "' at index " + smallestIndex + ". Swapping index " + k + " and " + smallestIndex + ".");
            }

            heap[k] = smallestChild;
            k = smallestIndex;
        }
        heap[k] = key;
        if (steps != null) {
            steps.add("Final position of '" + key + "' set to index " + k);
        }
    }

    private void ensureCapacity(java.util.List<String> steps) {
        if (size >= heap.length) {
            int oldCapacity = heap.length;
            int newCapacity = oldCapacity * 2;
            if (steps != null) {
                steps.add("HEAP ARRAY FULL (" + size + "/" + oldCapacity + ")");
                steps.add("Resizing heap array from " + oldCapacity + " to " + newCapacity);
            }
            Object[] newHeap = new Object[newCapacity];
            System.arraycopy(heap, 0, newHeap, 0, size);
            heap = newHeap;
        }
    }
}
