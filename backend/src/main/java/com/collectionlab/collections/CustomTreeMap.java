package com.collectionlab.collections;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Custom implementation of a TreeMap using a Binary Search Tree (BST) from scratch.
 * Does NOT use java.util.TreeMap or any built-in collection classes.
 *
 * NOTE FOR INTERVIEWS: Java's standard java.util.TreeMap uses a self-balancing
 * Red-Black Tree. This implementation uses a standard BST to visually demonstrate
 * BST properties, node insertion comparison paths, and node deletion algorithms.
 *
 * @param <K> Key type (must implement Comparable)
 * @param <V> Value type
 */
public class CustomTreeMap<K extends Comparable<K>, V> {

    public static class TreeNode<K, V> {
        public K key;
        public V value;
        public TreeNode<K, V> left;
        public TreeNode<K, V> right;

        public TreeNode(K key, V value) {
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    private TreeNode<K, V> root;
    private int size;

    public CustomTreeMap() {
        this.root = null;
        this.size = 0;
    }

    public V put(K key, V value) {
        return put(key, value, null);
    }

    public V put(K key, V value, List<String> steps) {
        if (key == null) {
            throw new NullPointerException("Null keys are not supported in CustomTreeMap");
        }

        if (steps != null) {
            steps.add("Request to PUT key '" + key + "', value '" + value + "'");
        }

        if (root == null) {
            root = new TreeNode<>(key, value);
            size++;
            if (steps != null) {
                steps.add("Tree was empty. Created ROOT node with key '" + key + "'");
            }
            return null;
        }

        TreeNode<K, V> curr = root;
        TreeNode<K, V> parent = null;
        int cmp = 0;

        while (curr != null) {
            parent = curr;
            cmp = key.compareTo(curr.key);
            if (cmp < 0) {
                if (steps != null) {
                    steps.add("Compare (" + key + " < " + curr.key + ") -> Moving LEFT from node '" + curr.key + "'");
                }
                curr = curr.left;
            } else if (cmp > 0) {
                if (steps != null) {
                    steps.add("Compare (" + key + " > " + curr.key + ") -> Moving RIGHT from node '" + curr.key + "'");
                }
                curr = curr.right;
            } else {
                // Key already exists - update value
                V oldVal = curr.value;
                curr.value = value;
                if (steps != null) {
                    steps.add("Key '" + key + "' found in tree. Updated value from '" + oldVal + "' to '" + value + "'");
                }
                return oldVal;
            }
        }

        // Insert new node under parent
        TreeNode<K, V> newNode = new TreeNode<>(key, value);
        if (cmp < 0) {
            parent.left = newNode;
            if (steps != null) {
                steps.add("Inserted new node '" + key + "' as LEFT child of '" + parent.key + "'");
            }
        } else {
            parent.right = newNode;
            if (steps != null) {
                steps.add("Inserted new node '" + key + "' as RIGHT child of '" + parent.key + "'");
            }
        }
        size++;
        return null;
    }

    public V get(K key) {
        return get(key, null);
    }

    public V get(K key, List<String> steps) {
        if (key == null) return null;
        if (steps != null) {
            steps.add("Searching for key '" + key + "' in BST...");
        }

        TreeNode<K, V> curr = root;
        while (curr != null) {
            int cmp = key.compareTo(curr.key);
            if (cmp < 0) {
                if (steps != null) {
                    steps.add("Key " + key + " < " + curr.key + " -> Check LEFT child");
                }
                curr = curr.left;
            } else if (cmp > 0) {
                if (steps != null) {
                    steps.add("Key " + key + " > " + curr.key + " -> Check RIGHT child");
                }
                curr = curr.right;
            } else {
                if (steps != null) {
                    steps.add("Found key '" + key + "' with value '" + curr.value + "'");
                }
                return curr.value;
            }
        }

        if (steps != null) {
            steps.add("Key '" + key + "' not found in CustomTreeMap.");
        }
        return null;
    }

    public boolean containsKey(K key) {
        return get(key) != null;
    }

    public V remove(K key) {
        return remove(key, null);
    }

    public V remove(K key, List<String> steps) {
        if (key == null) return null;

        if (steps != null) {
            steps.add("Request to REMOVE key '" + key + "'");
        }

        V existingVal = get(key);
        if (existingVal == null) {
            if (steps != null) {
                steps.add("Key '" + key + "' not present in tree. Removal aborted.");
            }
            return null;
        }

        root = deleteNode(root, key, steps);
        size--;
        return existingVal;
    }

    private TreeNode<K, V> deleteNode(TreeNode<K, V> node, K key, List<String> steps) {
        if (node == null) return null;

        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = deleteNode(node.left, key, steps);
        } else if (cmp > 0) {
            node.right = deleteNode(node.right, key, steps);
        } else {
            // Node to be deleted found!
            if (node.left == null && node.right == null) {
                // Case 1: Leaf node (no children)
                if (steps != null) {
                    steps.add("Node '" + node.key + "' is a LEAF node (0 children). Removing node.");
                }
                return null;
            } else if (node.left == null) {
                // Case 2: One child (right child only)
                if (steps != null) {
                    steps.add("Node '" + node.key + "' has 1 child (RIGHT child '" + node.right.key + "'). Replacing node with right child.");
                }
                return node.right;
            } else if (node.right == null) {
                // Case 2: One child (left child only)
                if (steps != null) {
                    steps.add("Node '" + node.key + "' has 1 child (LEFT child '" + node.left.key + "'). Replacing node with left child.");
                }
                return node.left;
            } else {
                // Case 3: Two children - find in-order successor (min node in right subtree)
                TreeNode<K, V> successor = getMinNode(node.right);
                if (steps != null) {
                    steps.add("Node '" + node.key + "' has 2 CHILDREN. Finding in-order successor (min node of right subtree)...");
                    steps.add("In-order successor identified: Key '" + successor.key + "'");
                    steps.add("Copying successor data ('" + successor.key + "') into node '" + node.key + "'");
                }

                node.key = successor.key;
                node.value = successor.value;

                if (steps != null) {
                    steps.add("Deleting duplicate in-order successor node '" + successor.key + "' from right subtree...");
                }
                node.right = deleteNode(node.right, successor.key, steps);
            }
        }
        return node;
    }

    public K firstKey() {
        return firstKey(null);
    }

    public K firstKey(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("CustomTreeMap is empty. firstKey returns null.");
            throw new NoSuchElementException("CustomTreeMap is empty");
        }
        TreeNode<K, V> min = getMinNode(root);
        if (steps != null) {
            steps.add("Traversed leftmost branch of BST to min node. Minimum key (firstKey): '" + min.key + "'");
        }
        return min.key;
    }

    public K lastKey() {
        return lastKey(null);
    }

    public K lastKey(List<String> steps) {
        if (isEmpty()) {
            if (steps != null) steps.add("CustomTreeMap is empty. lastKey returns null.");
            throw new NoSuchElementException("CustomTreeMap is empty");
        }
        TreeNode<K, V> max = getMaxNode(root);
        if (steps != null) {
            steps.add("Traversed rightmost branch of BST to max node. Maximum key (lastKey): '" + max.key + "'");
        }
        return max.key;
    }

    private TreeNode<K, V> getMinNode(TreeNode<K, V> node) {
        TreeNode<K, V> curr = node;
        while (curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }

    private TreeNode<K, V> getMaxNode(TreeNode<K, V> node) {
        TreeNode<K, V> curr = node;
        while (curr.right != null) {
            curr = curr.right;
        }
        return curr;
    }

    public List<K> inorder() {
        List<K> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }

    private void inorderHelper(TreeNode<K, V> node, List<K> result) {
        if (node != null) {
            inorderHelper(node.left, result);
            result.add(node.key);
            inorderHelper(node.right, result);
        }
    }

    public List<K> preorder() {
        List<K> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    private void preorderHelper(TreeNode<K, V> node, List<K> result) {
        if (node != null) {
            result.add(node.key);
            preorderHelper(node.left, result);
            preorderHelper(node.right, result);
        }
    }

    public List<K> postorder() {
        List<K> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    private void postorderHelper(TreeNode<K, V> node, List<K> result) {
        if (node != null) {
            postorderHelper(node.left, result);
            postorderHelper(node.right, result);
            result.add(node.key);
        }
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void clear() {
        this.root = null;
        this.size = 0;
    }

    public TreeNode<K, V> getRoot() {
        return root;
    }
}
