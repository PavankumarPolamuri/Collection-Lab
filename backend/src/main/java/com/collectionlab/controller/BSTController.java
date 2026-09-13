package com.collectionlab.controller;

import com.collectionlab.collections.CustomBST;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.BSTStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "INSERT", true, request.getValue(),
                "O(log n) avg / O(n) worst", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/search")
    public ResponseEntity<OperationResponse<BSTStateDto>> search(@RequestBody OperationRequest request) {
        BSTStateDto state = collectionService.getBSTState();
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        boolean found = bst.search(request.getValue(), steps);

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "SEARCH", found, request.getValue(),
                "O(log n) avg / O(n) worst", steps, state, state, null, null
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
        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "DELETE", true, key,
                "O(log n) avg / O(n) worst", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/traversal")
    public ResponseEntity<OperationResponse<BSTStateDto>> traversal(@RequestParam(defaultValue = "inorder") String type) {
        CustomBST<String> bst = collectionService.getBST();

        List<String> steps = new ArrayList<>();
        List<String> traversalRes = bst.traversal(type, steps);

        BSTStateDto state = collectionService.getBSTStateWithTraversal(traversalRes);
        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "TRAVERSAL_" + type.toUpperCase(), true, type,
                "O(n)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<BSTStateDto>> clear() {
        BSTStateDto prevState = collectionService.getBSTState();
        collectionService.resetBST();
        BSTStateDto newState = collectionService.getBSTState();

        OperationResponse<BSTStateDto> response = new OperationResponse<>(
                "BST", "CLEAR", true, null,
                "O(1)", List.of("Cleared all nodes from Binary Search Tree."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
