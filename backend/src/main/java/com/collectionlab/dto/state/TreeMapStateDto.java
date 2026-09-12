package com.collectionlab.dto.state;

import java.util.List;

public class TreeMapStateDto {

    public static class TreeNodeDto {
        private Object key;
        private Object value;
        private TreeNodeDto left;
        private TreeNodeDto right;

        public TreeNodeDto() {}

        public TreeNodeDto(Object key, Object value, TreeNodeDto left, TreeNodeDto right) {
            this.key = key;
            this.value = value;
            this.left = left;
            this.right = right;
        }

        public Object getKey() { return key; }
        public void setKey(Object key) { this.key = key; }

        public Object getValue() { return value; }
        public void setValue(Object value) { this.value = value; }

        public TreeNodeDto getLeft() { return left; }
        public void setLeft(TreeNodeDto left) { this.left = left; }

        public TreeNodeDto getRight() { return right; }
        public void setRight(TreeNodeDto right) { this.right = right; }
    }

    private TreeNodeDto root;
    private int size;
    private Object firstKey;
    private Object lastKey;
    private List<Object> inorderTraversal;

    public TreeMapStateDto() {}

    public TreeMapStateDto(TreeNodeDto root, int size, Object firstKey, Object lastKey, List<Object> inorderTraversal) {
        this.root = root;
        this.size = size;
        this.firstKey = firstKey;
        this.lastKey = lastKey;
        this.inorderTraversal = inorderTraversal;
    }

    public TreeNodeDto getRoot() { return root; }
    public void setRoot(TreeNodeDto root) { this.root = root; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public Object getFirstKey() { return firstKey; }
    public void setFirstKey(Object firstKey) { this.firstKey = firstKey; }

    public Object getLastKey() { return lastKey; }
    public void setLastKey(Object lastKey) { this.lastKey = lastKey; }

    public List<Object> getInorderTraversal() { return inorderTraversal; }
    public void setInorderTraversal(List<Object> inorderTraversal) { this.inorderTraversal = inorderTraversal; }
}
