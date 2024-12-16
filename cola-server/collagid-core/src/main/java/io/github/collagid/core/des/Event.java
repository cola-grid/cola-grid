package io.github.collagid.core.des;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.collagid.core.op.OperationVO;

// 事件基类，所有事件都继承它
@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class Event {
    private final EventType eventType;
    private final OperationVO op;

    public Event(EventType eventType, OperationVO op) {
        this.op = op;
        this.eventType = eventType;
    }

    public EventType getEventType() {
        return eventType;
    }

    public OperationVO getOp() {
        return op;
    }
}

