package com.collectionlab.controller;

import com.collectionlab.collections.CustomStack;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.StackStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/stack")
@CrossOrigin(origins = "*")
public class StackController {

    private final CollectionService collectionService;

    public StackController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<StackStateDto> getState() {
        return ResponseEntity.ok(collectionService.getStackState());
    }

    @PostMapping("/push")
    public ResponseEntity<OperationResponse<StackStateDto>> push(@RequestBody OperationRequest request) {
        StackStateDto prevState = collectionService.getStackState();
        CustomStack<String> stack = collectionService.getStack();

        List<String> steps = new ArrayList<>();
        stack.push(request.getValue(), steps);

        StackStateDto newState = collectionService.getStackState();
        OperationResponse<StackStateDto> response = new OperationResponse<>(
                "STACK", "PUSH", true, request.getValue(),
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/pop")
    public ResponseEntity<OperationResponse<StackStateDto>> pop() {
        StackStateDto prevState = collectionService.getStackState();
        CustomStack<String> stack = collectionService.getStack();

        List<String> steps = new ArrayList<>();
        String popped = stack.pop(steps);

        StackStateDto newState = collectionService.getStackState();
        OperationResponse<StackStateDto> response = new OperationResponse<>(
                "STACK", "POP", true, popped,
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<OperationResponse<StackStateDto>> peek() {
        StackStateDto state = collectionService.getStackState();
        CustomStack<String> stack = collectionService.getStack();

        List<String> steps = new ArrayList<>();
        String top = stack.peek(steps);

        OperationResponse<StackStateDto> response = new OperationResponse<>(
                "STACK", "PEEK", true, top,
                "O(1)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<StackStateDto>> clear() {
        StackStateDto prevState = collectionService.getStackState();
        collectionService.resetStack();
        StackStateDto newState = collectionService.getStackState();

        OperationResponse<StackStateDto> response = new OperationResponse<>(
                "STACK", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from Stack."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
