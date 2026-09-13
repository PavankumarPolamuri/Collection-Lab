package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;

public class CustomStack<E> {
    private final List<E> elements;

    public CustomStack() {
        this.elements = new ArrayList<>();
    }

    public void push(E item, List<String> steps) {
        if (steps != null) {
            steps.add("Pushing element '" + item + "' onto the stack.");
        }
        elements.add(item);
        if (steps != null) {
            steps.add("Element '" + item + "' is now at the TOP of the stack (index " + (elements.size() - 1) + ").");
        }
    }

    public E pop(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Stack Underflow Error: Cannot pop from an empty stack.");
            }
            throw new IllegalStateException("Stack is empty");
        }
        E item = elements.remove(elements.size() - 1);
        if (steps != null) {
            steps.add("Popped element '" + item + "' from the TOP of the stack.");
            if (!isEmpty()) {
                steps.add("New TOP element is '" + peek() + "'.");
            } else {
                steps.add("Stack is now empty.");
            }
        }
        return item;
    }

    public E peek(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) {
                steps.add("Stack is empty. Cannot peek.");
            }
            throw new IllegalStateException("Stack is empty");
        }
        E item = elements.get(elements.size() - 1);
        if (steps != null) {
            steps.add("Inspected TOP element: '" + item + "'.");
        }
        return item;
    }

    public E peek() {
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
