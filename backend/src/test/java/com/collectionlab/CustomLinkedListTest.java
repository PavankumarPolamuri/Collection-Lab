package com.collectionlab;

import com.collectionlab.collections.CustomLinkedList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

class CustomLinkedListTest {

    private CustomLinkedList<String> list;

    @BeforeEach
    void setUp() {
        list = new CustomLinkedList<>();
    }

    @Test
    @DisplayName("Should initialize empty doubly linked list")
    void testInitialState() {
        assertTrue(list.isEmpty());
        assertEquals(0, list.size());
        assertNull(list.getHead());
        assertNull(list.getTail());
    }

    @Test
    @DisplayName("Should add elements to head and tail correctly")
    void testAddFirstAndLast() {
        list.addFirst("B");
        list.addFirst("A"); // A -> B
        list.addLast("C");  // A -> B -> C

        assertEquals(3, list.size());
        assertEquals("A", list.getHead().data);
        assertEquals("C", list.getTail().data);
        assertEquals("A", list.get(0));
        assertEquals("B", list.get(1));
        assertEquals("C", list.get(2));
    }

    @Test
    @DisplayName("Should insert element at middle index and update node pointers")
    void testAddAtIndex() {
        list.add("10");
        list.add("30");
        list.add(1, "20");

        assertEquals(3, list.size());
        assertEquals("10", list.get(0));
        assertEquals("20", list.get(1));
        assertEquals("30", list.get(2));
    }

    @Test
    @DisplayName("Should remove head, tail, and middle elements correctly")
    void testRemovals() {
        list.add("10");
        list.add("20");
        list.add("30");
        list.add("40");

        assertEquals("10", list.removeFirst());
        assertEquals("40", list.removeLast());
        assertEquals("20", list.remove(0)); // removes "20" (now index 0)

        assertEquals(1, list.size());
        assertEquals("30", list.get(0));
        assertEquals("30", list.getHead().data);
        assertEquals("30", list.getTail().data);
    }

    @Test
    @DisplayName("Should check element presence and perform iterator walk")
    void testContainsAndIterator() {
        List<String> steps = new ArrayList<>();
        list.add("Java", steps);
        list.add("Spring", steps);

        assertTrue(list.contains("Java", steps));
        assertFalse(list.contains("Python", steps));
        assertEquals(0, list.indexOf("Java"));
        assertEquals(-1, list.indexOf("Python"));

        assertTrue(list.removeByValue("Java"));
        assertEquals(1, list.size());
        assertEquals("Spring", list.get(0));

        Iterator<String> it = list.iterator();
        assertTrue(it.hasNext());
        assertEquals("Spring", it.next());
        assertFalse(it.hasNext());
    }

    @Test
    @DisplayName("Should clear all nodes and reset head/tail to null")
    void testClear() {
        list.add("X");
        list.add("Y");
        list.clear();

        assertEquals(0, list.size());
        assertTrue(list.isEmpty());
        assertNull(list.getHead());
        assertNull(list.getTail());
    }

    @Test
    @DisplayName("Should throw exceptions for invalid access or removal on empty list")
    void testExceptions() {
        assertThrows(NoSuchElementException.class, () -> list.removeFirst());
        assertThrows(NoSuchElementException.class, () -> list.removeLast());
        assertThrows(IndexOutOfBoundsException.class, () -> list.get(0));
    }
}
