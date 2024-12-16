package io.github.collagid.core.api.chunk;

import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;

public class ChunkCreateEvent implements CollaGridEvent {
    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.CHUNK_CREATE;
    }
}
