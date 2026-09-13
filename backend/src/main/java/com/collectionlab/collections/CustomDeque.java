package com.collectionlab.collections;

import java.util.LinkedList;
import java.util.List;

public class CustomDeque<E> {
    private final LinkedList<E> elements;

    public CustomDeque() {
        this.elements = new LinkedList<>();
    }

    public void addFirst(E item, List<String> steps) {
        if (steps != null) {
            steps.add("Adding element '" + item + "' to FRONT of deque.");
        }
        elements.addFirst(item);
        if (steps != null) {
            steps.add("Element '" + item + "' is now at FRONT.");
        }
    }

    public void addLast(E item, List<String> steps) {
        if (steps != null) {
            steps.add("Adding element '" + item + "' to REAR / END of deque.");
        }
        elements.addLast(item);
        if (steps != null) {
            steps.add("Element '" + item + "' is now at REAR.");
        }
    }

    public E removeFirst(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Error: Cannot remove from empty deque.");
            }
            throw new IllegalStateException("Deque is empty");
        }
        E item = elements.removeFirst();
        if (steps != null) {
            steps.add("Removed element '" + item + "' from FRONT of deque.");
        }
        return item;
    }

    public E removeLast(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Error: Cannot remove from empty deque.");
            }
            throw new IllegalStateException("Deque is empty");
        }
        E item = elements.removeLast();
        if (steps != null) {
            steps.add("Removed element '" + item + "' from REAR of deque.");
        }
        return item;
    }

    public E peekFirst(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Deque is empty.");
            throw new IllegalStateException("Deque is empty");
        }
        E item = elements.peekFirst();
        if (steps != null) steps.add("Peeked FRONT element: '" + item + "'.");
        return item;
    }

    public E peekLast(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Deque is empty.");
            throw new IllegalStateException("Deque is empty");
        }
        E item = elements.peekLast();
        if (steps != null) steps.add("Peeked REAR element: '" + item + "'.");
        return item;
    }

    public E peekFirst() { return elements.peekFirst(); }
    public E peekLast() { return elements.peekLast(); }

    public boolean isEmpty() { return elements.isEmpty(); }
    public int size() { return elements.size(); }
    public void clear() { elements.clear(); }
    public List<E> getElements() { return new java.util.ArrayList<>(elements); }
}
