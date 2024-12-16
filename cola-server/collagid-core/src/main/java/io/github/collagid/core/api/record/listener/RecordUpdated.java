package io.github.collagid.core.api.record.listener;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.record.event.RecordOption;
import io.github.collagid.core.api.record.event.RecordQueryEvent;
import io.github.collagid.core.api.record.event.RecordUpdatedEvent;

public interface RecordUpdated extends CollaGridEventListener<RecordUpdatedEvent> {


    void onRecordQueried(RecordUpdatedEvent event);

    @Override
    default void handle(RecordUpdatedEvent event) {
        this.onRecordQueried(event);
    }

    @Override
    default CollaGridEventType getType(){
        return CollaGridEventType.UPDATE_RECORD;
    }

}
