package io.github.collagid.core.api.snapshot;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.snapshot.event.SnapshotCreateEvent;
import io.github.collagid.core.api.snapshot.event.SnapshotUpdateEvent;

public interface SnapshotUpdate extends CollaGridEventListener<SnapshotUpdateEvent> {

    void onSnapshotUpdate(SnapshotUpdateEvent event);

    @Override
    default void handle(SnapshotUpdateEvent event) {
        this.onSnapshotUpdate(event);
    }

    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.SNAPSHOT_UPDATE;
    }
}
