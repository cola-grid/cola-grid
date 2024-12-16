package io.github.collagid.core.api.chunk;

import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.view.ViewCreateEvent;

public interface ChunkCreate extends CollaGridEventListener<ChunkCreateEvent> {


    void onSnapshotCreated(ChunkCreateEvent event);

    @Override
    default void handle(ChunkCreateEvent event) {
        this.onSnapshotCreated(event);
    }


    @Override
    default CollaGridEventType getType() {
        return CollaGridEventType.CHUNK_CREATE;
    }
}
