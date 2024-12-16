package io.github.collagid.core.api.io.loader;

import io.github.collagid.core.api.dtos.SnapshotDTO;

public interface DstLoader {

    SnapshotDTO loadSnapshot(String dstId);

}
