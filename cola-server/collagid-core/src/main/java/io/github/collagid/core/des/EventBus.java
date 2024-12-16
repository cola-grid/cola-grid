package io.github.collagid.core.des;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 事件总线：按 EventType 进行监听和发布
public class EventBus {
    private static final EventBus INSTANCE = new EventBus();

    // 使用 EventType 作为 key，监听器列表作为 value
    private final Map<EventType, List<EventListener<?>>> listeners = new HashMap<>();

    private EventBus() {}

    public static EventBus getInstance() {
        return INSTANCE;
    }

    // 订阅具体事件类型
    public <T extends Event> void subscribe(EventType eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
    }

    // 发布事件
    public <T extends Event> void publish(T event) {
        EventType eventType = event.getEventType();
        List<EventListener<?>> registeredListeners = listeners.get(eventType);

        if (registeredListeners != null) {
            for (EventListener<?> listener : registeredListeners) {
                @SuppressWarnings("unchecked")
                EventListener<T> specificListener = (EventListener<T>) listener;
                specificListener.onEvent(event);
            }
        }
    }
}

