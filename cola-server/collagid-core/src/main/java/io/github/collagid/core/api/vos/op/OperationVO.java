package io.github.collagid.core.api.vos.op;

import java.util.List;

public class OperationVO {
    private OperationCmd cmd;
    private List<ActionVO> actions;

    // Getters and Setters
    public OperationCmd getCmd() {
        return cmd;
    }

    public void setCmd(OperationCmd cmd) {
        this.cmd = cmd;
    }

    public List<ActionVO> getActions() {
        return actions;
    }

    public void setActions(List<ActionVO> actions) {
        this.actions = actions;
    }
}