package com.collectionlab.controller;

import com.collectionlab.collections.CustomDeque;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.DequeStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deque")
@CrossOrigin(origins = "*")
public class DequeController {

    private final CollectionService collectionService;

    public DequeController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<DequeStateDto> getState() {
        return ResponseEntity.ok(collectionService.getDequeState());
    }

    @PostMapping("/add-first")
    public ResponseEntity<OperationResponse<DequeStateDto>> addFirst(@RequestBody OperationRequest request) {
        DequeStateDto prevState = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        deque.addFirst(request.getValue(), steps);

        DequeStateDto newState = collectionService.getDequeState();
        Map<String, Object> details = new HashMap<>();
        details.put("addedValue", request.getValue());
        details.put("position", "FIRST");
        details.put("result", "Added '" + request.getValue() + "' to FRONT of Deque");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "ADD_FIRST", true, request.getValue(),
                "O(1)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-last")
    public ResponseEntity<OperationResponse<DequeStateDto>> addLast(@RequestBody OperationRequest request) {
        DequeStateDto prevState = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        deque.addLast(request.getValue(), steps);

        DequeStateDto newState = collectionService.getDequeState();
        Map<String, Object> details = new HashMap<>();
        details.put("addedValue", request.getValue());
        details.put("position", "LAST");
        details.put("result", "Added '" + request.getValue() + "' to REAR of Deque");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "ADD_LAST", true, request.getValue(),
                "O(1)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/first")
    public ResponseEntity<OperationResponse<DequeStateDto>> removeFirst() {
        DequeStateDto prevState = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        String val = deque.removeFirst(steps);

        DequeStateDto newState = collectionService.getDequeState();
        Map<String, Object> details = new HashMap<>();
        details.put("removedValue", val);
        details.put("position", "FIRST");
        details.put("result", val != null ? "Removed FRONT element '" + val + "'" : "Deque is empty");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "REMOVE_FIRST", val != null, val,
                "O(1)", steps, prevState, newState, details, val == null ? "Deque is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/last")
    public ResponseEntity<OperationResponse<DequeStateDto>> removeLast() {
        DequeStateDto prevState = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        String val = deque.removeLast(steps);

        DequeStateDto newState = collectionService.getDequeState();
        Map<String, Object> details = new HashMap<>();
        details.put("removedValue", val);
        details.put("position", "LAST");
        details.put("result", val != null ? "Removed REAR element '" + val + "'" : "Deque is empty");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "REMOVE_LAST", val != null, val,
                "O(1)", steps, prevState, newState, details, val == null ? "Deque is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek-first")
    public ResponseEntity<OperationResponse<DequeStateDto>> peekFirst() {
        DequeStateDto state = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        String val = deque.peekFirst(steps);

        Map<String, Object> details = new HashMap<>();
        details.put("firstValue", val);
        details.put("result", val != null ? "FRONT Element = '" + val + "'" : "Deque is empty");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "PEEK_FIRST", val != null, val,
                "O(1)", steps, state, state, details, val == null ? "Deque is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek-last")
    public ResponseEntity<OperationResponse<DequeStateDto>> peekLast() {
        DequeStateDto state = collectionService.getDequeState();
        CustomDeque<String> deque = collectionService.getDeque();

        List<String> steps = new ArrayList<>();
        String val = deque.peekLast(steps);

        Map<String, Object> details = new HashMap<>();
        details.put("lastValue", val);
        details.put("result", val != null ? "REAR Element = '" + val + "'" : "Deque is empty");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "PEEK_LAST", val != null, val,
                "O(1)", steps, state, state, details, val == null ? "Deque is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<DequeStateDto>> clear() {
        DequeStateDto prevState = collectionService.getDequeState();
        collectionService.resetDeque();
        DequeStateDto newState = collectionService.getDequeState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all elements from Deque");

        OperationResponse<DequeStateDto> response = new OperationResponse<>(
                "DEQUE", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from Deque."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
