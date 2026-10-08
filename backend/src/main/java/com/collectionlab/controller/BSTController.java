package com.collectionlab.controller;

import com.collectionlab.collections.CustomBST;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.BSTStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bst")
@CrossOrigin(origins = "*")
public class BSTController {

    private final CollectionService collectionService;

    public BSTController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<BSTStateDto> getState() {
        return ResponseEntity.ok(collectionService.getBSTState());
    }

    @PostMapping("/insert")
    public ResponseEntity<OperationResponse<BSTStateDto>> insert(@RequestBody OperationRequest request) {
        BSTStateDto prevState = collectionService.getBSTState();
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        bst.insert(request.getValue(), steps);

        BSTStateDto newState = collectionService.getBSTState();
        Map<String, Object> details = new HashMap<>();
        details.put("key", request.getValue());
        details.put("result", "Inserted key '" + request.getValue() + "' into BST");

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "INSERT", true, request.getValue(),
                "O(log n) avg / O(n) worst", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/search")
    public ResponseEntity<OperationResponse<BSTStateDto>> search(@RequestBody OperationRequest request) {
        BSTStateDto state = collectionService.getBSTState();
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        boolean found = bst.search(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("key", request.getValue());
        details.put("found", found);
        details.put("result", found ? "Key '" + request.getValue() + "' FOUND in BST" : "Key '" + request.getValue() + "' NOT FOUND in BST");

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "SEARCH", found, request.getValue(),
                "O(log n) avg / O(n) worst", steps, state, state, details, found ? null : "Key '" + request.getValue() + "' not found"
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<OperationResponse<BSTStateDto>> delete(@PathVariable String key) {
        BSTStateDto prevState = collectionService.getBSTState();
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        bst.delete(key, steps);

        BSTStateDto newState = collectionService.getBSTState();
        Map<String, Object> details = new HashMap<>();
        details.put("key", key);
        details.put("result", "Deleted key '" + key + "' from BST");

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "DELETE", true, key,
                "O(log n) avg / O(n) worst", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/traversal")
    public ResponseEntity<OperationResponse<BSTStateDto>> traversal(@RequestParam(defaultValue = "inorder") String type) {
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        List<String> traversalRes = bst.traversal(type, steps);

        BSTStateDto state = collectionService.getBSTStateWithTraversal(traversalRes);
        Map<String, Object> details = new HashMap<>();
        details.put("traversalType", type);
        details.put("traversal", traversalRes);
        details.put("result", type.toUpperCase() + " Traversal = " + traversalRes);

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "TRAVERSAL_" + type.toUpperCase(), true, type,
                "O(n)", steps, state, state, details, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<BSTStateDto>> clear() {
        BSTStateDto prevState = collectionService.getBSTState();
        collectionService.resetBST();
        BSTStateDto newState = collectionService.getBSTState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all nodes from Binary Search Tree");

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "CLEAR", true, null,
                "O(1)", List.of("Cleared all nodes from Binary Search Tree."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
