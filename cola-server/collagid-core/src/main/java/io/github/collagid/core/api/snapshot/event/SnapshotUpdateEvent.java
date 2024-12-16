package io.github.collagid.core.api.snapshot.event;

import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;

public class SnapshotUpdateEvent implements CollaGridEvent {
    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.SNAPSHOT_UPDATE;
    }
}
