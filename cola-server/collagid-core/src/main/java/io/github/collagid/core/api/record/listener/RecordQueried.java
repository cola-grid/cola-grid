package io.github.collagid.core.api.record.listener;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.record.event.RecordOption;
import io.github.collagid.core.api.record.event.RecordQueryEvent;
import io.github.collagid.core.api.record.event.async.RecordCreatedEventAsync;
import io.github.collagid.core.api.record.event.async.RecordQueryEventAsync;

public interface RecordQueried extends CollaGridEventListener<RecordQueryEvent> {

    void onRecordQueried(RecordQueryEvent option);

    @Override
    default void handle(RecordQueryEvent event) {
        System.out.println("xxxx " + event.getType());
        this.onRecordQueried(event);
    }

    @Override
    default CollaGridEventType getType(){
        return CollaGridEventType.QUERY_RECORD;
    }

    interface Async extends CollaGridEventListener<RecordQueryEventAsync>{
        void onRecordQueried(RecordQueryEventAsync event);

        @Override
        default CollaGridEventType getType(){
            return CollaGridEventType.QUERY_RECORD_ASYNC;
        }


        @Override
        default void handle(RecordQueryEventAsync event) {
            this.onRecordQueried(event);
        }
    }
}
