package com.collectionlab.dto.state;

import java.util.List;

public class BSTStateDto {

    public static class BSTNodeDto {
        private Object key;
        private BSTNodeDto left;
        private BSTNodeDto right;

        public BSTNodeDto(Object key, BSTNodeDto left, BSTNodeDto right) {
            this.key = key;
            this.left = left;
            this.right = right;
        }

        public Object getKey() { return key; }
        public BSTNodeDto getLeft() { return left; }
        public BSTNodeDto getRight() { return right; }
    }

    private BSTNodeDto root;
    private int size;
    private List<Object> lastTraversal;

    public BSTStateDto(BSTNodeDto root, int size, List<Object> lastTraversal) {
        this.root = root;
        this.size = size;
        this.lastTraversal = lastTraversal;
    }

    public BSTNodeDto getRoot() { return root; }
    public int getSize() { return size; }
    public List<Object> getLastTraversal() { return lastTraversal; }
}
