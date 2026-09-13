package com.collectionlab.dto.state;

import java.util.List;
import java.util.Map;

public class GraphStateDto {
    private List<String> vertices;
    private Map<String, List<String>> adjacencyList;
    private int vertexCount;
    private int edgeCount;
    private List<String> lastTraversal;

    public GraphStateDto(List<String> vertices, Map<String, List<String>> adjacencyList, int vertexCount, int edgeCount, List<String> lastTraversal) {
        this.vertices = vertices;
        this.adjacencyList = adjacencyList;
        this.vertexCount = vertexCount;
        this.edgeCount = edgeCount;
        this.lastTraversal = lastTraversal;
    }

    public List<String> getVertices() { return vertices; }
    public Map<String, List<String>> getAdjacencyList() { return adjacencyList; }
    public int getVertexCount() { return vertexCount; }
    public int getEdgeCount() { return edgeCount; }
    public List<String> getLastTraversal() { return lastTraversal; }
}
