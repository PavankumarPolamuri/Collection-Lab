package com.collectionlab.exception;

import com.collectionlab.dto.OperationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<OperationResponse<Object>> handleIndexOutOfBounds(IndexOutOfBoundsException ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: Index out of bounds"),
                null, null, null, ex.getMessage() != null ? ex.getMessage() : "Index out of bounds"
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<OperationResponse<Object>> handleIllegalArgument(IllegalArgumentException ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: Invalid argument"),
                null, null, null, ex.getMessage() != null ? ex.getMessage() : "Invalid argument"
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({CollectionException.class, java.util.NoSuchElementException.class})
    public ResponseEntity<OperationResponse<Object>> handleCollectionException(Exception ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: " + ex.getMessage()),
                null, null, null, ex.getMessage() != null ? ex.getMessage() : "Collection operation error"
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, Object>> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "HTTP method not supported: " + ex.getMessage());
        body.put("errorMessage", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNoHandlerFound(NoHandlerFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Endpoint not found: " + ex.getRequestURL());
        body.put("errorMessage", "Endpoint not found: " + ex.getRequestURL());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<OperationResponse<Object>> handleGeneralException(Exception ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("An unexpected server error occurred"),
                null, null, null, ex.getMessage() != null ? ex.getMessage() : "Internal server error"
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

