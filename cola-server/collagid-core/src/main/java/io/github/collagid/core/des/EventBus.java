package io.github.collagid.core.des;

import io.github.collagid.core.exp.ColaOtException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventBus {

    private final Map<EventType, List<EventListener<?>>> listeners = new HashMap<>();

    public EventBus() {}

    public <T extends Event> void subscribe(EventType eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
    }

    // 发布事件
    public <T extends Event> void publish(T event) {
        EventType eventType = event.getEventType();
        List<EventListener<?>> registeredListeners = listeners.get(eventType);

        if (registeredListeners != null && !registeredListeners.isEmpty()) {
            for (EventListener<?> listener : registeredListeners) {
                @SuppressWarnings("unchecked")
                EventListener<T> specificListener = (EventListener<T>) listener;
                specificListener.onEvent(event);
            }
        } else {
            throw new ColaOtException("No listener registered for " + eventType);
        }
    }
}

