package com.collectionlab.controller;

import com.collectionlab.collections.CustomDisjointSet;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.DisjointSetStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/disjoint-set")
@CrossOrigin(origins = "*")
public class DisjointSetController {

    private final CollectionService collectionService;

    public DisjointSetController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<DisjointSetStateDto> getState() {
        return ResponseEntity.ok(collectionService.getDisjointSetState());
    }

    @PostMapping("/make-set")
    public ResponseEntity<OperationResponse<DisjointSetStateDto>> makeSet(@RequestBody OperationRequest request) {
        DisjointSetStateDto prevState = collectionService.getDisjointSetState();
        CustomDisjointSet ds = collectionService.getDisjointSet();

        List<String> steps = new ArrayList<>();
        boolean created = ds.makeSet(request.getValue(), steps);

        DisjointSetStateDto newState = collectionService.getDisjointSetState();
        OperationResponse<DisjointSetStateDto> response = new OperationResponse<>(
                "DISJOINT_SET", "MAKE_SET", created, request.getValue(),
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/find")
    public ResponseEntity<OperationResponse<DisjointSetStateDto>> find(@RequestBody OperationRequest request) {
        DisjointSetStateDto state = collectionService.getDisjointSetState();
        CustomDisjointSet ds = collectionService.getDisjointSet();

        List<String> steps = new ArrayList<>();
        String root = ds.find(request.getValue(), steps);

        DisjointSetStateDto newState = collectionService.getDisjointSetState();
        OperationResponse<DisjointSetStateDto> response = new OperationResponse<>(
                "DISJOINT_SET", "FIND", root != null, request.getValue(),
                "O(α(n)) amortized", steps, state, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/union")
    public ResponseEntity<OperationResponse<DisjointSetStateDto>> union(@RequestBody Map<String, String> body) {
        DisjointSetStateDto prevState = collectionService.getDisjointSetState();
        CustomDisjointSet ds = collectionService.getDisjointSet();

        String elemA = body.get("elementA");
        String elemB = body.get("elementB");

        List<String> steps = new ArrayList<>();
        boolean united = ds.union(elemA, elemB, steps);

        DisjointSetStateDto newState = collectionService.getDisjointSetState();
        OperationResponse<DisjointSetStateDto> response = new OperationResponse<>(
                "DISJOINT_SET", "UNION", united, Map.of("elementA", elemA != null ? elemA : "", "elementB", elemB != null ? elemB : ""),
                "O(α(n)) amortized", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/connected")
    public ResponseEntity<OperationResponse<DisjointSetStateDto>> connected(@RequestBody Map<String, String> body) {
        DisjointSetStateDto state = collectionService.getDisjointSetState();
        CustomDisjointSet ds = collectionService.getDisjointSet();

        String elemA = body.get("elementA");
        String elemB = body.get("elementB");

        List<String> steps = new ArrayList<>();
        boolean isConnected = ds.isConnected(elemA, elemB, steps);

        DisjointSetStateDto newState = collectionService.getDisjointSetState();
        OperationResponse<DisjointSetStateDto> response = new OperationResponse<>(
                "DISJOINT_SET", "CONNECTED", isConnected, Map.of("elementA", elemA != null ? elemA : "", "elementB", elemB != null ? elemB : ""),
                "O(α(n)) amortized", steps, state, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<DisjointSetStateDto>> clear() {
        DisjointSetStateDto prevState = collectionService.getDisjointSetState();
        collectionService.resetDisjointSet();
        DisjointSetStateDto newState = collectionService.getDisjointSetState();

        OperationResponse<DisjointSetStateDto> response = new OperationResponse<>(
                "DISJOINT_SET", "CLEAR", true, null,
                "O(1)", List.of("Cleared all sets from Disjoint Set."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
