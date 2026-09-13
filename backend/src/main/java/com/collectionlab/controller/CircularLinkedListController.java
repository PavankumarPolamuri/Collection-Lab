package com.collectionlab.controller;

import com.collectionlab.collections.CustomCircularLinkedList;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.CircularLinkedListStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/circular-linked-list")
@CrossOrigin(origins = "*")
public class CircularLinkedListController {

    private final CollectionService collectionService;

    public CircularLinkedListController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<CircularLinkedListStateDto> getState() {
        return ResponseEntity.ok(collectionService.getCircularLinkedListState());
    }

    @PostMapping("/add-first")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> addFirst(@RequestBody OperationRequest request) {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        list.addFirst(request.getValue(), steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "ADD_FIRST", true, request.getValue(),
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-last")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> addLast(@RequestBody OperationRequest request) {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        list.addLast(request.getValue(), steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "ADD_LAST", true, request.getValue(),
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-at")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> addAt(@RequestBody OperationRequest request) {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        list.add(request.getIndex(), request.getValue(), steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "ADD_AT", true, Map.of("index", request.getIndex(), "value", request.getValue()),
                "O(n)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{index}")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> get(@PathVariable int index) {
        CircularLinkedListStateDto state = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        String val = list.get(index, steps);

        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "GET", true, index,
                "O(n)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{index}")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> set(@PathVariable int index, @RequestBody OperationRequest request) {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        String oldVal = list.set(index, request.getValue(), steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "EDIT", true, Map.of("index", index, "value", request.getValue()),
                "O(n)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/first")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> removeFirst() {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        String val = list.removeFirst(steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "REMOVE_FIRST", true, val,
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/last")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> removeLast() {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        String val = list.removeLast(steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "REMOVE_LAST", true, val,
                "O(n)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> remove(@PathVariable int index) {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        String val = list.remove(index, steps);

        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();
        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "REMOVE", true, index,
                "O(n)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains")
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> contains(@RequestBody OperationRequest request) {
        CircularLinkedListStateDto state = collectionService.getCircularLinkedListState();
        CustomCircularLinkedList<String> list = collectionService.getCircularLinkedList();

        List<String> steps = new ArrayList<>();
        boolean found = list.contains(request.getValue(), steps);

        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "CONTAINS", found, request.getValue(),
                "O(n)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<CircularLinkedListStateDto>> clear() {
        CircularLinkedListStateDto prevState = collectionService.getCircularLinkedListState();
        collectionService.resetCircularLinkedList();
        CircularLinkedListStateDto newState = collectionService.getCircularLinkedListState();

        OperationResponse<CircularLinkedListStateDto> response = new OperationResponse<>(
                "CIRCULAR_LINKED_LIST", "CLEAR", true, null,
                "O(1)", List.of("Cleared all nodes from Circular LinkedList."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
