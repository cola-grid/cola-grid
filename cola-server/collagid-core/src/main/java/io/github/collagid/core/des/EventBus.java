package io.github.collagid.core.des;

import io.github.collagid.core.cmd.TestCmd;
import io.github.collagid.core.exp.ColaOtException;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventBus {
    private LoaderCollection loaders;
    private SaverCollection savers;


    private final Map<EventType, List<EventListener<?>>> listeners = new HashMap<>();

    public EventBus(LoaderCollection loaders, SaverCollection savers) {
        this.loaders = loaders;
        this.savers = savers;
        this.subscribe(EventType.TEST, new TestCmd(loaders, savers));
    }

    public <T extends Event> void subscribe(EventType eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
    }

    // 发布事件
    public <T extends Event> void publish(T event, ColaContext context) {
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


    public LoaderCollection getLoaders() {
        return loaders;
    }

    public SaverCollection getSavers() {
        return savers;
    }
}

