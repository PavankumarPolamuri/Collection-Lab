package com.collectionlab.controller;

import com.collectionlab.collections.CustomArrayList;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.ArrayListStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/arraylist")
@CrossOrigin(origins = "*")
public class ArrayListController {

    private final CollectionService collectionService;

    public ArrayListController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<ArrayListStateDto> getState() {
        return ResponseEntity.ok(collectionService.getArrayListState());
    }

    @PostMapping("/add")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> add(@RequestBody OperationRequest request) {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        int oldCap = list.capacity();
        list.add(request.getValue(), steps);
        int newCap = list.capacity();

        ArrayListStateDto newState = collectionService.getArrayListState();

        Map<String, Object> details = new HashMap<>();
        details.put("resized", newCap > oldCap);
        details.put("oldCapacity", oldCap);
        details.put("newCapacity", newCap);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "ADD", true, request.getValue(),
                newCap > oldCap ? "O(n) on resize / O(1) amortized" : "O(1) amortized",
                steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-at")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> addAt(@RequestBody OperationRequest request) {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        list.add(request.getIndex(), request.getValue(), steps);

        ArrayListStateDto newState = collectionService.getArrayListState();

        Map<String, Object> details = new HashMap<>();
        details.put("targetIndex", request.getIndex());

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "ADD_AT", true, Map.of("index", request.getIndex(), "value", request.getValue()),
                "O(n)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{index}")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> get(@PathVariable int index) {
        ArrayListStateDto state = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        String val = list.get(index, steps);

        Map<String, Object> details = new HashMap<>();
        details.put("accessedValue", val);
        details.put("index", index);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "GET", true, index,
                "O(1)", steps, state, state, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{index}")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> set(@PathVariable int index, @RequestBody OperationRequest request) {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        String oldVal = list.set(index, request.getValue(), steps);

        ArrayListStateDto newState = collectionService.getArrayListState();

        Map<String, Object> details = new HashMap<>();
        details.put("oldValue", oldVal);
        details.put("newValue", request.getValue());
        details.put("index", index);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "EDIT / UPDATE", true, Map.of("index", index, "value", request.getValue()),
                "O(1)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> contains(@RequestBody OperationRequest request) {
        ArrayListStateDto state = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        boolean found = list.contains(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("searchedValue", request.getValue());
        details.put("found", found);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "CONTAINS", found, request.getValue(),
                "O(n)", steps, state, state, details, !found ? "Element '" + request.getValue() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/index-of")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> indexOf(@RequestBody OperationRequest request) {
        ArrayListStateDto state = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        int index = list.indexOf(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("searchedValue", request.getValue());
        details.put("foundIndex", index);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "INDEX_OF", index >= 0, request.getValue(),
                "O(n)", steps, state, state, details, index < 0 ? "Element '" + request.getValue() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/remove-value")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> removeByValue(@RequestBody OperationRequest request) {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        boolean removed = list.removeByValue(request.getValue(), steps);

        ArrayListStateDto newState = collectionService.getArrayListState();

        Map<String, Object> details = new HashMap<>();
        details.put("targetValue", request.getValue());
        details.put("removed", removed);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "REMOVE_BY_VALUE", removed, request.getValue(),
                "O(n)", steps, prevState, newState, details, !removed ? "Element '" + request.getValue() + "' not found to remove" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<OperationResponse<ArrayListStateDto>> remove(@PathVariable int index) {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        CustomArrayList<String> list = collectionService.getArrayList();

        List<String> steps = new ArrayList<>();
        String removedVal = list.remove(index, steps);

        ArrayListStateDto newState = collectionService.getArrayListState();

        Map<String, Object> details = new HashMap<>();
        details.put("removedValue", removedVal);
        details.put("index", index);

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "REMOVE", true, index,
                "O(n)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<ArrayListStateDto>> clear() {
        ArrayListStateDto prevState = collectionService.getArrayListState();
        collectionService.resetArrayList();
        ArrayListStateDto newState = collectionService.getArrayListState();

        OperationResponse<ArrayListStateDto> response = new OperationResponse<>(
                "ARRAY_LIST", "CLEAR", true, null,
                "O(1)", List.of("Cleared and reset ArrayList capacity"),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
