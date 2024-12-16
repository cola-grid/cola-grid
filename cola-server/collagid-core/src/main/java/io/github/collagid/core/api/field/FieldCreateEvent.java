package io.github.collagid.core.api.field;

import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;

public class FieldCreateEvent implements CollaGridEvent {
    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.FIELD_CREATED;
    }
}
