package com.collectionlab.service;

import com.collectionlab.collections.*;
import com.collectionlab.dto.state.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class CollectionService {

    // Existing 5 Collections
    private CustomArrayList<String> arrayList = new CustomArrayList<>(8);
    private CustomLinkedList<String> linkedList = new CustomLinkedList<>();
    private CustomHashMap<String, String> hashMap = new CustomHashMap<>(8, 0.75f);
    private CustomTreeMap<String, String> treeMap = new CustomTreeMap<>();
    private CustomPriorityQueue<String> priorityQueue = new CustomPriorityQueue<>(8);

    // 10 New Collections
    private CustomStack<String> stack = new CustomStack<>();
    private CustomQueue<String> queue = new CustomQueue<>();
    private CustomDeque<String> deque = new CustomDeque<>();
    private CustomHashSet<String> hashSet = new CustomHashSet<>(8);
    private CustomBST<String> bst = new CustomBST<>();
    private CustomMinHeap<String> minHeap = new CustomMinHeap<>();
    private CustomTrie trie = new CustomTrie();
    private CustomGraph graph = new CustomGraph();
    private CustomDisjointSet disjointSet = new CustomDisjointSet();
    private CustomCircularLinkedList<String> circularLinkedList = new CustomCircularLinkedList<>();

    // ==================== ARRAY LIST ====================
    public CustomArrayList<String> getArrayList() { return arrayList; }
    public void resetArrayList() { this.arrayList = new CustomArrayList<>(8); }
    public ArrayListStateDto getArrayListState() {
        List<Object> elementsList = new ArrayList<>();
        for (int i = 0; i < arrayList.capacity(); i++) {
            if (i < arrayList.size()) {
                elementsList.add(arrayList.get(i));
            } else {
                elementsList.add(null);
            }
        }
        return new ArrayListStateDto(elementsList, arrayList.size(), arrayList.capacity());
    }

    // ==================== LINKED LIST ====================
    public CustomLinkedList<String> getLinkedList() { return linkedList; }
    public void resetLinkedList() { this.linkedList = new CustomLinkedList<>(); }
    public LinkedListStateDto getLinkedListState() {
        List<LinkedListStateDto.NodeDto> nodeDtos = new ArrayList<>();
        CustomLinkedList.Node<String> curr = linkedList.getHead();
        int idx = 0;
        while (curr != null) {
            nodeDtos.add(new LinkedListStateDto.NodeDto(idx, curr.data, curr.prev != null, curr.next != null));
            curr = curr.next;
            idx++;
        }
        Object headVal = linkedList.getHead() != null ? linkedList.getHead().data : null;
        Object tailVal = linkedList.getTail() != null ? linkedList.getTail().data : null;
        return new LinkedListStateDto(nodeDtos, linkedList.size(), headVal, tailVal);
    }

    // ==================== HASH MAP ====================
    public CustomHashMap<String, String> getHashMap() { return hashMap; }
    public void resetHashMap() { this.hashMap = new CustomHashMap<>(8, 0.75f); }
    public HashMapStateDto getHashMapState() {
        List<HashMapStateDto.BucketDto> bucketDtos = new ArrayList<>();
        CustomHashMap.Entry<String, String>[] buckets = hashMap.getBuckets();
        for (int i = 0; i < buckets.length; i++) {
            List<HashMapStateDto.EntryDto> entryDtos = new ArrayList<>();
            CustomHashMap.Entry<String, String> entry = buckets[i];
            while (entry != null) {
                entryDtos.add(new HashMapStateDto.EntryDto(entry.key, entry.value, entry.hash));
                entry = entry.next;
            }
            bucketDtos.add(new HashMapStateDto.BucketDto(i, entryDtos));
        }
        int threshold = (int) (hashMap.capacity() * hashMap.loadFactor());
        return new HashMapStateDto(bucketDtos, hashMap.size(), hashMap.capacity(), hashMap.loadFactor(), threshold);
    }

    // ==================== TREE MAP ====================
    public CustomTreeMap<String, String> getTreeMap() { return treeMap; }
    public void resetTreeMap() { this.treeMap = new CustomTreeMap<>(); }
    public TreeMapStateDto getTreeMapState() {
        TreeMapStateDto.TreeNodeDto rootDto = convertTreeNodeDto(treeMap.getRoot());
        Object first = treeMap.isEmpty() ? null : treeMap.firstKey();
        Object last = treeMap.isEmpty() ? null : treeMap.lastKey();
        List<Object> inorder = new ArrayList<>(treeMap.inorder());
        return new TreeMapStateDto(rootDto, treeMap.size(), first, last, inorder);
    }
    private TreeMapStateDto.TreeNodeDto convertTreeNodeDto(CustomTreeMap.TreeNode<String, String> node) {
        if (node == null) return null;
        return new TreeMapStateDto.TreeNodeDto(node.key, node.value, convertTreeNodeDto(node.left), convertTreeNodeDto(node.right));
    }

    // ==================== PRIORITY QUEUE ====================
    public CustomPriorityQueue<String> getPriorityQueue() { return priorityQueue; }
    public void resetPriorityQueue() { this.priorityQueue = new CustomPriorityQueue<>(8); }
    public PriorityQueueStateDto getPriorityQueueState() {
        Object[] rawArr = priorityQueue.getHeapArray();
        List<Object> heapList = new ArrayList<>();
        for (Object item : rawArr) heapList.add(item);
        Object rootMin = priorityQueue.peek();
        return new PriorityQueueStateDto(heapList, priorityQueue.size(), priorityQueue.capacity(), rootMin);
    }

    // ==================== 1. STACK ====================
    public CustomStack<String> getStack() { return stack; }
    public void resetStack() { this.stack = new CustomStack<>(); }
    public StackStateDto getStackState() {
        List<Object> elems = new ArrayList<>(stack.getElements());
        return new StackStateDto(elems, stack.size(), stack.peek(), stack.isEmpty());
    }

    // ==================== 2. QUEUE ====================
    public CustomQueue<String> getQueue() { return queue; }
    public void resetQueue() { this.queue = new CustomQueue<>(); }
    public QueueStateDto getQueueState() {
        List<Object> elems = new ArrayList<>(queue.getElements());
        return new QueueStateDto(elems, queue.size(), queue.peek(), queue.getRear(), queue.isEmpty());
    }

    // ==================== 3. DEQUE ====================
    public CustomDeque<String> getDeque() { return deque; }
    public void resetDeque() { this.deque = new CustomDeque<>(); }
    public DequeStateDto getDequeState() {
        List<Object> elems = new ArrayList<>(deque.getElements());
        return new DequeStateDto(elems, deque.size(), deque.peekFirst(), deque.peekLast(), deque.isEmpty());
    }

    // ==================== 4. HASH SET ====================
    public CustomHashSet<String> getHashSet() { return hashSet; }
    public void resetHashSet() { this.hashSet = new CustomHashSet<>(8); }
    public HashSetStateDto getHashSetState() {
        List<HashSetStateDto.BucketDto> bucketDtos = new ArrayList<>();
        LinkedList<String>[] buckets = hashSet.getBuckets();
        for (int i = 0; i < buckets.length; i++) {
            List<Object> elems = new ArrayList<>(buckets[i]);
            bucketDtos.add(new HashSetStateDto.BucketDto(i, elems));
        }
        return new HashSetStateDto(bucketDtos, hashSet.size(), hashSet.capacity());
    }

    // ==================== 5. BST ====================
    public CustomBST<String> getBST() { return bst; }
    public void resetBST() { this.bst = new CustomBST<>(); }
    public BSTStateDto getBSTState() { return getBSTStateWithTraversal(null); }
    public BSTStateDto getBSTStateWithTraversal(List<String> traversal) {
        BSTStateDto.BSTNodeDto rootDto = convertBSTNodeDto(bst.getRoot());
        List<Object> travObj = traversal != null ? new ArrayList<>(traversal) : new ArrayList<>(bst.traversal("inorder", null));
        return new BSTStateDto(rootDto, bst.size(), travObj);
    }
    private BSTStateDto.BSTNodeDto convertBSTNodeDto(CustomBST.BSTNode<String> node) {
        if (node == null) return null;
        return new BSTStateDto.BSTNodeDto(node.key, convertBSTNodeDto(node.left), convertBSTNodeDto(node.right));
    }

    // ==================== 6. HEAP ====================
    public CustomMinHeap<String> getMinHeap() { return minHeap; }
    public void resetMinHeap() { this.minHeap = new CustomMinHeap<>(); }
    public HeapStateDto getHeapState() {
        List<Object> elems = new ArrayList<>(minHeap.getHeapArray());
        return new HeapStateDto(elems, minHeap.size(), minHeap.peek());
    }

    // ==================== 7. TRIE ====================
    public CustomTrie getTrie() { return trie; }
    public void resetTrie() { this.trie = new CustomTrie(); }
    public TrieStateDto getTrieState() {
        TrieStateDto.TrieNodeDto rootDto = convertTrieNodeDto(trie.getRoot());
        return new TrieStateDto(rootDto, trie.getWordCount());
    }
    private TrieStateDto.TrieNodeDto convertTrieNodeDto(CustomTrie.TrieNode node) {
        if (node == null) return null;
        Map<String, TrieStateDto.TrieNodeDto> childrenDto = new HashMap<>();
        for (Map.Entry<Character, CustomTrie.TrieNode> entry : node.children.entrySet()) {
            childrenDto.put(String.valueOf(entry.getKey()), convertTrieNodeDto(entry.getValue()));
        }
        return new TrieStateDto.TrieNodeDto(node.ch == '\0' ? "ROOT" : String.valueOf(node.ch), node.isEndOfWord, childrenDto);
    }

    // ==================== 8. GRAPH ====================
    public CustomGraph getGraph() { return graph; }
    public void resetGraph() { this.graph = new CustomGraph(); }
    public GraphStateDto getGraphState() { return getGraphStateWithTraversal(null); }
    public GraphStateDto getGraphStateWithTraversal(List<String> traversal) {
        List<String> verts = new ArrayList<>(graph.getAdjList().keySet());
        Map<String, List<String>> adj = new HashMap<>(graph.getAdjList());
        return new GraphStateDto(verts, adj, graph.getVertexCount(), graph.getEdgeCount(), traversal);
    }

    // ==================== 9. DISJOINT SET ====================
    public CustomDisjointSet getDisjointSet() { return disjointSet; }
    public void resetDisjointSet() { this.disjointSet = new CustomDisjointSet(); }
    public DisjointSetStateDto getDisjointSetState() {
        List<DisjointSetStateDto.SetNodeDto> dtos = new ArrayList<>();
        for (Map.Entry<String, CustomDisjointSet.NodeInfo> entry : disjointSet.getParentMap().entrySet()) {
            dtos.add(new DisjointSetStateDto.SetNodeDto(entry.getKey(), entry.getValue().parent, entry.getValue().rank));
        }
        return new DisjointSetStateDto(dtos, disjointSet.getElementCount(), disjointSet.getSetCount());
    }

    // ==================== 10. CIRCULAR LINKED LIST ====================
    public CustomCircularLinkedList<String> getCircularLinkedList() { return circularLinkedList; }
    public void resetCircularLinkedList() { this.circularLinkedList = new CustomCircularLinkedList<>(); }
    public CircularLinkedListStateDto getCircularLinkedListState() {
        List<CircularLinkedListStateDto.CircularNodeDto> dtos = new ArrayList<>();
        CustomCircularLinkedList.Node<String> curr = circularLinkedList.getHead();
        int sz = circularLinkedList.size();
        for (int i = 0; i < sz; i++) {
            boolean isH = i == 0;
            boolean isT = i == sz - 1;
            int nextIdx = (i + 1) % sz;
            dtos.add(new CircularLinkedListStateDto.CircularNodeDto(i, curr.data, isH, isT, nextIdx));
            curr = curr.next;
        }
        Object hVal = circularLinkedList.getHead() != null ? circularLinkedList.getHead().data : null;
        Object tVal = circularLinkedList.getTail() != null ? circularLinkedList.getTail().data : null;
        return new CircularLinkedListStateDto(dtos, circularLinkedList.size(), hVal, tVal);
    }
}
