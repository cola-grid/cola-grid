package io.github.collagid.core.api.vos.op;

import java.util.List;

public class ChangesetVO {
    private String messageId;
    private int baseRevision;
    private String resourceId;
    private int resourceType;
    private List<OperationVO> operations;

    // Getters and Setters
    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public int getBaseRevision() {
        return baseRevision;
    }

    public void setBaseRevision(int baseRevision) {
        this.baseRevision = baseRevision;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public int getResourceType() {
        return resourceType;
    }

    public void setResourceType(int resourceType) {
        this.resourceType = resourceType;
    }

    public List<OperationVO> getOperations() {
        return operations;
    }

    public void setOperations(List<OperationVO> operations) {
        this.operations = operations;
    }
}
