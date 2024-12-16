package io.github.collagid.core.api.record.event.async;

import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.dtos.RecordDTO;

public class RecordCreatedEventAsync implements CollaGridEvent {
    private RecordDTO newRecord;

    private String dstId;

    public RecordCreatedEventAsync(RecordDTO newRecord) {
        this.newRecord = newRecord;
    }
    

    public RecordDTO getNewRecord() {
        return newRecord;
    }

    public void setNewRecord(RecordDTO newRecord) {
        this.newRecord = newRecord;
    }

    public String getDstId() {
        return dstId;
    }

    public void setDstId(String dstId) {
        this.dstId = dstId;
    }

    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.CREATE_RECORD_ASYNC;
    }
}