package io.github.collagid.core.api.field;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.snapshot.event.SnapshotCreateEvent;

public interface FieldCreate extends CollaGridEventListener<FieldCreateEvent> {


    void onFieldCreated(FieldCreateEvent event);

    @Override
    default void handle(FieldCreateEvent event) {
        this.onFieldCreated(event);
    }


    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.FIELD_CREATED;
    }
}
