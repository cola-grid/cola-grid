package io.github.collagid.core.op;

import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.List;

public class ChangesetVO {
    public ChangesetTypeVO type;
    public String roomId;
    public String messageId;
    public Long baseRevision;
    public Long newRevision;
    public ObjectNode extra;
    public String operationUserId;
    public List<OperationVO> ops;
}
