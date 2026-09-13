package com.collectionlab.dto.state;

import java.util.List;

public class CircularLinkedListStateDto {

    public static class CircularNodeDto {
        private int index;
        private Object data;
        private boolean isHead;
        private boolean isTail;
        private int nextIndex;

        public CircularNodeDto(int index, Object data, boolean isHead, boolean isTail, int nextIndex) {
            this.index = index;
            this.data = data;
            this.isHead = isHead;
            this.isTail = isTail;
            this.nextIndex = nextIndex;
        }

        public int getIndex() { return index; }
        public Object getData() { return data; }
        public boolean isHead() { return isHead; }
        public boolean isTail() { return isTail; }
        public int getNextIndex() { return nextIndex; }
    }

    private List<CircularNodeDto> nodes;
    private int size;
    private Object headData;
    private Object tailData;

    public CircularLinkedListStateDto(List<CircularNodeDto> nodes, int size, Object headData, Object tailData) {
        this.nodes = nodes;
        this.size = size;
        this.headData = headData;
        this.tailData = tailData;
    }

    public List<CircularNodeDto> getNodes() { return nodes; }
    public int getSize() { return size; }
    public Object getHeadData() { return headData; }
    public Object getTailData() { return tailData; }
}
