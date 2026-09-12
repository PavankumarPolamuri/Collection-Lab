package com.collectionlab.util;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class SourceCodeReader {

    public String readCollectionSourceCode(String collectionName) {
        String filename = "Custom" + collectionName + ".java";
        Path primaryPath = Paths.get("src/main/java/com/collectionlab/collections/" + filename);

        if (Files.exists(primaryPath)) {
            try {
                return Files.readString(primaryPath);
            } catch (IOException e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        // Search relative to current working dir or fallback
        Path fallbackPath = Paths.get("backend/src/main/java/com/collectionlab/collections/" + filename);
        if (Files.exists(fallbackPath)) {
            try {
                return Files.readString(fallbackPath);
            } catch (IOException e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        return "// Source file " + filename + " not found.";
    }
}
