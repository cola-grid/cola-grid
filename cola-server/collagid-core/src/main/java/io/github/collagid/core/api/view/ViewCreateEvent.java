package io.github.collagid.core.api.view;

import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventType;

public class ViewCreateEvent implements CollaGridEvent {
    @Override
    public CollaGridEventType getType() {
        return CollaGridEventType.VIEW_CREATED;
    }
}
