package com.collectionlab.util;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class SourceCodeReader {

    public String readCollectionSourceCode(String collectionName) {
        String filename = "Custom" + collectionName + ".java";

        // 1. Try loading from Classpath Resource (Bundled in JAR in production/Render)
        try {
            ClassPathResource resource = new ClassPathResource("code/" + filename);
            if (resource.exists()) {
                try (InputStream is = resource.getInputStream()) {
                    return new String(is.readAllBytes(), StandardCharsets.UTF_8);
                }
            }
        } catch (Exception ignored) {
        }

        // 2. Try loading from ClassLoader directly
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("code/" + filename)) {
            if (is != null) {
                return new String(is.readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (Exception ignored) {
        }

        // 3. Fallback to local filesystem paths (for local development)
        Path primaryPath = Paths.get("src/main/java/com/collectionlab/collections/" + filename);
        if (Files.exists(primaryPath)) {
            try {
                return Files.readString(primaryPath);
            } catch (Exception e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        Path fallbackPath = Paths.get("backend/src/main/java/com/collectionlab/collections/" + filename);
        if (Files.exists(fallbackPath)) {
            try {
                return Files.readString(fallbackPath);
            } catch (Exception e) {
                return "// Error reading source file: " + e.getMessage();
            }
        }

        return "// Source file " + filename + " not found.";
    }
}
