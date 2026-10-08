package com.collectionlab.controller;

import com.collectionlab.collections.CustomGraph;
import com.collectionlab.dto.OperationRequest;
import com.collectionlab.dto.OperationResponse;
import com.collectionlab.dto.state.GraphStateDto;
import com.collectionlab.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final CollectionService collectionService;

    public GraphController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public ResponseEntity<GraphStateDto> getState() {
        return ResponseEntity.ok(collectionService.getGraphState());
    }

    @PostMapping("/add-vertex")
    public ResponseEntity<OperationResponse<GraphStateDto>> addVertex(@RequestBody OperationRequest request) {
        GraphStateDto prevState = collectionService.getGraphState();
        CustomGraph graph = collectionService.getGraph();

        List<String> steps = new ArrayList<>();
        boolean added = graph.addVertex(request.getValue(), steps);

        GraphStateDto newState = collectionService.getGraphState();
        Map<String, Object> details = new HashMap<>();
        details.put("vertex", request.getValue());
        details.put("added", added);
        details.put("result", added ? "Added vertex '" + request.getValue() + "'" : "Vertex '" + request.getValue() + "' already exists");

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "ADD_VERTEX", added, request.getValue(),
                "O(1)", steps, prevState, newState, details, added ? null : "Vertex '" + request.getValue() + "' already exists"
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-edge")
    public ResponseEntity<OperationResponse<GraphStateDto>> addEdge(@RequestBody Map<String, String> body) {
        GraphStateDto prevState = collectionService.getGraphState();
        CustomGraph graph = collectionService.getGraph();

        String from = body.get("from");
        String to = body.get("to");

        List<String> steps = new ArrayList<>();
        boolean added = graph.addEdge(from, to, steps);

        GraphStateDto newState = collectionService.getGraphState();
        Map<String, Object> details = new HashMap<>();
        details.put("from", from);
        details.put("to", to);
        details.put("added", added);
        details.put("result", added ? "Connected edge ('" + from + "' <-> '" + to + "')" : "Edge creation failed");

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "ADD_EDGE", added, Map.of("from", from != null ? from : "", "to", to != null ? to : ""),
                "O(1)", steps, prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/remove-edge")
    public ResponseEntity<OperationResponse<GraphStateDto>> removeEdge(@RequestBody Map<String, String> body) {
        GraphStateDto prevState = collectionService.getGraphState();
        CustomGraph graph = collectionService.getGraph();

        String from = body.get("from");
        String to = body.get("to");

        List<String> steps = new ArrayList<>();
        boolean removed = graph.removeEdge(from, to, steps);

        GraphStateDto newState = collectionService.getGraphState();
        Map<String, Object> details = new HashMap<>();
        details.put("from", from);
        details.put("to", to);
        details.put("removed", removed);
        details.put("result", removed ? "Removed edge ('" + from + "' <-> '" + to + "')" : "Edge ('" + from + "' <-> '" + to + "') not found");

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "REMOVE_EDGE", removed, Map.of("from", from != null ? from : "", "to", to != null ? to : ""),
                "O(V)", steps, prevState, newState, details, removed ? null : "Edge not found"
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/vertex/{label}")
    public ResponseEntity<OperationResponse<GraphStateDto>> removeVertex(@PathVariable String label) {
        GraphStateDto prevState = collectionService.getGraphState();
        CustomGraph graph = collectionService.getGraph();

        List<String> steps = new ArrayList<>();
        boolean removed = graph.removeVertex(label, steps);

        GraphStateDto newState = collectionService.getGraphState();
        Map<String, Object> details = new HashMap<>();
        details.put("vertex", label);
        details.put("removed", removed);
        details.put("result", removed ? "Removed vertex '" + label + "' and connected edges" : "Vertex '" + label + "' not found");

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "REMOVE_VERTEX", removed, label,
                "O(V + E)", steps, prevState, newState, details, removed ? null : "Vertex not found"
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/bfs")
    public ResponseEntity<OperationResponse<GraphStateDto>> bfs(@RequestParam(required = false) String start) {
        CustomGraph graph = collectionService.getGraph();

        List<String> steps = new ArrayList<>();
        List<String> traversal = graph.bfs(start, steps);

        GraphStateDto state = collectionService.getGraphStateWithTraversal(traversal);
        Map<String, Object> details = new HashMap<>();
        details.put("startVertex", start != null ? start : (traversal.isEmpty() ? "None" : traversal.get(0)));
        details.put("traversal", traversal);
        details.put("result", "BFS Traversal = " + traversal);

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "BFS", true, start,
                "O(V + E)", steps, state, state, details, null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dfs")
    public ResponseEntity<OperationResponse<GraphStateDto>> dfs(@RequestParam(required = false) String start) {
        CustomGraph graph = collectionService.getGraph();

        List<String> steps = new ArrayList<>();
        List<String> traversal = graph.dfs(start, steps);

        GraphStateDto state = collectionService.getGraphStateWithTraversal(traversal);
        Map<String, Object> details = new HashMap<>();
        details.put("startVertex", start != null ? start : (traversal.isEmpty() ? "None" : traversal.get(0)));
        details.put("traversal", traversal);
        details.put("result", "DFS Traversal = " + traversal);

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "DFS", true, start,
                "O(V + E)", steps, state, state, details, null
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<OperationResponse<GraphStateDto>> clear() {
        GraphStateDto prevState = collectionService.getGraphState();
        collectionService.resetGraph();
        GraphStateDto newState = collectionService.getGraphState();

        Map<String, Object> details = new HashMap<>();
        details.put("result", "Cleared all vertices and edges from Graph");

        OperationResponse<GraphStateDto> response = new OperationResponse<>(
                "GRAPH", "CLEAR", true, null,
                "O(1)", List.of("Cleared all vertices and edges from Graph."),
                prevState, newState, details, null
        );
        return ResponseEntity.ok(response);
    }
}
