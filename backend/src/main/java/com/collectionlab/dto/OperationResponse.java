package com.collectionlab.dto;

import java.util.List;
import java.util.Map;

public class OperationResponse<S> {

    private String structure;
    private String operation;
    private boolean success;
    private Object input;
    private String complexity;
    private List<String> steps;
    private S previousState;
    private S newState;
    private Map<String, Object> internalDetails;
    private String errorMessage;

    public OperationResponse() {}

    public OperationResponse(String structure, String operation, boolean success, Object input,
                             String complexity, List<String> steps, S previousState, S newState,
                             Map<String, Object> internalDetails, String errorMessage) {
        this.structure = structure;
        this.operation = operation;
        this.success = success;
        this.input = input;
        this.complexity = complexity;
        this.steps = steps;
        this.previousState = previousState;
        this.newState = newState;
        this.internalDetails = internalDetails;
        this.errorMessage = errorMessage;
    }

    public String getStructure() { return structure; }
    public void setStructure(String structure) { this.structure = structure; }

    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public Object getInput() { return input; }
    public void setInput(Object input) { this.input = input; }

    public String getComplexity() { return complexity; }
    public void setComplexity(String complexity) { this.complexity = complexity; }

    public List<String> getSteps() { return steps; }
    public void setSteps(List<String> steps) { this.steps = steps; }

    public S getPreviousState() { return previousState; }
    public void setPreviousState(S previousState) { this.previousState = previousState; }

    public S getNewState() { return newState; }
    public void setNewState(S newState) { this.newState = newState; }

    public Map<String, Object> getInternalDetails() { return internalDetails; }
    public void setInternalDetails(Map<String, Object> internalDetails) { this.internalDetails = internalDetails; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}
