package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;

public class CustomMinHeap<E extends Comparable<E>> {
    private final List<E> heap;

    public CustomMinHeap() {
        this.heap = new ArrayList<>();
    }

    public void insert(E item, List<String> steps) {
        if (item == null) return;
        if (steps != null) {
            steps.add("Inserting element '" + item + "' at end of heap array (index " + heap.size() + ").");
        }
        heap.add(item);
        siftUp(heap.size() - 1, steps);
    }

    private void siftUp(int index, List<String> steps) {
        while (index > 0) {
            int parentIdx = (index - 1) / 2;
            if (heap.get(index).compareTo(heap.get(parentIdx)) < 0) {
                if (steps != null) {
                    steps.add("Sifting up: Swapping index " + index + " ('" + heap.get(index) + "') with parent index " + parentIdx + " ('" + heap.get(parentIdx) + "').");
                }
                swap(index, parentIdx);
                index = parentIdx;
            } else {
                break;
            }
        }
        if (steps != null) {
            steps.add("Heap invariant satisfied after siftUp.");
        }
    }

    public E extractMin(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Heap Underflow: Cannot extract min from empty heap.");
            throw new IllegalStateException("Heap is empty");
        }
        E minVal = heap.get(0);
        if (steps != null) {
            steps.add("Extracting root minimum value: '" + minVal + "'.");
        }
        E lastVal = heap.remove(heap.size() - 1);
        if (!isEmpty()) {
            heap.set(0, lastVal);
            if (steps != null) {
                steps.add("Moved last element '" + lastVal + "' to root position (index 0). Performing siftDown.");
            }
            siftDown(0, steps);
        } else if (steps != null) {
            steps.add("Heap is now empty.");
        }
        return minVal;
    }

    private void siftDown(int index, List<String> steps) {
        int half = heap.size() / 2;
        while (index < half) {
            int leftChild = 2 * index + 1;
            int rightChild = leftChild + 1;
            int smallest = leftChild;

            if (rightChild < heap.size() && heap.get(rightChild).compareTo(heap.get(leftChild)) < 0) {
                smallest = rightChild;
            }

            if (heap.get(index).compareTo(heap.get(smallest)) <= 0) {
                break;
            }

            if (steps != null) {
                steps.add("Sifting down: Swapping index " + index + " ('" + heap.get(index) + "') with smaller child index " + smallest + " ('" + heap.get(smallest) + "').");
            }
            swap(index, smallest);
            index = smallest;
        }
    }

    private void swap(int i, int j) {
        E temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public E peek(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Heap is empty.");
            throw new IllegalStateException("Heap is empty");
        }
        E val = heap.get(0);
        if (steps != null) steps.add("Peeked minimum root value: '" + val + "'.");
        return val;
    }

    public E peek() {
        if (isEmpty()) return null;
        return heap.get(0);
    }

    public boolean isEmpty() { return heap.isEmpty(); }
    public int size() { return heap.size(); }
    public void clear() { heap.clear(); }
    public List<E> getHeapArray() { return new ArrayList<>(heap); }
}
