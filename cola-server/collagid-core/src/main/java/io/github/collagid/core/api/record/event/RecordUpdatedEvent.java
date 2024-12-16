package io.github.collagid.core.api.record.event;

import io.github.collagid.core.api.dtos.RecordDTO;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.record.event.async.RecordQueryEventAsync;

public class RecordUpdatedEvent extends RecordQueryEventAsync {
    private RecordDTO dto;

    public RecordUpdatedEvent(RecordDTO dto){
        super(dto);
    }

    public RecordDTO getDto() {
        return dto;
    }

    public void setDto(RecordDTO dto) {
        this.dto = dto;
    }

    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.UPDATE_RECORD;
    }
}