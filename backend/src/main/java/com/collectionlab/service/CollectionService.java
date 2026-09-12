package com.collectionlab.service;

import com.collectionlab.collections.*;
import com.collectionlab.dto.state.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionService {

    private CustomArrayList<String> arrayList = new CustomArrayList<>(8);
    private CustomLinkedList<String> linkedList = new CustomLinkedList<>();
    private CustomHashMap<String, String> hashMap = new CustomHashMap<>(8, 0.75f);
    private CustomTreeMap<String, String> treeMap = new CustomTreeMap<>();
    private CustomPriorityQueue<String> priorityQueue = new CustomPriorityQueue<>(8);

    // ==================== ARRAY LIST ====================
    public CustomArrayList<String> getArrayList() { return arrayList; }

    public void resetArrayList() {
        this.arrayList = new CustomArrayList<>(8);
    }

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

    public void resetLinkedList() {
        this.linkedList = new CustomLinkedList<>();
    }

    public LinkedListStateDto getLinkedListState() {
        List<LinkedListStateDto.NodeDto> nodeDtos = new ArrayList<>();
        CustomLinkedList.Node<String> curr = linkedList.getHead();
        int idx = 0;
        while (curr != null) {
            nodeDtos.add(new LinkedListStateDto.NodeDto(
                    idx,
                    curr.data,
                    curr.prev != null,
                    curr.next != null
            ));
            curr = curr.next;
            idx++;
        }
        Object headVal = linkedList.getHead() != null ? linkedList.getHead().data : null;
        Object tailVal = linkedList.getTail() != null ? linkedList.getTail().data : null;
        return new LinkedListStateDto(nodeDtos, linkedList.size(), headVal, tailVal);
    }

    // ==================== HASH MAP ====================
    public CustomHashMap<String, String> getHashMap() { return hashMap; }

    public void resetHashMap() {
        this.hashMap = new CustomHashMap<>(8, 0.75f);
    }

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

    public void resetTreeMap() {
        this.treeMap = new CustomTreeMap<>();
    }

    public TreeMapStateDto getTreeMapState() {
        TreeMapStateDto.TreeNodeDto rootDto = convertTreeNodeDto(treeMap.getRoot());
        Object first = treeMap.isEmpty() ? null : treeMap.firstKey();
        Object last = treeMap.isEmpty() ? null : treeMap.lastKey();
        List<Object> inorder = new ArrayList<>(treeMap.inorder());
        return new TreeMapStateDto(rootDto, treeMap.size(), first, last, inorder);
    }

    private TreeMapStateDto.TreeNodeDto convertTreeNodeDto(CustomTreeMap.TreeNode<String, String> node) {
        if (node == null) return null;
        return new TreeMapStateDto.TreeNodeDto(
                node.key,
                node.value,
                convertTreeNodeDto(node.left),
                convertTreeNodeDto(node.right)
        );
    }

    // ==================== PRIORITY QUEUE ====================
    public CustomPriorityQueue<String> getPriorityQueue() { return priorityQueue; }

    public void resetPriorityQueue() {
        this.priorityQueue = new CustomPriorityQueue<>(8);
    }

    public PriorityQueueStateDto getPriorityQueueState() {
        Object[] rawArr = priorityQueue.getHeapArray();
        List<Object> heapList = new ArrayList<>();
        for (Object item : rawArr) {
            heapList.add(item);
        }
        Object rootMin = priorityQueue.peek();
        return new PriorityQueueStateDto(heapList, priorityQueue.size(), priorityQueue.capacity(), rootMin);
    }
}
