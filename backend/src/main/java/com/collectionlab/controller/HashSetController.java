package com.collectionlab.controller;

import com.collectionlab.collections.CustomHashSet;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.HashSetStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hashset")
@CrossOrigin(origins = "*")
public class HashSetController {

    private final CollectionService collectionService;

    public HashSetController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<HashSetStateDto> getState() {
        return ResponseEntity.ok(collectionService.getHashSetState());
    }

    @PostMapping("/add")
    public ResponseEntity<OperationResponse<HashSetStateDto>> add(@RequestBody OperationRequest request) {
        HashSetStateDto prevState = collectionService.getHashSetState();
        CustomHashSet<String> set = collectionService.getHashSet();

        List<String> steps = new ArrayList<>();
        boolean added = set.add(request.getValue(), steps);

        HashSetStateDto newState = collectionService.getHashSetState();
        OperationResponse<HashSetStateDto> response = new OperationResponse<>(
                "HASH_SET", "ADD", added, request.getValue(),
                "O(1) average", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/remove")
    public ResponseEntity<OperationResponse<HashSetStateDto>> remove(@RequestBody OperationRequest request) {
        HashSetStateDto prevState = collectionService.getHashSetState();
        CustomHashSet<String> set = collectionService.getHashSet();

        List<String> steps = new ArrayList<>();
        boolean removed = set.remove(request.getValue(), steps);

        HashSetStateDto newState = collectionService.getHashSetState();
        OperationResponse<HashSetStateDto> response = new OperationResponse<>(
                "HASH_SET", "REMOVE", removed, request.getValue(),
                "O(1) average", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains")
    public ResponseEntity<OperationResponse<HashSetStateDto>> contains(@RequestBody OperationRequest request) {
        HashSetStateDto state = collectionService.getHashSetState();
        CustomHashSet<String> set = collectionService.getHashSet();

        List<String> steps = new ArrayList<>();
        boolean found = set.contains(request.getValue(), steps);

        OperationResponse<HashSetStateDto> response = new OperationResponse<>(
                "HASH_SET", "CONTAINS", found, request.getValue(),
                "O(1) average", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<HashSetStateDto>> clear() {
        HashSetStateDto prevState = collectionService.getHashSetState();
        collectionService.resetHashSet();
        HashSetStateDto newState = collectionService.getHashSetState();

        OperationResponse<HashSetStateDto> response = new OperationResponse<>(
                "HASH_SET", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from HashSet."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
