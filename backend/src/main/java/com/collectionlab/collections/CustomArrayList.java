package com.collectionlab.collections;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 * Custom implementation of a dynamic array from scratch.
 * Does NOT use java.util.ArrayList or any built-in collection classes.
 *
 * @param <T> Element type
 */
public class CustomArrayList<T> implements Iterable<T> {

    private static final int DEFAULT_CAPACITY = 8;
    private Object[] elements;
    private int size;

    public CustomArrayList() {
        this(DEFAULT_CAPACITY);
    }

    public CustomArrayList(int initialCapacity) {
        if (initialCapacity < 0) {
            throw new IllegalArgumentException("Initial capacity cannot be negative: " + initialCapacity);
        }
        this.elements = new Object[initialCapacity];
        this.size = 0;
    }

    /**
     * Appends element to the end of the list.
     * Captures operation execution steps into provided step list if non-null.
     */
    public boolean add(T element) {
        return add(element, null);
    }

    public boolean add(T element, java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Request to add element: '" + element + "' at index " + size);
        }

        ensureCapacityForAdd(steps);

        elements[size] = element;
        if (steps != null) {
            steps.add("Placed element '" + element + "' at index " + size);
        }
        size++;
        if (steps != null) {
            steps.add("Updated list size to " + size);
        }
        return true;
    }

    /**
     * Inserts element at specified index, shifting subsequent elements to the right.
     */
    public void add(int index, T element) {
        add(index, element, null);
    }

    public void add(int index, T element, java.util.List<String> steps) {
        checkPositionIndex(index);

        if (steps != null) {
            steps.add("Request to insert element '" + element + "' at index " + index);
        }

        ensureCapacityForAdd(steps);

        if (steps != null && index < size) {
            steps.add("Shifting " + (size - index) + " element(s) right from index " + index + " to " + (size));
        }

        for (int i = size; i > index; i--) {
            elements[i] = elements[i - 1];
        }

        elements[index] = element;
        size++;

        if (steps != null) {
            steps.add("Inserted element '" + element + "' at index " + index + ". New size: " + size);
        }
    }

    @SuppressWarnings("unchecked")
    public T get(int index) {
        return get(index, null);
    }

    @SuppressWarnings("unchecked")
    public T get(int index, java.util.List<String> steps) {
        checkElementIndex(index);
        if (steps != null) {
            steps.add("Validating index bounds [0, " + (size - 1) + "]: index " + index + " is valid.");
            steps.add("Accessed element at index " + index + ": '" + elements[index] + "'");
        }
        return (T) elements[index];
    }

    @SuppressWarnings("unchecked")
    public T set(int index, T element) {
        return set(index, element, null);
    }

    @SuppressWarnings("unchecked")
    public T set(int index, T element, java.util.List<String> steps) {
        checkElementIndex(index);
        T oldValue = (T) elements[index];
        elements[index] = element;
        if (steps != null) {
            steps.add("Validating index " + index + ". Replaced old value '" + oldValue + "' with new value '" + element + "'");
        }
        return oldValue;
    }

    @SuppressWarnings("unchecked")
    public T remove(int index) {
        return remove(index, null);
    }

    @SuppressWarnings("unchecked")
    public T remove(int index, java.util.List<String> steps) {
        checkElementIndex(index);
        T removedValue = (T) elements[index];
        if (steps != null) {
            steps.add("Removing element '" + removedValue + "' at index " + index);
        }

        int numMoved = size - index - 1;
        if (numMoved > 0) {
            if (steps != null) {
                steps.add("Shifting " + numMoved + " element(s) left to fill gap at index " + index);
            }
            for (int i = index; i < size - 1; i++) {
                elements[i] = elements[i + 1];
            }
        }
        elements[--size] = null; // Clear trailing reference

        if (steps != null) {
            steps.add("Decremented list size to " + size + ". Cleared trailing index.");
        }
        return removedValue;
    }

    public boolean contains(T element) {
        return contains(element, null);
    }

    public boolean contains(T element, java.util.List<String> steps) {
        return indexOf(element, steps) >= 0;
    }

    public int indexOf(T element) {
        return indexOf(element, null);
    }

    public int indexOf(T element, java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Searching for index of element '" + element + "' linearly from index 0 to " + (size - 1));
        }
        for (int i = 0; i < size; i++) {
            if (element == null ? elements[i] == null : element.equals(elements[i])) {
                if (steps != null) {
                    steps.add("Match found for '" + element + "' at index " + i);
                }
                return i;
            }
        }
        if (steps != null) {
            steps.add("Element '" + element + "' not found in array. Returning index -1.");
        }
        return -1;
    }

    public boolean removeByValue(T element) {
        return removeByValue(element, null);
    }

    public boolean removeByValue(T element, java.util.List<String> steps) {
        int index = indexOf(element, steps);
        if (index >= 0) {
            remove(index, steps);
            return true;
        }
        if (steps != null) {
            steps.add("Cannot remove: element '" + element + "' not found in array.");
        }
        return false;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int capacity() {
        return elements.length;
    }

    public void clear() {
        clear(null);
    }

    public void clear(java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Clearing all elements and resetting size from " + size + " to 0.");
        }
        for (int i = 0; i < size; i++) {
            elements[i] = null;
        }
        size = 0;
    }

    private void ensureCapacityForAdd(java.util.List<String> steps) {
        if (size >= elements.length) {
            int oldCapacity = elements.length;
            int newCapacity = oldCapacity == 0 ? DEFAULT_CAPACITY : oldCapacity * 2;
            if (steps != null) {
                steps.add("CAPACITY REACHED (" + size + "/" + oldCapacity + ")");
                steps.add("Creating new dynamic array of size " + newCapacity + " (Resize event)");
                steps.add("Copying " + size + " existing elements into new array...");
            }

            Object[] newElements = new Object[newCapacity];
            for (int i = 0; i < size; i++) {
                newElements[i] = elements[i];
            }
            this.elements = newElements;

            if (steps != null) {
                steps.add("Replaced internal array reference. New capacity: " + newCapacity);
            }
        }
    }

    private void checkElementIndex(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    }

    private void checkPositionIndex(int index) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    }

    @Override
    public Iterator<T> iterator() {
        return new CustomArrayListIterator();
    }

    private class CustomArrayListIterator implements Iterator<T> {
        private int cursor = 0;

        @Override
        public boolean hasNext() {
            return cursor < size;
        }

        @Override
        @SuppressWarnings("unchecked")
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more elements in CustomArrayList iterator");
            }
            return (T) elements[cursor++];
        }
    }
}
