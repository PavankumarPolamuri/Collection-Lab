package com.collectionlab;

import com.collectionlab.collections.CustomArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CustomArrayListTest {

    private CustomArrayList<Integer> list;

    @BeforeEach
    void setUp() {
        list = new CustomArrayList<>(4); // small initial capacity to test resizing
    }

    @Test
    @DisplayName("Should initialize empty list with initial capacity")
    void testInitialState() {
        assertTrue(list.isEmpty());
        assertEquals(0, list.size());
        assertEquals(4, list.capacity());
    }

    @Test
    @DisplayName("Should add elements and auto-resize when capacity is reached")
    void testAddAndResize() {
        List<String> steps = new ArrayList<>();
        list.add(10, steps);
        list.add(20, steps);
        list.add(30, steps);
        list.add(40, steps);

        assertEquals(4, list.size());
        assertEquals(4, list.capacity());

        // This 5th element triggers resize from 4 to 8
        list.add(50, steps);

        assertEquals(5, list.size());
        assertEquals(8, list.capacity());
        assertEquals(10, list.get(0));
        assertEquals(50, list.get(4));
        assertTrue(steps.stream().anyMatch(s -> s.contains("CAPACITY REACHED")));
    }

    @Test
    @DisplayName("Should insert element at specific index and shift elements")
    void testAddAtIndex() {
        list.add(10);
        list.add(30);
        list.add(1, 20); // insert 20 at index 1

        assertEquals(3, list.size());
        assertEquals(10, list.get(0));
        assertEquals(20, list.get(1));
        assertEquals(30, list.get(2));
    }

    @Test
    @DisplayName("Should set element at index and return previous element")
    void testSet() {
        list.add(100);
        int oldVal = list.set(0, 999);

        assertEquals(100, oldVal);
        assertEquals(999, list.get(0));
    }

    @Test
    @DisplayName("Should remove element at index and shift remaining elements")
    void testRemove() {
        list.add(10);
        list.add(20);
        list.add(30);

        int removed = list.remove(1); // removes 20

        assertEquals(20, removed);
        assertEquals(2, list.size());
        assertEquals(10, list.get(0));
        assertEquals(30, list.get(1));
    }

    @Test
    @DisplayName("Should correctly identify presence of element using contains")
    void testContains() {
        list.add(42);
        assertTrue(list.contains(42));
        assertFalse(list.contains(999));
    }

    @Test
    @DisplayName("Should return correct index of element")
    void testIndexOf() {
        list.add(10);
        list.add(20);
        list.add(30);

        assertEquals(1, list.indexOf(20));
        assertEquals(-1, list.indexOf(999));
    }

    @Test
    @DisplayName("Should remove element by value")
    void testRemoveByValue() {
        list.add(10);
        list.add(20);
        list.add(30);

        assertTrue(list.removeByValue(20));
        assertEquals(2, list.size());
        assertEquals(30, list.get(1));
        assertFalse(list.removeByValue(999));
    }

    @Test
    @DisplayName("Should clear all elements")
    void testClear() {
        list.add(1);
        list.add(2);
        list.clear();

        assertEquals(0, list.size());
        assertTrue(list.isEmpty());
    }

    @Test
    @DisplayName("Should iterate through elements sequentially")
    void testIterator() {
        list.add(10);
        list.add(20);

        Iterator<Integer> it = list.iterator();
        assertTrue(it.hasNext());
        assertEquals(10, it.next());
        assertTrue(it.hasNext());
        assertEquals(20, it.next());
        assertFalse(it.hasNext());
    }

    @Test
    @DisplayName("Should throw IndexOutOfBoundsException for invalid index")
    void testIndexOutOfBounds() {
        assertThrows(IndexOutOfBoundsException.class, () -> list.get(0));
        assertThrows(IndexOutOfBoundsException.class, () -> list.remove(0));
        assertThrows(IndexOutOfBoundsException.class, () -> list.add(5, 100));
    }
}
