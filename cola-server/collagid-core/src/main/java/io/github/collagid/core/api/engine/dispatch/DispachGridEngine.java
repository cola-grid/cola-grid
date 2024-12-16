package io.github.collagid.core.api.engine.dispatch;

import io.github.collagid.core.api.dtos.SnapshotDTO;
import io.github.collagid.core.api.engine.GridEngine;
import io.github.collagid.core.api.vos.op.ChangeVO;

public class DispachGridEngine implements GridEngine {

    @Override
    public SnapshotDTO findSnapshot(String dstId) {
        return null;
    }

    @Override
    public ChangeVO changeSnapshot(ChangeVO ops) {
        return null;
    }
}
