package io.github.collagid.core.api;

import io.github.collagid.core.api.dtos.RecordDTO;
import io.github.collagid.core.api.dtos.SnapshotDTO;
import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventPublisher;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.io.RandomDataLoader;
import io.github.collagid.core.api.record.event.RecordCreatedEvent;
import io.github.collagid.core.api.record.event.RecordQueryEvent;
import io.github.collagid.core.api.record.event.async.RecordQueryEventAsync;
import io.github.collagid.core.api.record.listener.RecordCreated;
import io.github.collagid.core.api.record.listener.RecordQueried;
import org.junit.jupiter.api.Test;

import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SnapshotDTOTest {
    @Test
    public void  testAddRecord(){
        AtomicInteger recordCounter = new AtomicInteger();
        AtomicInteger recordLoadedCounter = new AtomicInteger();
        RandomDataLoader.RandomLoaderOption option = new RandomDataLoader.RandomLoaderOptionBuilder().setChunkCount(1).setChunkSize(5).build();
        CollaGridEventListener<RecordCreatedEvent> customListener = new RecordCreated() {
            @Override
            public CollaGridEventType getType() {
                return CollaGridEventType.CREATE_RECORD;
            }

            @Override
            public void onRecordCreated(RecordCreatedEvent event) {
                recordCounter.incrementAndGet();
            }
        };

        CollaGridEventPublisher.register(new RecordQueried.Async(){
            @Override
            public void onRecordQueried(RecordQueryEventAsync event) {
                recordLoadedCounter.incrementAndGet();
            }
        });
        SnapshotDTO dto = new RandomDataLoader()
                .withOptions(option)
                .loadSnapshot("x");

        CollaGridEventPublisher.register(customListener);
        int c = 3;
        for (int i = 0; i < c; i++) {
            RecordDTO recordDTO = new RecordDTO();
            recordDTO.setId("" + i);
            dto.addRecord(recordDTO);
        }
        assertEquals(c, recordCounter.get(), "add record listener works");
        assertEquals(option.getChunkSize(), recordLoadedCounter.get(), "load record listener works");
    }
}