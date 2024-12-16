package io.github.collagid.core.api.event;

import io.github.collagid.core.api.dtos.RecordDTO;
import io.github.collagid.core.api.dtos.SnapshotDTO;
import io.github.collagid.core.api.io.RandomDataLoader;
import io.github.collagid.core.api.record.event.RecordCreatedEvent;
import io.github.collagid.core.api.record.event.async.RecordCreatedEventAsync;
import io.github.collagid.core.api.record.listener.RecordCreated;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CollaGridEventPublisherTest {

    private RecordCreatedEvent event;

    @BeforeEach
    public void setUp() {
        SnapshotDTO snapshotDTO = new RandomDataLoader().loadSnapshot("x");
        RecordDTO newRecord = new RecordDTO();
        newRecord.setId("a");
        event = new RecordCreatedEvent(snapshotDTO, newRecord);
    }

    @Test
    public void testAddListenerAndPublishEvent() {
        AtomicBoolean eventHandled = new AtomicBoolean(false);

        CollaGridEventListener<RecordCreatedEvent> customListener = new RecordCreated() {
            @Override
            public CollaGridEventType getType() {
                return CollaGridEventType.CREATE_RECORD;
            }

            @Override
            public void onRecordCreated(RecordCreatedEvent event) {
                eventHandled.set(true);
            }
        };

        CollaGridEventPublisher.register(customListener);
        CollaGridEventPublisher.publishEvent(event);

        assertTrue(eventHandled.get(), "The event should have been handled by the listener");
    }

    @Test
    public void testAddListenerAndPublishEventAsync() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicBoolean eventHandled = new AtomicBoolean(false);

        CollaGridEventListener<RecordCreatedEventAsync> customListener = new RecordCreated.Async() {
            @Override
            public CollaGridEventType getType() {
                return CollaGridEventType.CREATE_RECORD_ASYNC;
            }

            @Override
            public void onRecordCreated(RecordCreatedEventAsync event) {
                String origin = event.getDstId();
                System.out.println(origin);
                eventHandled.set(true);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                latch.countDown();
                String end = event.getDstId();
                System.out.println(end);
                assertEquals(origin, end);
            }
        };

        CollaGridEventPublisher.register(customListener);
        RecordCreatedEventAsync eventAsync = event.async();
        CollaGridEventPublisher.publishEventAsync(eventAsync);
        Thread.sleep(200);
        event.getContext().setDstId("b");
        // Wait for the asynchronous event to be handled
        latch.await(1, TimeUnit.SECONDS);

        assertTrue(eventHandled.get(), "The asynchronous event should have been handled by the listener");
    }
}
