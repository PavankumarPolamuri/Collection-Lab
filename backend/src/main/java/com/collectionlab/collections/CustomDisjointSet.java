package com.collectionlab.collections;

import java.util.*;

public class CustomDisjointSet {

    public static class NodeInfo {
        public String parent;
        public int rank;

        public NodeInfo(String parent, int rank) {
            this.parent = parent;
            this.rank = rank;
        }
    }

    private final Map<String, NodeInfo> parentMap;

    public CustomDisjointSet() {
        this.parentMap = new LinkedHashMap<>();
    }

    public boolean makeSet(String element, List<String> steps) {
        if (element == null || element.isBlank()) return false;
        String e = element.trim();
        if (steps != null) {
            steps.add("Executing makeSet('" + e + "').");
        }
        if (!parentMap.containsKey(e)) {
            parentMap.put(e, new NodeInfo(e, 0));
            if (steps != null) {
                steps.add("Created new disjoint set containing '" + e + "' with parent = '" + e + "' and rank = 0.");
            }
            return true;
        }
        if (steps != null) {
            steps.add("Set for element '" + e + "' already exists.");
        }
        return false;
    }

    public String find(String element, List<String> steps) {
        if (element == null || !parentMap.containsKey(element.trim())) {
            if (steps != null) steps.add("Element '" + element + "' does NOT exist in Disjoint Set.");
            return null;
        }
        String e = element.trim();
        if (steps != null) {
            steps.add("Executing find('" + e + "') with Path Compression.");
        }
        return findHelper(e, steps);
    }

    private String findHelper(String curr, List<String> steps) {
        NodeInfo info = parentMap.get(curr);
        if (info.parent.equals(curr)) {
            if (steps != null) steps.add("Root representative of set is '" + curr + "'.");
            return curr;
        }
        if (steps != null) steps.add("Node '" + curr + "' points to parent '" + info.parent + "'. Traversing up.");
        String root = findHelper(info.parent, steps);
        if (!info.parent.equals(root)) {
            if (steps != null) steps.add("Path Compression: Flattening tree so '" + curr + "' points directly to root '" + root + "'.");
            info.parent = root;
        }
        return root;
    }

    public boolean union(String elementA, String elementB, List<String> steps) {
        if (elementA == null || elementB == null) return false;
        String a = elementA.trim();
        String b = elementB.trim();

        if (!parentMap.containsKey(a)) makeSet(a, null);
        if (!parentMap.containsKey(b)) makeSet(b, null);

        if (steps != null) {
            steps.add("Executing union('" + a + "', '" + b + "') by Rank.");
        }

        String rootA = find(a, null);
        String rootB = find(b, null);

        if (rootA.equals(rootB)) {
            if (steps != null) steps.add("Elements '" + a + "' and '" + b + "' are ALREADY in the same set (root: '" + rootA + "').");
            return false;
        }

        NodeInfo infoA = parentMap.get(rootA);
        NodeInfo infoB = parentMap.get(rootB);

        if (infoA.rank < infoB.rank) {
            infoA.parent = rootB;
            if (steps != null) steps.add("Set '" + rootA + "' (rank " + infoA.rank + ") attached under '" + rootB + "' (rank " + infoB.rank + ").");
        } else if (infoA.rank > infoB.rank) {
            infoB.parent = rootA;
            if (steps != null) steps.add("Set '" + rootB + "' (rank " + infoB.rank + ") attached under '" + rootA + "' (rank " + infoA.rank + ").");
        } else {
            infoB.parent = rootA;
            infoA.rank++;
            if (steps != null) steps.add("Equal ranks (" + infoA.rank + "). Attached '" + rootB + "' under '" + rootA + "' and incremented rank of '" + rootA + "' to " + infoA.rank + ".");
        }
        return true;
    }

    public boolean isConnected(String elementA, String elementB, List<String> steps) {
        if (elementA == null || elementB == null) return false;
        String a = elementA.trim();
        String b = elementB.trim();
        if (!parentMap.containsKey(a) || !parentMap.containsKey(b)) {
            if (steps != null) steps.add("One or both elements do not exist in Disjoint Set.");
            return false;
        }
        String rootA = find(a, steps);
        String rootB = find(b, steps);
        boolean connected = rootA != null && rootA.equals(rootB);
        if (steps != null) {
            steps.add("Connected check ('" + a + "', '" + b + "'): " + (connected ? "CONNECTED (same root '" + rootA + "')" : "NOT CONNECTED"));
        }
        return connected;
    }

    public Map<String, NodeInfo> getParentMap() { return parentMap; }
    public int getElementCount() { return parentMap.size(); }
    public int getSetCount() {
        int count = 0;
        for (Map.Entry<String, NodeInfo> entry : parentMap.entrySet()) {
            if (entry.getKey().equals(entry.getValue().parent)) {
                count++;
            }
        }
        return count;
    }
    public boolean isEmpty() { return parentMap.isEmpty(); }
    public void clear() { parentMap.clear(); }
}
