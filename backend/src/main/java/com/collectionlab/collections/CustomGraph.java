package com.collectionlab.collections;

import java.util.*;

public class CustomGraph {
    private final Map<String, List<String>> adjList;

    public CustomGraph() {
        this.adjList = new LinkedHashMap<>();
    }

    public boolean addVertex(String label, List<String> steps) {
        if (label == null || label.isBlank()) return false;
        String v = label.trim();
        if (steps != null) {
            steps.add("Adding vertex '" + v + "' to graph.");
        }
        if (!adjList.containsKey(v)) {
            adjList.put(v, new ArrayList<>());
            if (steps != null) {
                steps.add("Vertex '" + v + "' added successfully. Total vertices: " + adjList.size() + ".");
            }
            return true;
        }
        if (steps != null) {
            steps.add("Vertex '" + v + "' already exists in graph.");
        }
        return false;
    }

    public boolean addEdge(String from, String to, List<String> steps) {
        if (from == null || to == null || from.isBlank() || to.isBlank()) return false;
        String u = from.trim();
        String v = to.trim();

        if (!adjList.containsKey(u)) addVertex(u, null);
        if (!adjList.containsKey(v)) addVertex(v, null);

        if (steps != null) {
            steps.add("Adding undirected edge between '" + u + "' and '" + v + "'.");
        }

        if (!adjList.get(u).contains(v)) adjList.get(u).add(v);
        if (!adjList.get(v).contains(u)) adjList.get(v).add(u);

        if (steps != null) {
            steps.add("Edge ('" + u + "' <-> '" + v + "') connected.");
        }
        return true;
    }

    public boolean removeEdge(String from, String to, List<String> steps) {
        if (from == null || to == null) return false;
        String u = from.trim();
        String v = to.trim();

        if (steps != null) {
            steps.add("Removing edge between '" + u + "' and '" + v + "'.");
        }

        boolean r1 = adjList.containsKey(u) && adjList.get(u).remove(v);
        boolean r2 = adjList.containsKey(v) && adjList.get(v).remove(u);

        if (r1 || r2) {
            if (steps != null) steps.add("Edge ('" + u + "' <-> '" + v + "') removed.");
            return true;
        }
        if (steps != null) steps.add("Edge between '" + u + "' and '" + v + "' does NOT exist.");
        return false;
    }

    public boolean removeVertex(String label, List<String> steps) {
        if (label == null || !adjList.containsKey(label.trim())) {
            if (steps != null) steps.add("Vertex '" + label + "' not found to remove.");
            return false;
        }
        String v = label.trim();
        if (steps != null) {
            steps.add("Removing vertex '" + v + "' and all connected edges.");
        }
        for (List<String> neighbors : adjList.values()) {
            neighbors.remove(v);
        }
        adjList.remove(v);
        if (steps != null) {
            steps.add("Vertex '" + v + "' removed. Remaining vertices: " + adjList.size() + ".");
        }
        return true;
    }

    public List<String> bfs(String startVertex, List<String> steps) {
        List<String> traversal = new ArrayList<>();
        if (startVertex == null || !adjList.containsKey(startVertex.trim())) {
            String start = adjList.isEmpty() ? null : adjList.keySet().iterator().next();
            if (start == null) {
                if (steps != null) steps.add("Graph is empty. Cannot run BFS.");
                return traversal;
            }
            startVertex = start;
        }
        startVertex = startVertex.trim();
        if (steps != null) {
            steps.add("Starting Breadth-First Search (BFS) from vertex '" + startVertex + "'.");
        }

        Set<String> visited = new LinkedHashSet<>();
        Queue<String> queue = new LinkedList<>();

        visited.add(startVertex);
        queue.add(startVertex);

        while (!queue.isEmpty()) {
            String curr = queue.poll();
            traversal.add(curr);
            if (steps != null) {
                steps.add("Visited vertex '" + curr + "'.");
            }
            for (String neighbor : adjList.getOrDefault(curr, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                    if (steps != null) {
                        steps.add("Discovered unvisited neighbor '" + neighbor + "'. Added to queue.");
                    }
                }
            }
        }
        if (steps != null) {
            steps.add("BFS Traversal Complete: " + traversal);
        }
        return traversal;
    }

    public List<String> dfs(String startVertex, List<String> steps) {
        List<String> traversal = new ArrayList<>();
        if (startVertex == null || !adjList.containsKey(startVertex.trim())) {
            String start = adjList.isEmpty() ? null : adjList.keySet().iterator().next();
            if (start == null) {
                if (steps != null) steps.add("Graph is empty. Cannot run DFS.");
                return traversal;
            }
            startVertex = start;
        }
        startVertex = startVertex.trim();
        if (steps != null) {
            steps.add("Starting Depth-First Search (DFS) from vertex '" + startVertex + "'.");
        }

        Set<String> visited = new HashSet<>();
        dfsHelper(startVertex, visited, traversal, steps);

        if (steps != null) {
            steps.add("DFS Traversal Complete: " + traversal);
        }
        return traversal;
    }

    private void dfsHelper(String curr, Set<String> visited, List<String> traversal, List<String> steps) {
        visited.add(curr);
        traversal.add(curr);
        if (steps != null) {
            steps.add("Visited vertex '" + curr + "' (DFS recursion depth " + visited.size() + ").");
        }
        for (String neighbor : adjList.getOrDefault(curr, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                dfsHelper(neighbor, visited, traversal, steps);
            }
        }
    }

    public Map<String, List<String>> getAdjList() { return adjList; }
    public int getVertexCount() { return adjList.size(); }
    public int getEdgeCount() {
        int edges = 0;
        for (List<String> neighbors : adjList.values()) {
            edges += neighbors.size();
        }
        return edges / 2; // undirected
    }
    public boolean isEmpty() { return adjList.isEmpty(); }
    public void clear() { adjList.clear(); }
}
