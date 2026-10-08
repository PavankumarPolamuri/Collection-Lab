package com.collectionlab.controller;

import com.collectionlab.collections.CustomTrie;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.TrieStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Map<String, Object> details = new HashMap<>();
        details.put("word", request.getValue());
        details.put("result", "Inserted word '" + request.getValue() + "' into Trie");

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "INSERT", true, request.getValue(),
                "O(L)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/search")
    public ResponseEntity<OperationResponse<TrieStateDto>> search(@RequestBody OperationRequest request) {
        TrieStateDto state = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        boolean found = trie.search(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("word", request.getValue());
        details.put("found", found);
        details.put("result", found ? "Word '" + request.getValue() + "' EXISTS in Trie" : "Word '" + request.getValue() + "' NOT FOUND in Trie");

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "SEARCH", found, request.getValue(),
                "O(L)", steps, state, state, details, found ? null : "Word '" + request.getValue() + "' not found"
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/starts-with")
    public ResponseEntity<OperationResponse<TrieStateDto>> startsWith(@RequestBody OperationRequest request) {
        TrieStateDto state = collectionService.getTrieState();
        CustomTrie trie = collectionService.getTrie();

        List<String> steps = new ArrayList<>();
        boolean exists = trie.startsWith(request.getValue(), steps);

        Map<String, Object> details = new HashMap<>();
        details.put("prefix", request.getValue());
        details.put("exists", exists);
        details.put("result", exists ? "Prefix '" + request.getValue() + "' MATCHES words in Trie" : "No words match prefix '" + request.getValue() + "'");

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "STARTS_WITH", exists, request.getValue(),
                "O(L)", steps, state, state, details, exists ? null : "Prefix '" + request.getValue() + "' not found"
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
        Map<String, Object> details = new HashMap<>();
        details.put("word", request.getValue());
        details.put("deleted", deleted);
        details.put("result", deleted ? "Deleted word '" + request.getValue() + "' from Trie" : "Word '" + request.getValue() + "' NOT FOUND to delete");

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "DELETE", deleted, request.getValue(),
                "O(L)", steps, prevState, newState, details, deleted ? null : "Word '" + request.getValue() + "' not found to delete"
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<TrieStateDto>> clear() {
        TrieStateDto prevState = collectionService.getTrieState();
        collectionService.resetTrie();
        TrieStateDto newState = collectionService.getTrieState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all words from Trie");

        OperationResponse<TrieStateDto> response = new OperationResponse<>(
                "TRIE", "CLEAR", true, null,
                "O(1)", List.of("Cleared all words from Trie."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
