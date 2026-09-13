package com.collectionlab.dto.state;

import java.util.List;

public class DisjointSetStateDto {

    public static class SetNodeDto {
        private String element;
        private String parent;
        private int rank;

        public SetNodeDto(String element, String parent, int rank) {
            this.element = element;
            this.parent = parent;
            this.rank = rank;
        }

        public String getElement() { return element; }
        public String getParent() { return parent; }
        public int getRank() { return rank; }
    }

    private List<SetNodeDto> nodes;
    private int elementCount;
    private int setCount;

    public DisjointSetStateDto(List<SetNodeDto> nodes, int elementCount, int setCount) {
        this.nodes = nodes;
        this.elementCount = elementCount;
        this.setCount = setCount;
    }

    public List<SetNodeDto> getNodes() { return nodes; }
    public int getElementCount() { return elementCount; }
    public int getSetCount() { return setCount; }
}
