package io.github.collagid.core.api.snapshot;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.snapshot.event.SnapshotCreateEvent;

public interface SnapshotCreate extends CollaGridEventListener<SnapshotCreateEvent> {


    void onSnapshotCreated(SnapshotCreateEvent event);

    @Override
    default void handle(SnapshotCreateEvent event) {
        this.onSnapshotCreated(event);
    }


    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.SNAPSHOT_CREATE;
    }
}
