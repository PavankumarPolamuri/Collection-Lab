package com.collectionlab.controller;

import com.collectionlab.collections.CustomHashMap;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.HashMapStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hashmap")
@CrossOrigin(origins = "*")
public class HashMapController {

    private final CollectionService collectionService;

    public HashMapController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/state")
    public ResponseEntity<HashMapStateDto> getState() {
        return ResponseEntity.ok(collectionService.getHashMapState());
    }

    @PostMapping("/put")
    public ResponseEntity<OperationResponse<HashMapStateDto>> put(@RequestBody OperationRequest request) {
        HashMapStateDto prevState = collectionService.getHashMapState();
        CustomHashMap<String, String> map = collectionService.getHashMap();

        int oldCap = map.capacity();
        int hash = map.hash(request.getKey());
        int bucketIndex = map.getBucketIndex(hash, oldCap);
        boolean collisionBefore = map.getBuckets()[bucketIndex] != null && !map.containsKey(request.getKey());

        List<String> steps = new ArrayList<>();
        String oldVal = map.put(request.getKey(), request.getValue(), steps);
        int newCap = map.capacity();

        HashMapStateDto newState = collectionService.getHashMapState();

        Map<String, Object> details = new HashMap<>();
        details.put("key", request.getKey());
        details.put("value", request.getValue());
        details.put("hash", hash);
        details.put("bucketIndex", bucketIndex);
        details.put("isCollision", collisionBefore);
        details.put("oldValue", oldVal);
        details.put("resized", newCap > oldCap);
        details.put("oldCapacity", oldCap);
        details.put("newCapacity", newCap);

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "PUT", true, Map.of("key", request.getKey(), "value", request.getValue()),
                newCap > oldCap ? "O(n) on resize / O(1) average" : "O(1) average",
                steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{key}")
    public ResponseEntity<OperationResponse<HashMapStateDto>> get(@PathVariable String key) {
        HashMapStateDto state = collectionService.getHashMapState();
        CustomHashMap<String, String> map = collectionService.getHashMap();

        List<String> steps = new ArrayList<>();
        int hash = map.hash(key);
        int bucketIndex = map.getBucketIndex(hash, map.capacity());
        String val = map.get(key, steps);

        Map<String, Object> details = new HashMap<>();
        details.put("key", key);
        details.put("value", val);
        details.put("hash", hash);
        details.put("bucketIndex", bucketIndex);
        details.put("found", val != null);

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "GET", val != null, key,
                "O(1) average", steps, state, state, details, val == null ? "Key '" + key + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains-key")
    public ResponseEntity<OperationResponse<HashMapStateDto>> containsKey(@RequestBody OperationRequest request) {
        HashMapStateDto state = collectionService.getHashMapState();
        CustomHashMap<String, String> map = collectionService.getHashMap();

        List<String> steps = new ArrayList<>();
        boolean found = map.containsKey(request.getKey(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("key", request.getKey());
        details.put("found", found);

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "CONTAINS_KEY", found, request.getKey(),
                "O(1) average", steps, state, state, details, !found ? "Key '" + request.getKey() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains-value")
    public ResponseEntity<OperationResponse<HashMapStateDto>> containsValue(@RequestBody OperationRequest request) {
        HashMapStateDto state = collectionService.getHashMapState();
        CustomHashMap<String, String> map = collectionService.getHashMap();

        List<String> steps = new ArrayList<>();
        boolean found = map.containsValue(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("value", request.getValue());
        details.put("found", found);

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "CONTAINS_VALUE", found, request.getValue(),
                "O(n)", steps, state, state, details, !found ? "Value '" + request.getValue() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<OperationResponse<HashMapStateDto>> remove(@PathVariable String key) {
        HashMapStateDto prevState = collectionService.getHashMapState();
        CustomHashMap<String, String> map = collectionService.getHashMap();

        List<String> steps = new ArrayList<>();
        int hash = map.hash(key);
        int bucketIndex = map.getBucketIndex(hash, map.capacity());
        String removed = map.remove(key, steps);

        HashMapStateDto newState = collectionService.getHashMapState();

        Map<String, Object> details = new HashMap<>();
        details.put("key", key);
        details.put("removedValue", removed);
        details.put("hash", hash);
        details.put("bucketIndex", bucketIndex);

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "REMOVE", removed != null, key,
                "O(1) average", steps, prevState, newState, details, removed == null ? "Key not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<HashMapStateDto>> clear() {
        HashMapStateDto prevState = collectionService.getHashMapState();
        collectionService.resetHashMap();
        HashMapStateDto newState = collectionService.getHashMapState();

        OperationResponse<HashMapStateDto> response = new OperationResponse<>(
                "HASH_MAP", "CLEAR", true, null,
                "O(1)", List.of("Reset hash map capacity and buckets"),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
