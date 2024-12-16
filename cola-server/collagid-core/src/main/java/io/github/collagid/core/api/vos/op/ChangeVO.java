package io.github.collagid.core.api.vos.op;

import java.util.List;
import java.util.Map;

public class ChangeVO {
    private String type;
    private String roomId;
    private List<ChangesetVO> changesets;

    // Getters and Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public List<ChangesetVO> getChangesets() {
        return changesets;
    }

    public void setChangesets(List<ChangesetVO> changesets) {
        this.changesets = changesets;
    }
}






