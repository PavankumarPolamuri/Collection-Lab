package com.collectionlab.util;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class SourceCodeReader {

    public String getCanonicalCollectionName(String collectionName) {
        if (collectionName == null || collectionName.isBlank()) return "";
        String lower = collectionName.toLowerCase().replaceAll("[^a-z]", "");
        switch (lower) {
            case "arraylist": return "ArrayList";
            case "linkedlist": return "LinkedList";
            case "hashmap": return "HashMap";
            case "treemap": return "TreeMap";
            case "priorityqueue": return "PriorityQueue";
            case "stack": return "Stack";
            case "queue": return "Queue";
            case "deque": return "Deque";
            case "hashset": return "HashSet";
            case "bst": return "BST";
            case "minheap":
            case "heap": return "MinHeap";
            case "trie": return "Trie";
            case "graph": return "Graph";
            case "disjointset":
            case "unionfind": return "DisjointSet";
            case "circularlinkedlist": return "CircularLinkedList";
            default:
                return collectionName.substring(0, 1).toUpperCase() + collectionName.substring(1);
        }
    }

    public String readCollectionSourceCode(String collectionName) {
        String canonicalName = getCanonicalCollectionName(collectionName);
        String filename = "Custom" + canonicalName + ".java";

        // 1. Try loading from Classpath Resource (Bundled in JAR in production/Render)
        try {
            ClassPathResource resource = new ClassPathResource("code/" + filename);
            if (resource.exists()) {
                try (InputStream is = resource.getInputStream()) {
                    return new String(is.readAllBytes(), StandardCharsets.UTF_8);
                }
            }
        } catch (Exception ignored) {
        }

        // 2. Try loading from ClassLoader directly
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("code/" + filename)) {
            if (is != null) {
                return new String(is.readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (Exception ignored) {
        }

        // 3. Fallback to local filesystem paths (for local development)
        Path primaryPath = Paths.get("src/main/java/com/collectionlab/collections/" + filename);
        if (Files.exists(primaryPath)) {
            try {
                return Files.readString(primaryPath);
            } catch (Exception e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        Path fallbackPath = Paths.get("backend/src/main/java/com/collectionlab/collections/" + filename);
        if (Files.exists(fallbackPath)) {
            try {
                return Files.readString(fallbackPath);
            } catch (Exception e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        return "// Source file " + filename + " not found.";
    }
}
