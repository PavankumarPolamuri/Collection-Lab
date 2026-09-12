package com.collectionlab;

import com.collectionlab.collections.CustomHashMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CustomHashMapTest {

    private CustomHashMap<String, Integer> map;

    @BeforeEach
    void setUp() {
        map = new CustomHashMap<>(4, 0.75f); // small capacity to test resizing easily
    }

    @Test
    @DisplayName("Should initialize empty map with correct capacity and load factor")
    void testInitialState() {
        assertTrue(map.isEmpty());
        assertEquals(0, map.size());
        assertEquals(4, map.capacity());
        assertEquals(0.75f, map.loadFactor());
    }

    @Test
    @DisplayName("Should put key-value pairs and retrieve them correctly")
    void testPutAndGet() {
        assertNull(map.put("Java", 90));
        assertNull(map.put("Spring", 85));

        assertEquals(90, map.get("Java"));
        assertEquals(85, map.get("Spring"));
        assertEquals(2, map.size());
    }

    @Test
    @DisplayName("Should update value when putting an existing duplicate key")
    void testDuplicateKeyUpdate() {
        map.put("Java", 90);
        Integer oldVal = map.put("Java", 95);

        assertEquals(90, oldVal);
        assertEquals(95, map.get("Java"));
        assertEquals(1, map.size()); // Size should remain 1
    }

    @Test
    @DisplayName("Should handle collisions using separate chaining")
    void testCollisions() {
        // Create custom keys that produce identical bucket index
        CustomHashMap<TestKey, String> collisionMap = new CustomHashMap<>(4, 0.75f);

        TestKey k1 = new TestKey("A", 1);
        TestKey k2 = new TestKey("B", 1); // Same hash code 1

        collisionMap.put(k1, "Val1");
        collisionMap.put(k2, "Val2");

        assertEquals(2, collisionMap.size());
        assertEquals("Val1", collisionMap.get(k1));
        assertEquals("Val2", collisionMap.get(k2));
    }

    @Test
    @DisplayName("Should auto-resize and rehash entries when threshold is reached")
    void testResizeAndRehash() {
        List<String> steps = new ArrayList<>();

        // Threshold for capacity 4 with 0.75 load factor is 3
        map.put("K1", 1, steps);
        map.put("K2", 2, steps);
        map.put("K3", 3, steps);

        assertEquals(4, map.capacity());

        // 4th insertion triggers resize (4 > 3 threshold)
        map.put("K4", 4, steps);

        assertEquals(8, map.capacity());
        assertEquals(4, map.size());

        assertEquals(1, map.get("K1"));
        assertEquals(2, map.get("K2"));
        assertEquals(3, map.get("K3"));
        assertEquals(4, map.get("K4"));

        assertTrue(steps.stream().anyMatch(s -> s.contains("LOAD FACTOR THRESHOLD EXCEEDED")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("RESIZING HASH MAP")));
    }

    @Test
    @DisplayName("Should remove key-value pair correctly")
    void testRemove() {
        map.put("Java", 100);
        map.put("Python", 90);

        assertEquals(100, map.remove("Java"));
        assertNull(map.get("Java"));
        assertEquals(1, map.size());
        assertFalse(map.containsKey("Java"));
        assertTrue(map.containsKey("Python"));
        assertTrue(map.containsValue(90));
        assertFalse(map.containsValue(100));
    }

    @Test
    @DisplayName("Should clear all entries")
    void testClear() {
        map.put("A", 1);
        map.put("B", 2);

        map.clear();
        assertEquals(0, map.size());
        assertTrue(map.isEmpty());
        assertNull(map.get("A"));
    }

    // Helper key class to simulate controlled hash collisions
    private static class TestKey {
        private final String name;
        private final int fixedHash;

        TestKey(String name, int fixedHash) {
            this.name = name;
            this.fixedHash = fixedHash;
        }

        @Override
        public int hashCode() {
            return fixedHash;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof TestKey)) return false;
            TestKey other = (TestKey) obj;
            return name.equals(other.name);
        }
    }
}
