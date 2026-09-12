package com.collectionlab;

import com.collectionlab.collections.CustomTreeMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

class CustomTreeMapTest {

    private CustomTreeMap<Integer, String> treeMap;

    @BeforeEach
    void setUp() {
        treeMap = new CustomTreeMap<>();
    }

    @Test
    @DisplayName("Should initialize empty BST tree map")
    void testInitialState() {
        assertTrue(treeMap.isEmpty());
        assertEquals(0, treeMap.size());
        assertNull(treeMap.getRoot());
        assertThrows(NoSuchElementException.class, () -> treeMap.firstKey());
        assertThrows(NoSuchElementException.class, () -> treeMap.lastKey());
    }

    @Test
    @DisplayName("Should insert elements into BST and maintain order")
    void testPutAndGet() {
        List<String> steps = new ArrayList<>();

        // Insert elements: 50, 30, 70, 20, 40, 60, 80
        treeMap.put(50, "Root", steps);
        treeMap.put(30, "Left", steps);
        treeMap.put(70, "Right", steps);

        assertEquals(3, treeMap.size());
        assertEquals("Root", treeMap.get(50));
        assertEquals("Left", treeMap.get(30));
        assertEquals("Right", treeMap.get(70));
        assertEquals(30, treeMap.firstKey());
        assertEquals(70, treeMap.lastKey());

        assertTrue(steps.stream().anyMatch(s -> s.contains("Created ROOT node")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("Moving LEFT")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("Moving RIGHT")));
    }

    @Test
    @DisplayName("Should perform in-order, pre-order, and post-order traversals correctly")
    void testTraversals() {
        treeMap.put(50, "50");
        treeMap.put(30, "30");
        treeMap.put(70, "70");
        treeMap.put(20, "20");
        treeMap.put(40, "40");
        treeMap.put(60, "60");
        treeMap.put(80, "80");

        // In-order traversal must return elements in strictly ascending sorted order
        List<Integer> inorder = treeMap.inorder();
        assertEquals(List.of(20, 30, 40, 50, 60, 70, 80), inorder);

        List<Integer> preorder = treeMap.preorder();
        assertEquals(List.of(50, 30, 20, 40, 70, 60, 80), preorder);

        List<Integer> postorder = treeMap.postorder();
        assertEquals(List.of(20, 40, 30, 60, 80, 70, 50), postorder);
    }

    @Test
    @DisplayName("Should delete leaf node (0 children)")
    void testDeleteLeafNode() {
        treeMap.put(50, "50");
        treeMap.put(30, "30");
        treeMap.put(20, "20"); // Leaf

        assertEquals("20", treeMap.remove(20));
        assertEquals(2, treeMap.size());
        assertFalse(treeMap.containsKey(20));
        assertEquals(List.of(30, 50), treeMap.inorder());
    }

    @Test
    @DisplayName("Should delete node with one child (1 child)")
    void testDeleteOneChildNode() {
        treeMap.put(50, "50");
        treeMap.put(30, "30");
        treeMap.put(20, "20"); // 30 has 1 left child (20)

        assertEquals("30", treeMap.remove(30));
        assertEquals(2, treeMap.size());
        assertFalse(treeMap.containsKey(30));
        assertEquals(List.of(20, 50), treeMap.inorder());
    }

    @Test
    @DisplayName("Should delete node with two children (2 children) using in-order successor")
    void testDeleteTwoChildrenNode() {
        List<String> steps = new ArrayList<>();
        treeMap.put(50, "50");
        treeMap.put(30, "30");
        treeMap.put(70, "70");
        treeMap.put(20, "20");
        treeMap.put(40, "40");
        treeMap.put(60, "60");
        treeMap.put(80, "80");

        // Remove node 50 (Root with 2 children 30 and 70).
        // In-order successor of 50 in right subtree is 60 (min of 70's subtree).
        assertEquals("50", treeMap.remove(50, steps));
        assertEquals(6, treeMap.size());
        assertFalse(treeMap.containsKey(50));
        assertEquals(List.of(20, 30, 40, 60, 70, 80), treeMap.inorder());

        assertTrue(steps.stream().anyMatch(s -> s.contains("2 CHILDREN")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("In-order successor identified")));
    }

    @Test
    @DisplayName("Should clear all nodes")
    void testClear() {
        treeMap.put(10, "A");
        treeMap.put(20, "B");
        treeMap.clear();

        assertEquals(0, treeMap.size());
        assertTrue(treeMap.isEmpty());
        assertNull(treeMap.getRoot());
    }
}
