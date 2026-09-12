package com.collectionlab.controller;

import com.collectionlab.collections.CustomPriorityQueue;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.PriorityQueueStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/priorityqueue")
@CrossOrigin(origins = "*")
public class PriorityQueueController {

    private final CollectionService collectionService;

    public PriorityQueueController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/state")
    public ResponseEntity<PriorityQueueStateDto> getState() {
        return ResponseEntity.ok(collectionService.getPriorityQueueState());
    }

    @PostMapping("/offer")
    public ResponseEntity<OperationResponse<PriorityQueueStateDto>> offer(@RequestBody OperationRequest request) {
        PriorityQueueStateDto prevState = collectionService.getPriorityQueueState();
        CustomPriorityQueue<String> pq = collectionService.getPriorityQueue();

        List<String> steps = new ArrayList<>();
        pq.offer(request.getValue(), steps);

        PriorityQueueStateDto newState = collectionService.getPriorityQueueState();

        Map<String, Object> details = new HashMap<>();
        details.put("offeredValue", request.getValue());
        details.put("newRoot", pq.peek());

        OperationResponse<PriorityQueueStateDto> response = new OperationResponse<>(
                "PRIORITY_QUEUE", "OFFER", true, request.getValue(),
                "O(log n)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<OperationResponse<PriorityQueueStateDto>> peek() {
        PriorityQueueStateDto state = collectionService.getPriorityQueueState();
        CustomPriorityQueue<String> pq = collectionService.getPriorityQueue();

        List<String> steps = new ArrayList<>();
        String peekVal = pq.peek(steps);

        OperationResponse<PriorityQueueStateDto> response = new OperationResponse<>(
                "PRIORITY_QUEUE", "PEEK", peekVal != null, null,
                "O(1)", steps, state, state, Map.of("peekValue", peekVal != null ? peekVal : "null"), peekVal == null ? "Queue is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/poll")
    public ResponseEntity<OperationResponse<PriorityQueueStateDto>> poll() {
        PriorityQueueStateDto prevState = collectionService.getPriorityQueueState();
        CustomPriorityQueue<String> pq = collectionService.getPriorityQueue();

        List<String> steps = new ArrayList<>();
        String polledVal = pq.poll(steps);

        PriorityQueueStateDto newState = collectionService.getPriorityQueueState();

        Map<String, Object> details = new HashMap<>();
        details.put("polledValue", polledVal);
        details.put("newRoot", pq.peek());

        OperationResponse<PriorityQueueStateDto> response = new OperationResponse<>(
                "PRIORITY_QUEUE", "POLL", polledVal != null, null,
                "O(log n)", steps, prevState, newState, details, polledVal == null ? "Queue is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<PriorityQueueStateDto>> clear() {
        PriorityQueueStateDto prevState = collectionService.getPriorityQueueState();
        collectionService.resetPriorityQueue();
        PriorityQueueStateDto newState = collectionService.getPriorityQueueState();

        OperationResponse<PriorityQueueStateDto> response = new OperationResponse<>(
                "PRIORITY_QUEUE", "CLEAR", true, null,
                "O(1)", List.of("Reset heap array"),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
