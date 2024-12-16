package io.github.collagid.core.api.view;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.snapshot.event.SnapshotCreateEvent;

public interface ViewCreate extends CollaGridEventListener<ViewCreateEvent> {


    void onSnapshotCreated(ViewCreateEvent event);

    @Override
    default void handle(ViewCreateEvent event) {
        this.onSnapshotCreated(event);
    }


    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.VIEW_CREATED;
    }
}
