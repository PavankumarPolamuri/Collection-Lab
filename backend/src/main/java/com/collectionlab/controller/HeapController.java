package com.collectionlab.controller;

import com.collectionlab.collections.CustomMinHeap;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.HeapStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/heap")
@CrossOrigin(origins = "*")
public class HeapController {

    private final CollectionService collectionService;

    public HeapController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<HeapStateDto> getState() {
        return ResponseEntity.ok(collectionService.getHeapState());
    }

    @PostMapping("/insert")
    public ResponseEntity<OperationResponse<HeapStateDto>> insert(@RequestBody OperationRequest request) {
        HeapStateDto prevState = collectionService.getHeapState();
        CustomMinHeap<String> heap = collectionService.getMinHeap();

        List<String> steps = new ArrayList<>();
        heap.insert(request.getValue(), steps);

        HeapStateDto newState = collectionService.getHeapState();
        Map<String, Object> details = new HashMap<>();
        details.put("insertedValue", request.getValue());
        details.put("minRoot", heap.peek());
        details.put("result", "Inserted '" + request.getValue() + "', Min Root = '" + heap.peek() + "'");

        OperationResponse<HeapStateDto> response = new OperationResponse<>(
                "HEAP", "INSERT", true, request.getValue(),
                "O(log n)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/extract-min")
    public ResponseEntity<OperationResponse<HeapStateDto>> extractMin() {
        HeapStateDto prevState = collectionService.getHeapState();
        CustomMinHeap<String> heap = collectionService.getMinHeap();

        List<String> steps = new ArrayList<>();
        String minVal = heap.extractMin(steps);

        HeapStateDto newState = collectionService.getHeapState();
        Map<String, Object> details = new HashMap<>();
        details.put("extractedMin", minVal);
        details.put("newMinRoot", heap.peek());
        details.put("result", minVal != null ? "Extracted Min Root '" + minVal + "'" : "Heap is empty");

        OperationResponse<HeapStateDto> response = new OperationResponse<>(
                "HEAP", "EXTRACT_MIN", minVal != null, minVal,
                "O(log n)", steps, prevState, newState, details, minVal == null ? "Heap is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<OperationResponse<HeapStateDto>> peek() {
        HeapStateDto state = collectionService.getHeapState();
        CustomMinHeap<String> heap = collectionService.getMinHeap();

        List<String> steps = new ArrayList<>();
        String minVal = heap.peek(steps);

        Map<String, Object> details = new HashMap<>();
        details.put("minRoot", minVal);
        details.put("result", minVal != null ? "Min Root = '" + minVal + "'" : "Heap is empty");

        OperationResponse<HeapStateDto> response = new OperationResponse<>(
                "HEAP", "PEEK", minVal != null, minVal,
                "O(1)", steps, state, state, details, minVal == null ? "Heap is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<HeapStateDto>> clear() {
        HeapStateDto prevState = collectionService.getHeapState();
        collectionService.resetMinHeap();
        HeapStateDto newState = collectionService.getHeapState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all elements from Min-Heap");

        OperationResponse<HeapStateDto> response = new OperationResponse<>(
                "HEAP", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from Min-Heap."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
