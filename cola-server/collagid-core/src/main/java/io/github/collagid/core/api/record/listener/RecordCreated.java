package io.github.collagid.core.api.record.listener;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.record.event.RecordCreatedEvent;
import io.github.collagid.core.api.record.event.async.RecordCreatedEventAsync;

public interface RecordCreated extends CollaGridEventListener<RecordCreatedEvent> {

    void onRecordCreated(RecordCreatedEvent event);

    @Override
    default void handle(RecordCreatedEvent event) {
        System.out.println("xxxx");
        this.onRecordCreated(event);
    }

    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.CREATE_RECORD;
    }

    interface Async extends CollaGridEventListener<RecordCreatedEventAsync>{
        void onRecordCreated(RecordCreatedEventAsync event);

        @Override
        default void handle(RecordCreatedEventAsync event) {
            System.out.println("xxxx2");
            this.onRecordCreated(event);
        }
    }
}
