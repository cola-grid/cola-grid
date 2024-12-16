package io.github.collagid.core.api.io.loader;

import io.github.collagid.core.api.field.FieldDTO;

import java.util.Map;

public interface FiledMapLoader {

    Map<String, FieldDTO> loadFieldMap(String dstId);

}
