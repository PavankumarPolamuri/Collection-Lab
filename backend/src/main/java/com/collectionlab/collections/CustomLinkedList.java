package com.collectionlab.collections;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 * Custom implementation of a doubly linked list from scratch.
 * Does NOT use java.util.LinkedList or any built-in collection classes.
 *
 * @param <T> Element type
 */
public class CustomLinkedList<T> implements Iterable<T> {

    public static class Node<T> {
        public T data;
        public Node<T> next;
        public Node<T> prev;

        public Node(T data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    public CustomLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public void addFirst(T element) {
        addFirst(element, null);
    }

    public void addFirst(T element, java.util.List<String> steps) {
        Node<T> newNode = new Node<>(element);
        if (steps != null) {
            steps.add("Created new Node with data: '" + element + "'");
        }

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
            if (steps != null) {
                steps.add("List was empty. Set HEAD and TAIL to new Node('" + element + "')");
            }
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
            if (steps != null) {
                steps.add("Updated pointers: newNode.next -> old HEAD, old HEAD.prev -> newNode");
                steps.add("Reassigned HEAD to new Node('" + element + "')");
            }
        }
        size++;
    }

    public void addLast(T element) {
        addLast(element, null);
    }

    public void addLast(T element, java.util.List<String> steps) {
        Node<T> newNode = new Node<>(element);
        if (steps != null) {
            steps.add("Created new Node with data: '" + element + "'");
        }

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
            if (steps != null) {
                steps.add("List was empty. Set HEAD and TAIL to new Node('" + element + "')");
            }
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
            if (steps != null) {
                steps.add("Updated pointers: old TAIL.next -> newNode, newNode.prev -> old TAIL");
                steps.add("Reassigned TAIL to new Node('" + element + "')");
            }
        }
        size++;
    }

    public boolean add(T element) {
        addLast(element);
        return true;
    }

    public boolean add(T element, java.util.List<String> steps) {
        addLast(element, steps);
        return true;
    }

    public void add(int index, T element) {
        add(index, element, null);
    }

    public void add(int index, T element, java.util.List<String> steps) {
        checkPositionIndex(index);

        if (index == 0) {
            addFirst(element, steps);
            return;
        }
        if (index == size) {
            addLast(element, steps);
            return;
        }

        if (steps != null) {
            steps.add("Traversing to position index " + index + "...");
        }

        Node<T> current = getNode(index, steps);
        Node<T> prevNode = current.prev;
        Node<T> newNode = new Node<>(element);

        newNode.prev = prevNode;
        newNode.next = current;
        prevNode.next = newNode;
        current.prev = newNode;

        if (steps != null) {
            steps.add("Inserted Node('" + element + "') between index " + (index - 1) + " and index " + index);
            steps.add("Updated node pointers: prev.next -> newNode, current.prev -> newNode");
        }
        size++;
    }

    public T get(int index) {
        return get(index, null);
    }

    public T get(int index, java.util.List<String> steps) {
        checkElementIndex(index);
        Node<T> node = getNode(index, steps);
        return node.data;
    }

    public T set(int index, T element) {
        return set(index, element, null);
    }

    public T set(int index, T element, java.util.List<String> steps) {
        checkElementIndex(index);
        Node<T> node = getNode(index, steps);
        T oldValue = node.data;
        node.data = element;
        if (steps != null) {
            steps.add("Updated Node data at index " + index + " from '" + oldValue + "' to '" + element + "'");
        }
        return oldValue;
    }

    public T removeFirst() {
        return removeFirst(null);
    }

    public T removeFirst(java.util.List<String> steps) {
        if (isEmpty()) {
            throw new NoSuchElementException("Cannot remove from empty CustomLinkedList");
        }

        T data = head.data;
        if (steps != null) {
            steps.add("Removing HEAD node with value: '" + data + "'");
        }

        if (size == 1) {
            head = null;
            tail = null;
            if (steps != null) {
                steps.add("List is now empty. HEAD and TAIL set to null.");
            }
        } else {
            head = head.next;
            head.prev = null;
            if (steps != null) {
                steps.add("Updated HEAD to next node. Set new HEAD.prev = null.");
            }
        }
        size--;
        return data;
    }

    public T removeLast() {
        return removeLast(null);
    }

    public T removeLast(java.util.List<String> steps) {
        if (isEmpty()) {
            throw new NoSuchElementException("Cannot remove from empty CustomLinkedList");
        }

        T data = tail.data;
        if (steps != null) {
            steps.add("Removing TAIL node with value: '" + data + "'");
        }

        if (size == 1) {
            head = null;
            tail = null;
            if (steps != null) {
                steps.add("List is now empty. HEAD and TAIL set to null.");
            }
        } else {
            tail = tail.prev;
            tail.next = null;
            if (steps != null) {
                steps.add("Updated TAIL to prev node. Set new TAIL.next = null.");
            }
        }
        size--;
        return data;
    }

    public T remove(int index) {
        return remove(index, null);
    }

    public T remove(int index, java.util.List<String> steps) {
        checkElementIndex(index);
        if (index == 0) {
            return removeFirst(steps);
        }
        if (index == size - 1) {
            return removeLast(steps);
        }

        Node<T> node = getNode(index, steps);
        T data = node.data;

        node.prev.next = node.next;
        node.next.prev = node.prev;

        if (steps != null) {
            steps.add("Unlinked node at index " + index + " (value: '" + data + "')");
            steps.add("Reassigned prevNode.next -> nextNode and nextNode.prev -> prevNode");
        }
        size--;
        return data;
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
        Node<T> curr = head;
        int idx = 0;
        if (steps != null) {
            steps.add("Searching linearly starting from HEAD for element '" + element + "'...");
        }
        while (curr != null) {
            if (element == null ? curr.data == null : element.equals(curr.data)) {
                if (steps != null) {
                    steps.add("Match found for element '" + element + "' at index " + idx + " (node value: '" + curr.data + "')");
                }
                return idx;
            }
            curr = curr.next;
            idx++;
        }
        if (steps != null) {
            steps.add("Element '" + element + "' not found in CustomLinkedList. Returning index -1.");
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
            steps.add("Cannot remove: element '" + element + "' not found in CustomLinkedList.");
        }
        return false;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public Node<T> getHead() {
        return head;
    }

    public Node<T> getTail() {
        return tail;
    }

    public void clear() {
        clear(null);
    }

    public void clear(java.util.List<String> steps) {
        if (steps != null) {
            steps.add("Clearing all nodes in CustomLinkedList...");
        }
        Node<T> curr = head;
        while (curr != null) {
            Node<T> next = curr.next;
            curr.data = null;
            curr.next = null;
            curr.prev = null;
            curr = next;
        }
        head = null;
        tail = null;
        size = 0;
    }

    private Node<T> getNode(int index, java.util.List<String> steps) {
        // Optimize search from head or tail depending on index position
        Node<T> curr;
        if (index < (size >> 1)) {
            if (steps != null) {
                steps.add("Index " + index + " is in first half (size " + size + "). Traversing forward from HEAD.");
            }
            curr = head;
            for (int i = 0; i < index; i++) {
                curr = curr.next;
            }
        } else {
            if (steps != null) {
                steps.add("Index " + index + " is in second half (size " + size + "). Traversing backward from TAIL.");
            }
            curr = tail;
            for (int i = size - 1; i > index; i--) {
                curr = curr.prev;
            }
        }
        return curr;
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
        return new CustomLinkedListIterator();
    }

    private class CustomLinkedListIterator implements Iterator<T> {
        private Node<T> cursor = head;

        @Override
        public boolean hasNext() {
            return cursor != null;
        }

        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more elements in CustomLinkedList iterator");
            }
            T data = cursor.data;
            cursor = cursor.next;
            return data;
        }
    }
}
