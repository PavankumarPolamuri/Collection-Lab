package com.collectionlab.controller;

import com.collectionlab.collections.CustomQueue;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.QueueStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "*")
public class QueueController {

    private final CollectionService collectionService;

    public QueueController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<QueueStateDto> getState() {
        return ResponseEntity.ok(collectionService.getQueueState());
    }

    @PostMapping("/enqueue")
    public ResponseEntity<OperationResponse<QueueStateDto>> enqueue(@RequestBody OperationRequest request) {
        QueueStateDto prevState = collectionService.getQueueState();
        CustomQueue<String> queue = collectionService.getQueue();

        List<String> steps = new ArrayList<>();
        queue.enqueue(request.getValue(), steps);

        QueueStateDto newState = collectionService.getQueueState();
        Map<String, Object> details = new HashMap<>();
        details.put("enqueuedValue", request.getValue());
        details.put("frontValue", queue.peek());
        details.put("rearValue", queue.getRear());
        details.put("result", "Enqueued '" + request.getValue() + "' at REAR of Queue");

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "ENQUEUE", true, request.getValue(),
                "O(1)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dequeue")
    public ResponseEntity<OperationResponse<QueueStateDto>> dequeue() {
        QueueStateDto prevState = collectionService.getQueueState();
        CustomQueue<String> queue = collectionService.getQueue();

        List<String> steps = new ArrayList<>();
        String dequeued = queue.dequeue(steps);

        QueueStateDto newState = collectionService.getQueueState();
        Map<String, Object> details = new HashMap<>();
        details.put("dequeuedValue", dequeued);
        details.put("newFrontValue", queue.peek());
        details.put("result", dequeued != null ? "Dequeued '" + dequeued + "' from FRONT of Queue" : "Queue is empty");

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "DEQUEUE", dequeued != null, dequeued,
                "O(1)", steps, prevState, newState, details, dequeued == null ? "Queue is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<OperationResponse<QueueStateDto>> peek() {
        QueueStateDto state = collectionService.getQueueState();
        CustomQueue<String> queue = collectionService.getQueue();

        List<String> steps = new ArrayList<>();
        String front = queue.peek(steps);

        Map<String, Object> details = new HashMap<>();
        details.put("frontValue", front);
        details.put("result", front != null ? "FRONT Element = '" + front + "'" : "Queue is empty");

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "PEEK", front != null, front,
                "O(1)", steps, state, state, details, front == null ? "Queue is empty" : null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<QueueStateDto>> clear() {
        QueueStateDto prevState = collectionService.getQueueState();
        collectionService.resetQueue();
        QueueStateDto newState = collectionService.getQueueState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all elements from Queue");

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from Queue."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
