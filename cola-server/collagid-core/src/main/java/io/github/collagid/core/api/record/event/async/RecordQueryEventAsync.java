package io.github.collagid.core.api.record.event.async;

import io.github.collagid.core.api.dtos.RecordDTO;
import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;

public class RecordQueryEventAsync implements CollaGridEvent {
    private RecordDTO dto;

    public RecordQueryEventAsync(RecordDTO dto){
        this.dto = dto;
    }

    public RecordDTO getDto() {
        return dto;
    }

    public void setDto(RecordDTO dto) {
        this.dto = dto;
    }

    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.QUERY_RECORD_ASYNC;
    }
}