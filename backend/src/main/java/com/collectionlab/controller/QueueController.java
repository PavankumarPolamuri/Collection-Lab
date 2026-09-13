package com.collectionlab.controller;

import com.collectionlab.collections.CustomQueue;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.QueueStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "ENQUEUE", true, request.getValue(),
                "O(1)", steps, prevState, newState, null, null
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
        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "DEQUEUE", true, dequeued,
                "O(1)", steps, prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<OperationResponse<QueueStateDto>> peek() {
        QueueStateDto state = collectionService.getQueueState();
        CustomQueue<String> queue = collectionService.getQueue();

        List<String> steps = new ArrayList<>();
        String front = queue.peek(steps);

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "PEEK", true, front,
                "O(1)", steps, state, state, null, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<QueueStateDto>> clear() {
        QueueStateDto prevState = collectionService.getQueueState();
        collectionService.resetQueue();
        QueueStateDto newState = collectionService.getQueueState();

        OperationResponse<QueueStateDto> response = new OperationResponse<>(
                "QUEUE", "CLEAR", true, null,
                "O(1)", List.of("Cleared all elements from Queue."),
                prevState, newState, null, null
        );
        return ResponseEntity.ok(response);
    }
}
