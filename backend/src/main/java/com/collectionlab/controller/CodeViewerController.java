package com.collectionlab.controller;

import com.collectionlab.util.SourceCodeReader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/code")
@CrossOrigin(origins = "*")
public class CodeViewerController {

    private final SourceCodeReader sourceCodeReader;

    public CodeViewerController(SourceCodeReader sourceCodeReader) {
        this.sourceCodeReader = sourceCodeReader;
    }

    @GetMapping("/{collectionName}")
    public ResponseEntity<Map<String, String>> getSourceCode(@PathVariable String collectionName) {
        String sanitized = collectionName.replaceAll("[^a-zA-Z]", "");
        String canonicalName = sourceCodeReader.getCanonicalCollectionName(sanitized);
        String sourceCode = sourceCodeReader.readCollectionSourceCode(canonicalName);
        return ResponseEntity.ok(Map.of(
                "collection", canonicalName,
                "className", "Custom" + canonicalName + ".java",
                "code", sourceCode
        ));
    }
}
