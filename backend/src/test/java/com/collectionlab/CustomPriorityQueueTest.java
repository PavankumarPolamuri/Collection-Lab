package com.collectionlab;

import com.collectionlab.collections.CustomPriorityQueue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CustomPriorityQueueTest {

    private CustomPriorityQueue<Integer> pq;

    @BeforeEach
    void setUp() {
        pq = new CustomPriorityQueue<>(4); // Small initial capacity to test heap array expansion
    }

    @Test
    @DisplayName("Should initialize empty min-heap priority queue")
    void testInitialState() {
        assertTrue(pq.isEmpty());
        assertEquals(0, pq.size());
        assertNull(pq.peek());
        assertNull(pq.poll());
    }

    @Test
    @DisplayName("Should offer elements and maintain Min-Heap property (root is smallest)")
    void testOfferAndSiftUp() {
        List<String> steps = new ArrayList<>();
        pq.offer(30, steps);
        pq.offer(10, steps); // 10 sifted up to root
        pq.offer(20, steps);
        pq.offer(5, steps);  // 5 sifted up to root

        assertEquals(4, pq.size());
        assertEquals(5, pq.peek());

        assertTrue(steps.stream().anyMatch(s -> s.contains("siftUp")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("Swapping index")));
    }

    @Test
    @DisplayName("Should poll elements in strictly ascending sorted priority order (min-heap)")
    void testPollAndSiftDown() {
        pq.offer(50);
        pq.offer(10);
        pq.offer(40);
        pq.offer(20);
        pq.offer(30);

        assertEquals(10, pq.poll());
        assertEquals(20, pq.poll());
        assertEquals(30, pq.poll());
        assertEquals(40, pq.poll());
        assertEquals(50, pq.poll());

        assertTrue(pq.isEmpty());
        assertNull(pq.poll());
    }

    @Test
    @DisplayName("Should auto-resize underlying heap array when capacity is reached")
    void testAutoResizing() {
        assertEquals(4, pq.capacity());

        pq.offer(10);
        pq.offer(20);
        pq.offer(30);
        pq.offer(40);

        assertEquals(4, pq.capacity());

        // 5th element forces array expansion from 4 to 8
        pq.offer(5);

        assertEquals(8, pq.capacity());
        assertEquals(5, pq.size());
        assertEquals(5, pq.peek());
    }

    @Test
    @DisplayName("Should handle duplicate elements correctly")
    void testDuplicates() {
        pq.offer(15);
        pq.offer(15);
        pq.offer(10);

        assertEquals(3, pq.size());
        assertEquals(10, pq.poll());
        assertEquals(15, pq.poll());
        assertEquals(15, pq.poll());
    }

    @Test
    @DisplayName("Should clear all heap elements")
    void testClear() {
        pq.offer(100);
        pq.offer(200);

        pq.clear();
        assertEquals(0, pq.size());
        assertTrue(pq.isEmpty());
        assertNull(pq.peek());
    }
}
