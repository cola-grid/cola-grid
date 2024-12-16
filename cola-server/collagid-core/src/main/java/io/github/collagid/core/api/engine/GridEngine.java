package io.github.collagid.core.api.engine;

import io.github.collagid.core.api.dtos.SnapshotDTO;
import io.github.collagid.core.api.event.CollaGridEvent;
import io.github.collagid.core.api.event.CollaGridEventListener;
import io.github.collagid.core.api.event.CollaGridEventPublisher;
import io.github.collagid.core.api.vos.op.ChangeVO;

public interface GridEngine {

    SnapshotDTO findSnapshot(String dstId);

    ChangeVO changeSnapshot(ChangeVO ops);

    default <T extends CollaGridEvent> void register(CollaGridEventListener<T> listener) {
        CollaGridEventPublisher.register(listener);
    }
}
