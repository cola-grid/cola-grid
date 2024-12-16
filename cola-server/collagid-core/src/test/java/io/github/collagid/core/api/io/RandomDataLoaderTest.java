package io.github.collagid.core.api.io;

import io.github.collagid.core.api.chunk.ChunkCreate;
import io.github.collagid.core.api.dtos.*;
import io.github.collagid.core.api.event.CollaGridEventPublisher;
import io.github.collagid.core.api.event.CollaGridEventType;
import io.github.collagid.core.api.field.FieldCreate;
import io.github.collagid.core.api.field.FieldDTO;
import io.github.collagid.core.api.record.listener.RecordCreated;
import io.github.collagid.core.api.record.listener.RecordQueried;
import io.github.collagid.core.api.record.listener.RecordUpdated;
import io.github.collagid.core.api.snapshot.SnapshotCreate;
import io.github.collagid.core.api.snapshot.SnapshotUpdate;
import io.github.collagid.core.api.snapshot.event.SnapshotCreateEvent;
import io.github.collagid.core.api.utils.IdUtils;
import io.github.collagid.core.api.view.ViewCreate;
import io.github.collagid.core.api.view.ViewCreateEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

public class RandomDataLoaderTest {

    private RandomDataLoader dataLoader;
    private String dstId;
    private List<CollaGridEventType> orders;
    private RandomDataLoader.RandomLoaderOption randomLoaderOption;

    @BeforeEach
    void setUp() {
        dataLoader = new RandomDataLoader();
        dstId = IdUtils.getDstId();
        orders = new ArrayList<>();
        randomLoaderOption = RandomDataLoader.getRandomLoaderOption();
        CollaGridEventPublisher.register((SnapshotCreate) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((SnapshotUpdate) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((RecordUpdated) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((RecordCreated) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((RecordQueried) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((FieldCreate) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((ChunkCreate) event -> orders.add(event.getType()));
        CollaGridEventPublisher.register((ViewCreate) event -> orders.add(event.getType()));
    }

    @Test
    void testLoadSnapshot() {
        SnapshotDTO snapshot = dataLoader.loadSnapshot(dstId);
        System.out.println(orders);
        Map<String, Long> collect = orders.stream()
                .collect(
                        Collectors.groupingBy(
                                CollaGridEventType::toString,
                                Collectors.counting()
                        )
                );
        assertEquals(collect.get(CollaGridEventType.SNAPSHOT_CREATE.toString()), 1L);
        assertNull(collect.get(CollaGridEventType.SNAPSHOT_UPDATE.toString()));
        assertEquals(collect.get(CollaGridEventType.VIEW_CREATED.toString()), randomLoaderOption.getViewCount());
        assertEquals(collect.get(CollaGridEventType.CHUNK_CREATE.toString()), randomLoaderOption.getChunkCount());
        assertEquals(collect.get(CollaGridEventType.FIELD_CREATED.toString()), randomLoaderOption.getFieldCount());
        int recordCount = randomLoaderOption.getChunkCount() * randomLoaderOption.getChunkSize() * randomLoaderOption.getViewCount();
        assertEquals(collect.get(CollaGridEventType.CREATE_RECORD.toString()), recordCount);
        assertEquals(collect.get(CollaGridEventType.UPDATE_RECORD.toString()), recordCount * randomLoaderOption.getFieldCount());
        assertEquals(dstId, snapshot.getDstId());

    }

}