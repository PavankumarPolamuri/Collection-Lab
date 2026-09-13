package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;

public class CustomQueue<E> {
    private final List<E> elements;

    public CustomQueue() {
        this.elements = new ArrayList<>();
    }

    public void enqueue(E item, List<String> steps) {
        if (steps != null) {
            steps.add("Enqueueing element '" + item + "' at the REAR of the queue.");
        }
        elements.add(item);
        if (steps != null) {
            steps.add("Element '" + item + "' added. Queue size is now " + elements.size() + ".");
        }
    }

    public E dequeue(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Queue Underflow Error: Cannot dequeue from an empty queue.");
            }
            throw new IllegalStateException("Queue is empty");
        }
        E item = elements.remove(0);
        if (steps != null) {
            steps.add("Dequeued element '" + item + "' from the FRONT of the queue.");
            if (!isEmpty()) {
                steps.add("New FRONT element is '" + peek() + "'.");
            } else {
                steps.add("Queue is now empty.");
            }
        }
        return item;
    }

    public E peek(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Queue is empty. Cannot peek.");
            }
            throw new IllegalStateException("Queue is empty");
        }
        E item = elements.get(0);
        if (steps != null) {
            steps.add("Inspected FRONT element: '" + item + "'.");
        }
        return item;
    }

    public E peek() {
        if (isEmpty()) return null;
        return elements.get(0);
    }

    public E getRear() {
        if (isEmpty()) return null;
        return elements.get(elements.size() - 1);
    }

    public boolean isEmpty() {
        return elements.isEmpty();
    }

    public int size() {
        return elements.size();
    }

    public void clear() {
        elements.clear();
    }

    public List<E> getElements() {
        return new ArrayList<>(elements);
    }
}
