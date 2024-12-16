package io.github.collagid.core.api.dtos;


import io.github.collagid.core.api.field.FieldDTO;

public class SnapshotDTO {
    private String dstId;

    public String getDstId() {
        return dstId;
    }

    public void setDstId(String dstId) {
        this.dstId = dstId;
    }

    public void addField(FieldDTO fieldDTO) {
    }

    public void addRecord(RecordDTO recordDTO) {
    }
}
