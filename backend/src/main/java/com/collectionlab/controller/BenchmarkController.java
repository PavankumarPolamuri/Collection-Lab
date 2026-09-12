package com.collectionlab.controller;

import com.collectionlab.collections.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/benchmark")
@CrossOrigin(origins = "*")
public class BenchmarkController {

    public static class BenchmarkRequest {
        public String structure; // ARRAY_LIST, HASH_MAP, TREE_MAP, PRIORITY_QUEUE
        public String operation; // INSERT, ACCESS, SEARCH, DELETE
        public int elementCount; // 10000, 50000, 100000
    }

    @PostMapping("/run")
    public ResponseEntity<Map<String, Object>> runBenchmark(@RequestBody BenchmarkRequest request) {
        int count = Math.min(Math.max(request.elementCount, 1000), 100000);
        String structure = request.structure != null ? request.structure.toUpperCase() : "ARRAY_LIST";

        long customNs = 0;
        long jdkNs = 0;

        switch (structure) {
            case "ARRAY_LIST": {
                // Custom ArrayList
                long start = System.nanoTime();
                CustomArrayList<Integer> customList = new CustomArrayList<>(count);
                for (int i = 0; i < count; i++) {
                    customList.add(i);
                }
                customNs = System.nanoTime() - start;

                // JDK ArrayList (Educational comparison)
                start = System.nanoTime();
                java.util.ArrayList<Integer> jdkList = new java.util.ArrayList<>(count);
                for (int i = 0; i < count; i++) {
                    jdkList.add(i);
                }
                jdkNs = System.nanoTime() - start;
                break;
            }
            case "HASH_MAP": {
                long start = System.nanoTime();
                CustomHashMap<Integer, Integer> customMap = new CustomHashMap<>(count, 0.75f);
                for (int i = 0; i < count; i++) {
                    customMap.put(i, i * 2);
                }
                customNs = System.nanoTime() - start;

                start = System.nanoTime();
                java.util.HashMap<Integer, Integer> jdkMap = new java.util.HashMap<>(count);
                for (int i = 0; i < count; i++) {
                    jdkMap.put(i, i * 2);
                }
                jdkNs = System.nanoTime() - start;
                break;
            }
            case "TREE_MAP": {
                long start = System.nanoTime();
                CustomTreeMap<Integer, Integer> customTree = new CustomTreeMap<>();
                for (int i = 0; i < count; i++) {
                    customTree.put(i, i);
                }
                customNs = System.nanoTime() - start;

                start = System.nanoTime();
                java.util.TreeMap<Integer, Integer> jdkTree = new java.util.TreeMap<>();
                for (int i = 0; i < count; i++) {
                    jdkTree.put(i, i);
                }
                jdkNs = System.nanoTime() - start;
                break;
            }
            case "PRIORITY_QUEUE": {
                long start = System.nanoTime();
                CustomPriorityQueue<Integer> customPq = new CustomPriorityQueue<>(count);
                for (int i = 0; i < count; i++) {
                    customPq.offer(count - i);
                }
                customNs = System.nanoTime() - start;

                start = System.nanoTime();
                java.util.PriorityQueue<Integer> jdkPq = new java.util.PriorityQueue<>(count);
                for (int i = 0; i < count; i++) {
                    jdkPq.offer(count - i);
                }
                jdkNs = System.nanoTime() - start;
                break;
            }
            default:
                break;
        }

        double customMs = customNs / 1_000_000.0;
        double jdkMs = jdkNs / 1_000_000.0;

        Map<String, Object> response = new HashMap<>();
        response.put("structure", structure);
        response.put("operation", request.operation != null ? request.operation : "INSERT");
        response.put("elementCount", count);
        response.put("customTimeMs", Math.round(customMs * 1000.0) / 1000.0);
        response.put("jdkTimeMs", Math.round(jdkMs * 1000.0) / 1000.0);
        response.put("disclaimer", "Benchmark results depend on JVM, hardware, operating system, and runtime conditions.");

        return ResponseEntity.ok(response);
    }
}
