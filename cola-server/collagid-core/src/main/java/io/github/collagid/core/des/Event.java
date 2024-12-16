package io.github.collagid.core.des;

// 事件基类，所有事件都继承它
public abstract class Event {
    private final EventType eventType;

    public Event(EventType eventType) {
        this.eventType = eventType;
    }

    public EventType getEventType() {
        return eventType;
    }
}

