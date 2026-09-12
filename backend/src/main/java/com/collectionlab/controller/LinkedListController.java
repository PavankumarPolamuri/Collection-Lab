package com.collectionlab.controller;

import com.collectionlab.collections.CustomLinkedList;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.LinkedListStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/linkedlist")
@CrossOrigin(origins = "*")
public class LinkedListController {

    private final CollectionService collectionService;

    public LinkedListController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<LinkedListStateDto> getState() {
        return ResponseEntity.ok(collectionService.getLinkedListState());
    }

    @PostMapping("/add-first")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> addFirst(@RequestBody OperationRequest request) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        list.addFirst(request.getValue(), steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "ADD_FIRST", true, request.getValue(),
                "O(1)", steps, prevState, newState, Map.of("headData", request.getValue()), null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-last")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> addLast(@RequestBody OperationRequest request) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        list.addLast(request.getValue(), steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "ADD_LAST", true, request.getValue(),
                "O(1)", steps, prevState, newState, Map.of("tailData", request.getValue()), null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-at")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> addAt(@RequestBody OperationRequest request) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        list.add(request.getIndex(), request.getValue(), steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "ADD_AT", true, Map.of("index", request.getIndex(), "value", request.getValue()),
                "O(n)", steps, prevState, newState, Map.of("index", request.getIndex()), null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{index}")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> get(@PathVariable int index) {
        LinkedListStateDto state = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        String val = list.get(index, steps);

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "GET", true, index,
                "O(n)", steps, state, state, Map.of("value", val, "index", index), null
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{index}")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> set(@PathVariable int index, @RequestBody OperationRequest request) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        String oldVal = list.set(index, request.getValue(), steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "SET", true, Map.of("index", index, "value", request.getValue()),
                "O(n)", steps, prevState, newState, Map.of("oldValue", oldVal, "newValue", request.getValue()), null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/first")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> removeFirst() {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        String removed = list.removeFirst(steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "REMOVE_FIRST", true, null,
                "O(1)", steps, prevState, newState, Map.of("removedValue", removed), null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/last")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> removeLast() {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        String removed = list.removeLast(steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "REMOVE_LAST", true, null,
                "O(1)", steps, prevState, newState, Map.of("removedValue", removed), null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> contains(@RequestBody OperationRequest request) {
        LinkedListStateDto state = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        boolean found = list.contains(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("searchedValue", request.getValue());
        details.put("found", found);

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "CONTAINS", found, request.getValue(),
                "O(n)", steps, state, state, details, !found ? "Element '" + request.getValue() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/index-of")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> indexOf(@RequestBody OperationRequest request) {
        LinkedListStateDto state = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        int index = list.indexOf(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("searchedValue", request.getValue());
        details.put("foundIndex", index);

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "INDEX_OF", index >= 0, request.getValue(),
                "O(n)", steps, state, state, details, index < 0 ? "Element '" + request.getValue() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/remove-value")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> removeByValue(@RequestBody OperationRequest request) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        boolean removed = list.removeByValue(request.getValue(), steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        Map<String, Object> details = new HashMap<>();
        details.put("targetValue", request.getValue());
        details.put("removed", removed);

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "REMOVE_BY_VALUE", removed, request.getValue(),
                "O(n)", steps, prevState, newState, details, !removed ? "Element '" + request.getValue() + "' not found to remove" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<OperationResponse<LinkedListStateDto>> remove(@PathVariable int index) {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        CustomLinkedList<String> list = collectionService.getLinkedList();

        List<String> steps = new ArrayList<>();
        String removed = list.remove(index, steps);

        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "REMOVE", true, index,
                "O(n)", steps, prevState, newState, Map.of("removedValue", removed, "index", index), null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<LinkedListStateDto>> clear() {
        LinkedListStateDto prevState = collectionService.getLinkedListState();
        collectionService.resetLinkedList();
        LinkedListStateDto newState = collectionService.getLinkedListState();

        OperationResponse<LinkedListStateDto> response = new OperationResponse<>(
                "LINKED_LIST", "CLEAR", true, null,
                "O(1)", List.of("Cleared all nodes in doubly linked list"),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
