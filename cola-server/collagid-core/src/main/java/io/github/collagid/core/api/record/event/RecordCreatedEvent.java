package io.github.collagid.core.api.record.event;

import io.github.collagid.core.api.dtos.SnapshotDTO;
import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.dtos.RecordDTO;
import io.github.collagid.core.api.record.event.async.RecordCreatedEventAsync;
import io.github.collagid.core.api.utils.Asyncable;

public class RecordCreatedEvent implements CollaGridEvent, Asyncable {
    private RecordCreatedEventAsync async;
    private SnapshotDTO context;

    public RecordCreatedEvent(SnapshotDTO context, RecordDTO newRecord) {
        this.async = new RecordCreatedEventAsync(newRecord);
        if (context != null) {
            this.async.setDstId(context.getDstId());
        }
        this.context = context;
    }

    public SnapshotDTO getContext() {
        return context;
    }

    public void setContext(SnapshotDTO context) {
        this.context = context;
    }
    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.CREATE_RECORD;
    }

    @Override
    public RecordCreatedEventAsync async() {
        return this.async;
    }
}