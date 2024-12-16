package io.github.collagid.core.api.event;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CollaGridEventPublisher {
    private static final Logger logger = LoggerFactory.getLogger(CollaGridEventPublisher.class);

    public static void main(String[] args) {
        logger.info("gbhn");
    }
    private static final Map<CollaGridEventType, List<CollaGridEventListener<?>>> listenersMap = new ConcurrentHashMap<>();
    private static final ExecutorService executorService = Executors.newCachedThreadPool();

    public static <T extends CollaGridEvent> void register(CollaGridEventListener<T> listener) {
        if (listener == null || listener.getType() == null) {
            System.out.println("Listener or listener type is null, registration skipped.");
            return;
        }
        listenersMap.computeIfAbsent(listener.getType(), k -> new ArrayList<>()).add(listener);
        logger.info("Registered listener for event type: " + listener.getType());
    }

    public static <T extends CollaGridEvent> void publishEvent(T event) {
        if (event.getType().isAsync()) {
            logger.info("Event is async, publishEvent skipped: " + event.getType());
            return;
        }
        List<CollaGridEventListener<?>> listeners = listenersMap.get(event.getType());
        if (listeners != null) {
            for (CollaGridEventListener<?> listener : listeners) {
                notifyListener(listener, event);
            }
        } else {
            System.out.println("No listeners found for event type: " + event.getType());
        }
    }

    public static <T extends CollaGridEvent> void publishEventAsync(T event) {
        if (!event.getType().isAsync()) {
            System.out.println("Event is not async, publishEventAsync skipped: " + event.getType());
            return;
        }
        CompletableFuture.runAsync(() -> {
            List<CollaGridEventListener<?>> listeners = listenersMap.get(event.getType());
            if (listeners != null) {
                for (CollaGridEventListener<?> listener : listeners) {
                    notifyListener(listener, event);
                }
            } else {
                System.out.println("No listeners found for event type: " + event.getType());
            }
        }, executorService).exceptionally(ex -> {
            ex.printStackTrace();
            return null;
        });
    }

    private static <T extends CollaGridEvent> void notifyListener(CollaGridEventListener<?> rawListener, T event) {
        @SuppressWarnings("unchecked")
        CollaGridEventListener<T> listener = (CollaGridEventListener<T>) rawListener;
        listener.handle(event);
        logger.info("Notified listener for event type: " + event.getType());
    }
}

