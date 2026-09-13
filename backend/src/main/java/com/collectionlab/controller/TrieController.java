package com.collectionlab.controller;

import com.collectionlab.collections.CustomTrie;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.TrieStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/trie")
@CrossOrigin(origins = "*")
public class TrieController {

    private final CollectionService collectionService;

    public TrieController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<TrieStateDto> getState() {
        return ResponseEntity.ok(collectionService.getTrieState());
    }

    @PostMapping("/insert")
    public ResponseEntity<OperationResponse<TrieStateDto>> insert(@RequestBody OperationRequest request) {
        TrieStateDto prevState = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        trie.insert(request.getValue(), steps);

        TrieStateDto newState = collectionService.getTrieState();
        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "INSERT", true, request.getValue(),
                "O(L)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/search")
    public ResponseEntity<OperationResponse<TrieStateDto>> search(@RequestBody OperationRequest request) {
        TrieStateDto state = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        boolean found = trie.search(request.getValue(), steps);

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "SEARCH", found, request.getValue(),
                "O(L)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/starts-with")
    public ResponseEntity<OperationResponse<TrieStateDto>> startsWith(@RequestBody OperationRequest request) {
        TrieStateDto state = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        boolean exists = trie.startsWith(request.getValue(), steps);

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "STARTS_WITH", exists, request.getValue(),
                "O(L)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/delete")
    public ResponseEntity<OperationResponse<TrieStateDto>> delete(@RequestBody OperationRequest request) {
        TrieStateDto prevState = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        boolean deleted = trie.delete(request.getValue(), steps);

        TrieStateDto newState = collectionService.getTrieState();
        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "DELETE", deleted, request.getValue(),
                "O(L)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<TrieStateDto>> clear() {
        TrieStateDto prevState = collectionService.getTrieState();
        collectionService.resetTrie();
        TrieStateDto newState = collectionService.getTrieState();

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "CLEAR", true, null,
                "O(1)", List.of("Cleared all words from Trie."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
