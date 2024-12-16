package io.github.collagid.core.api.event;

import io.github.collagid.core.api.record.event.RecordCreatedEvent;

public interface CollaGridEventListener<T extends CollaGridEvent>  {
    void handle(T event);

    CollaGridEventType getType();
}
