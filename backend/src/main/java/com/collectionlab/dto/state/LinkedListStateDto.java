package com.collectionlab.dto.state;

import java.util.List;

public class LinkedListStateDto {

    public static class NodeDto {
        private int index;
        private Object data;
        private boolean hasPrev;
        private boolean hasNext;

        public NodeDto() {}

        public NodeDto(int index, Object data, boolean hasPrev, boolean hasNext) {
            this.index = index;
            this.data = data;
            this.hasPrev = hasPrev;
            this.hasNext = hasNext;
        }

        public int getIndex() { return index; }
        public void setIndex(int index) { this.index = index; }

        public Object getData() { return data; }
        public void setData(Object data) { this.data = data; }

        public boolean isHasPrev() { return hasPrev; }
        public void setHasPrev(boolean hasPrev) { this.hasPrev = hasPrev; }

        public boolean isHasNext() { return hasNext; }
        public void setHasNext(boolean hasNext) { this.hasNext = hasNext; }
    }

    private List<NodeDto> nodes;
    private int size;
    private Object headData;
    private Object tailData;

    public LinkedListStateDto() {}

    public LinkedListStateDto(List<NodeDto> nodes, int size, Object headData, Object tailData) {
        this.nodes = nodes;
        this.size = size;
        this.headData = headData;
        this.tailData = tailData;
    }

    public List<NodeDto> getNodes() { return nodes; }
    public void setNodes(List<NodeDto> nodes) { this.nodes = nodes; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public Object getHeadData() { return headData; }
    public void setHeadData(Object headData) { this.headData = headData; }

    public Object getTailData() { return tailData; }
    public void setTailData(Object tailData) { this.tailData = tailData; }
}
