package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;

public class CustomCircularLinkedList<E> {

    public static class Node<E> {
        public E data;
        public Node<E> next;

        public Node(E data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size;

    public CustomCircularLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public void addFirst(E item, List<String> steps) {
        Node<E> newNode = new Node<>(item);
        if (steps != null) {
            steps.add("Creating new node with value '" + item + "' to insert at HEAD.");
        }
        if (isEmpty()) {
            head = newNode;
            tail = newNode;
            newNode.next = head; // circular pointer
            if (steps != null) {
                steps.add("List was empty. Single node set as both HEAD and TAIL pointing to HEAD.");
            }
        } else {
            newNode.next = head;
            head = newNode;
            tail.next = head; // update circular link
            if (steps != null) {
                steps.add("Inserted '" + item + "' as new HEAD. TAIL next pointer updated to point back to new HEAD.");
            }
        }
        size++;
    }

    public void addLast(E item, List<String> steps) {
        Node<E> newNode = new Node<>(item);
        if (steps != null) {
            steps.add("Creating new node with value '" + item + "' to append at TAIL.");
        }
        if (isEmpty()) {
            head = newNode;
            tail = newNode;
            newNode.next = head;
            if (steps != null) {
                steps.add("List was empty. Single node set as both HEAD and TAIL pointing to HEAD.");
            }
        } else {
            tail.next = newNode;
            tail = newNode;
            tail.next = head; // update circular link
            if (steps != null) {
                steps.add("Appended '" + item + "' as new TAIL. TAIL next pointer updated to loop back to HEAD.");
            }
        }
        size++;
    }

    public void add(int index, E item, List<String> steps) {
        if (index < 0 || index > size) {
            if (steps != null) steps.add("IndexOutOfBoundsException: Invalid index " + index + " for size " + size + ".");
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
        if (index == 0) {
            addFirst(item, steps);
            return;
        }
        if (index == size) {
            addLast(item, steps);
            return;
        }

        if (steps != null) {
            steps.add("Traversing to index " + (index - 1) + " to insert '" + item + "'.");
        }
        Node<E> curr = head;
        for (int i = 0; i < index - 1; i++) {
            curr = curr.next;
        }

        Node<E> newNode = new Node<>(item);
        newNode.next = curr.next;
        curr.next = newNode;
        size++;

        if (steps != null) {
            steps.add("Inserted '" + item + "' at index " + index + " in Circular LinkedList.");
        }
    }

    public E get(int index, List<String> steps) {
        checkBounds(index);
        Node<E> curr = head;
        for (int i = 0; i < index; i++) {
            curr = curr.next;
        }
        if (steps != null) {
            steps.add("Retrieved element at index " + index + ": '" + curr.data + "'.");
        }
        return curr.data;
    }

    public E set(int index, E item, List<String> steps) {
        checkBounds(index);
        Node<E> curr = head;
        for (int i = 0; i < index; i++) {
            curr = curr.next;
        }
        E oldVal = curr.data;
        curr.data = item;
        if (steps != null) {
            steps.add("Updated element at index " + index + " from '" + oldVal + "' to '" + item + "'.");
        }
        return oldVal;
    }

    public E removeFirst(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Error: Cannot remove from empty Circular LinkedList.");
            throw new IllegalStateException("List is empty");
        }
        E oldVal = head.data;
        if (size == 1) {
            head = null;
            tail = null;
            if (steps != null) steps.add("Removed single node '" + oldVal + "'. List is now empty.");
        } else {
            head = head.next;
            tail.next = head; // update circular link
            if (steps != null) steps.add("Removed HEAD node '" + oldVal + "'. New HEAD is '" + head.data + "' and TAIL points to it.");
        }
        size--;
        return oldVal;
    }

    public E removeLast(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("Error: Cannot remove from empty Circular LinkedList.");
            throw new IllegalStateException("List is empty");
        }
        if (size == 1) {
            return removeFirst(steps);
        }
        Node<E> curr = head;
        while (curr.next != tail) {
            curr = curr.next;
        }
        E oldVal = tail.data;
        tail = curr;
        tail.next = head; // update circular link
        size--;
        if (steps != null) steps.add("Removed TAIL node '" + oldVal + "'. New TAIL is '" + tail.data + "' pointing back to HEAD.");
        return oldVal;
    }

    public E remove(int index, List<String> steps) {
        checkBounds(index);
        if (index == 0) return removeFirst(steps);
        if (index == size - 1) return removeLast(steps);

        Node<E> curr = head;
        for (int i = 0; i < index - 1; i++) {
            curr = curr.next;
        }
        E oldVal = curr.next.data;
        curr.next = curr.next.next;
        size--;
        if (steps != null) steps.add("Removed node at index " + index + " ('" + oldVal + "').");
        return oldVal;
    }

    public boolean contains(E item, List<String> steps) {
        if (isEmpty()) return false;
        Node<E> curr = head;
        for (int i = 0; i < size; i++) {
            if ((item == null && curr.data == null) || (item != null && item.equals(curr.data))) {
                if (steps != null) steps.add("Found element '" + item + "' at index " + i + " in Circular LinkedList.");
                return true;
            }
            curr = curr.next;
        }
        if (steps != null) steps.add("Element '" + item + "' NOT found in Circular LinkedList.");
        return false;
    }

    private void checkBounds(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    }

    public Node<E> getHead() { return head; }
    public Node<E> getTail() { return tail; }
    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }

    public List<E> toList() {
        List<E> list = new ArrayList<>();
        if (isEmpty()) return list;
        Node<E> curr = head;
        for (int i = 0; i < size; i++) {
            list.add(curr.data);
            curr = curr.next;
        }
        return list;
    }
}
