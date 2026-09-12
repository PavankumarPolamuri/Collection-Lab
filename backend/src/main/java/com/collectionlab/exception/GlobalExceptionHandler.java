package com.collectionlab.exception;

import com.collectionlab.dto.OperationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<OperationResponse<Object>> handleIndexOutOfBounds(IndexOutOfBoundsException ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: Index out of bounds"),
                null, null, null, ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<OperationResponse<Object>> handleIllegalArgument(IllegalArgumentException ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: Invalid argument"),
                null, null, null, ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({CollectionException.class, java.util.NoSuchElementException.class})
    public ResponseEntity<OperationResponse<Object>> handleCollectionException(Exception ex) {
        OperationResponse<Object> response = new OperationResponse<>(
                "COLLECTION", "UNKNOWN", false, null, "O(1)",
                Collections.singletonList("Error: " + ex.getMessage()),
                null, null, null, ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
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
