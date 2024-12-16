package io.github.collagid.core.event;

import io.github.collagid.core.des.Event;
import io.github.collagid.core.des.EventType;
import io.github.collagid.core.op.OperationVO;

public class TestEvent extends Event {

    public TestEvent(EventType eventType, OperationVO op) {
        super(eventType, op);
    }
}
