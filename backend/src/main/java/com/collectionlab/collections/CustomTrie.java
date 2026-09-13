package com.collectionlab.collections;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomTrie {

    public static class TrieNode {
        public char ch;
        public boolean isEndOfWord;
        public Map<Character, TrieNode> children;

        public TrieNode(char ch) {
            this.ch = ch;
            this.isEndOfWord = false;
            this.children = new HashMap<>();
        }
    }

    private final TrieNode root;
    private int wordCount;

    public CustomTrie() {
        this.root = new TrieNode('\0');
        this.wordCount = 0;
    }

    public void insert(String word, List<String> steps) {
        if (word == null || word.isBlank()) return;
        String clean = word.trim().toLowerCase();
        if (steps != null) {
            steps.add("Inserting word '" + clean + "' into Trie.");
        }
        TrieNode curr = root;
        for (int i = 0; i < clean.length(); i++) {
            char c = clean.charAt(i);
            if (!curr.children.containsKey(c)) {
                if (steps != null) {
                    steps.add("Character '" + c + "' not present under node '" + (curr.ch == '\0' ? "ROOT" : curr.ch) + "'. Creating new branch node.");
                }
                curr.children.put(c, new TrieNode(c));
            } else if (steps != null) {
                steps.add("Found existing branch for character '" + c + "'.");
            }
            curr = curr.children.get(c);
        }
        if (!curr.isEndOfWord) {
            curr.isEndOfWord = true;
            wordCount++;
            if (steps != null) {
                steps.add("Marked node '" + curr.ch + "' as END OF WORD. Total words in Trie: " + wordCount + ".");
            }
        } else if (steps != null) {
            steps.add("Word '" + clean + "' already exists in Trie.");
        }
    }

    public boolean search(String word, List<String> steps) {
        if (word == null || word.isBlank()) return false;
        String clean = word.trim().toLowerCase();
        if (steps != null) {
            steps.add("Searching for word '" + clean + "' in Trie.");
        }
        TrieNode node = findNode(clean, steps);
        boolean found = node != null && node.isEndOfWord;
        if (steps != null) {
            if (found) {
                steps.add("Word '" + clean + "' FOUND in Trie (terminal marker confirmed).");
            } else {
                steps.add("Word '" + clean + "' NOT found in Trie.");
            }
        }
        return found;
    }

    public boolean startsWith(String prefix, List<String> steps) {
        if (prefix == null || prefix.isBlank()) return false;
        String clean = prefix.trim().toLowerCase();
        if (steps != null) {
            steps.add("Checking prefix search for '" + clean + "'.");
        }
        TrieNode node = findNode(clean, steps);
        boolean exists = node != null;
        if (steps != null) {
            if (exists) {
                steps.add("Prefix '" + clean + "' EXISTS in Trie.");
            } else {
                steps.add("Prefix '" + clean + "' does NOT exist in Trie.");
            }
        }
        return exists;
    }

    private TrieNode findNode(String str, List<String> steps) {
        TrieNode curr = root;
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (!curr.children.containsKey(c)) {
                if (steps != null) {
                    steps.add("Character '" + c + "' not found under node '" + (curr.ch == '\0' ? "ROOT" : curr.ch) + "'. Traversal halted.");
                }
                return null;
            }
            curr = curr.children.get(c);
            if (steps != null) {
                steps.add("Traversed character '" + c + "'.");
            }
        }
        return curr;
    }

    public boolean delete(String word, List<String> steps) {
        if (word == null || word.isBlank()) return false;
        String clean = word.trim().toLowerCase();
        if (steps != null) {
            steps.add("Deleting word '" + clean + "' from Trie.");
        }
        boolean[] deleted = new boolean[1];
        deleteRecursive(root, clean, 0, deleted, steps);
        if (deleted[0]) {
            wordCount--;
            if (steps != null) {
                steps.add("Successfully deleted word '" + clean + "'. Word count is now " + wordCount + ".");
            }
        } else if (steps != null) {
            steps.add("Word '" + clean + "' not found to delete.");
        }
        return deleted[0];
    }

    private boolean deleteRecursive(TrieNode current, String word, int index, boolean[] deleted, List<String> steps) {
        if (index == word.length()) {
            if (!current.isEndOfWord) {
                return false;
            }
            current.isEndOfWord = false;
            deleted[0] = true;
            return current.children.isEmpty();
        }

        char c = word.charAt(index);
        TrieNode node = current.children.get(c);
        if (node == null) return false;

        boolean shouldDeleteChild = deleteRecursive(node, word, index + 1, deleted, steps);

        if (shouldDeleteChild) {
            current.children.remove(c);
            return !current.isEndOfWord && current.children.isEmpty();
        }
        return false;
    }

    public TrieNode getRoot() { return root; }
    public int getWordCount() { return wordCount; }
    public boolean isEmpty() { return wordCount == 0; }
    public void clear() {
        root.children.clear();
        wordCount = 0;
    }
}
