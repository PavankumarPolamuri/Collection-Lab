package com.collectionlab.controller;

import com.collectionlab.collections.CustomTreeMap;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.TreeMapStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/treemap")
@CrossOrigin(origins = "*")
public class TreeMapController {

    private final CollectionService collectionService;

    public TreeMapController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/state")
    public ResponseEntity<TreeMapStateDto> getState() {
        return ResponseEntity.ok(collectionService.getTreeMapState());
    }

    @PostMapping("/put")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> put(@RequestBody OperationRequest request) {
        TreeMapStateDto prevState = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        String oldVal = map.put(request.getKey(), request.getValue(), steps);

        TreeMapStateDto newState = collectionService.getTreeMapState();

        Map<String, Object> details = new HashMap<>();
        details.put("key", request.getKey());
        details.put("value", request.getValue());
        details.put("oldValue", oldVal);

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "PUT", true, Map.of("key", request.getKey(), "value", request.getValue()),
                "O(log n) average / O(n) worst", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{key}")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> get(@PathVariable String key) {
        TreeMapStateDto state = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        String val = map.get(key, steps);

        Map<String, Object> details = new HashMap<>();
        details.put("key", key);
        details.put("value", val);

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "GET", val != null, key,
                "O(log n) average", steps, state, state, details, val == null ? "Key '" + key + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/first-key")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> getFirstKey() {
        TreeMapStateDto state = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        String first = map.isEmpty() ? null : map.firstKey(steps);

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "FIRST_KEY", first != null, null,
                "O(log n) average", steps, state, state, Map.of("firstKey", first != null ? first : "null"), first == null ? "Tree is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/last-key")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> getLastKey() {
        TreeMapStateDto state = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        String last = map.isEmpty() ? null : map.lastKey(steps);

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "LAST_KEY", last != null, null,
                "O(log n) average", steps, state, state, Map.of("lastKey", last != null ? last : "null"), last == null ? "Tree is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contains-key")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> containsKey(@RequestBody OperationRequest request) {
        TreeMapStateDto state = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        boolean found = map.get(request.getKey(), steps) != null;

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "CONTAINS_KEY", found, request.getKey(),
                "O(log n) average", steps, state, state, Map.of("key", request.getKey(), "found", found), !found ? "Key '" + request.getKey() + "' not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> remove(@PathVariable String key) {
        TreeMapStateDto prevState = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> steps = new ArrayList<>();
        String removed = map.remove(key, steps);

        TreeMapStateDto newState = collectionService.getTreeMapState();

        Map<String, Object> details = new HashMap<>();
        details.put("key", key);
        details.put("removedValue", removed);

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "REMOVE", removed != null, key,
                "O(log n) average", steps, prevState, newState, details, removed == null ? "Key not found" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/traversal")
    public ResponseEntity<OperationResponse<TreeMapStateDto>> getTraversal(@RequestParam(defaultValue = "inorder") String type) {
        TreeMapStateDto state = collectionService.getTreeMapState();
        CustomTreeMap<String, String> map = collectionService.getTreeMap();

        List<String> traversalKeys;
        String opName;

        if ("preorder".equalsIgnoreCase(type)) {
            traversalKeys = map.preorder();
            opName = "PREORDER_TRAVERSAL";
        } else if ("postorder".equalsIgnoreCase(type)) {
            traversalKeys = map.postorder();
            opName = "POSTORDER_TRAVERSAL";
        } else {
            traversalKeys = map.inorder();
            opName = "INORDER_TRAVERSAL";
        }

        List<String> steps = List.of(
                "Performed " + opName + " on BST",
                "Traversal sequence result: " + traversalKeys
        );

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", opName, true, type,
                "O(n)", steps, state, state, Map.of("traversalType", type, "result", traversalKeys), null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<TreeMapStateDto>> clear() {
        TreeMapStateDto prevState = collectionService.getTreeMapState();
        collectionService.resetTreeMap();
        TreeMapStateDto newState = collectionService.getTreeMapState();

        OperationResponse<TreeMapStateDto> response = new OperationResponse<>(
                "TREE_MAP", "CLEAR", true, null,
                "O(1)", List.of("Cleared BST root node"),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
