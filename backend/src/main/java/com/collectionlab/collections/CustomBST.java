package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;

public class CustomBST<K extends Comparable<K>> {

    public static class BSTNode<K> {
        public K key;
        public BSTNode<K> left;
        public BSTNode<K> right;

        public BSTNode(K key) {
            this.key = key;
        }
    }

    private BSTNode<K> root;
    private int size;

    public CustomBST() {
        this.root = null;
        this.size = 0;
    }

    public void insert(K key, List<String> steps) {
        if (key == null) return;
        if (steps != null) {
            steps.add("Inserting key '" + key + "' into Binary Search Tree.");
        }
        root = insertRecursive(root, key, steps);
    }

    private BSTNode<K> insertRecursive(BSTNode<K> node, K key, List<String> steps) {
        if (node == null) {
            if (steps != null) {
                steps.add("Created new BST node with key '" + key + "'.");
            }
            size++;
            return new BSTNode<>(key);
        }
        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            if (steps != null) {
                steps.add("Key '" + key + "' < node '" + node.key + "'. Navigating LEFT.");
            }
            node.left = insertRecursive(node.left, key, steps);
        } else if (cmp > 0) {
            if (steps != null) {
                steps.add("Key '" + key + "' > node '" + node.key + "'. Navigating RIGHT.");
            }
            node.right = insertRecursive(node.right, key, steps);
        } else {
            if (steps != null) {
                steps.add("Key '" + key + "' already exists in BST (duplicates disallowed).");
            }
        }
        return node;
    }

    public boolean search(K key, List<String> steps) {
        if (steps != null) {
            steps.add("Searching for key '" + key + "' in BST.");
        }
        return searchRecursive(root, key, steps);
    }

    private boolean searchRecursive(BSTNode<K> node, K key, List<String> steps) {
        if (node == null) {
            if (steps != null) steps.add("Reached null node. Key '" + key + "' NOT found.");
            return false;
        }
        int cmp = key.compareTo(node.key);
        if (cmp == 0) {
            if (steps != null) steps.add("Found key '" + key + "' at current BST node!");
            return true;
        } else if (cmp < 0) {
            if (steps != null) steps.add("Key '" + key + "' < node '" + node.key + "'. Navigating LEFT.");
            return searchRecursive(node.left, key, steps);
        } else {
            if (steps != null) steps.add("Key '" + key + "' > node '" + node.key + "'. Navigating RIGHT.");
            return searchRecursive(node.right, key, steps);
        }
    }

    public void delete(K key, List<String> steps) {
        if (steps != null) {
            steps.add("Deleting key '" + key + "' from BST.");
        }
        int oldSize = size;
        root = deleteRecursive(root, key, steps);
        if (size < oldSize && steps != null) {
            steps.add("Successfully removed key '" + key + "'. New BST size is " + size + ".");
        }
    }

    private BSTNode<K> deleteRecursive(BSTNode<K> node, K key, List<String> steps) {
        if (node == null) {
            if (steps != null) steps.add("Key '" + key + "' not found to delete.");
            return null;
        }
        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = deleteRecursive(node.left, key, steps);
        } else if (cmp > 0) {
            node.right = deleteRecursive(node.right, key, steps);
        } else {
            // Found node to delete
            if (node.left == null && node.right == null) {
                if (steps != null) steps.add("Deleted leaf node '" + key + "'.");
                size--;
                return null;
            } else if (node.left == null) {
                if (steps != null) steps.add("Replacing node '" + key + "' with right child.");
                size--;
                return node.right;
            } else if (node.right == null) {
                if (steps != null) steps.add("Replacing node '" + key + "' with left child.");
                size--;
                return node.left;
            } else {
                // Two children case
                BSTNode<K> minNode = findMin(node.right);
                if (steps != null) {
                    steps.add("Node '" + key + "' has 2 children. Replacing with in-order successor '" + minNode.key + "'.");
                }
                node.key = minNode.key;
                node.right = deleteRecursive(node.right, minNode.key, null);
                size--;
            }
        }
        return node;
    }

    private BSTNode<K> findMin(BSTNode<K> node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    public List<K> traversal(String type, List<String> steps) {
        List<K> result = new ArrayList<>();
        if (type == null) type = "inorder";
        if (steps != null) steps.add("Starting " + type.toUpperCase() + " traversal of BST.");
        switch (type.toLowerCase()) {
            case "preorder":
                preorderHelper(root, result);
                break;
            case "postorder":
                postorderHelper(root, result);
                break;
            case "inorder":
            default:
                inorderHelper(root, result);
                break;
        }
        if (steps != null) steps.add(type.toUpperCase() + " traversal result: " + result);
        return result;
    }

    private void inorderHelper(BSTNode<K> node, List<K> res) {
        if (node == null) return;
        inorderHelper(node.left, res);
        res.add(node.key);
        inorderHelper(node.right, res);
    }

    private void preorderHelper(BSTNode<K> node, List<K> res) {
        if (node == null) return;
        res.add(node.key);
        preorderHelper(node.left, res);
        preorderHelper(node.right, res);
    }

    private void postorderHelper(BSTNode<K> node, List<K> res) {
        if (node == null) return;
        postorderHelper(node.left, res);
        postorderHelper(node.right, res);
        res.add(node.key);
    }

    public BSTNode<K> getRoot() { return root; }
    public int size() { return size; }
    public boolean isEmpty() { return root == null; }
    public void clear() { root = null; size = 0; }
}
