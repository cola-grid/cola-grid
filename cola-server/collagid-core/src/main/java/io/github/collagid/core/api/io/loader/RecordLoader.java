package io.github.collagid.core.api.io.loader;

import io.github.collagid.core.api.dtos.RecordDTO;

import java.io.IOException;
import java.util.List;

public interface RecordLoader {

    List<RecordDTO> loadRecords(String dstId, String viewId, String chunkId);

}
