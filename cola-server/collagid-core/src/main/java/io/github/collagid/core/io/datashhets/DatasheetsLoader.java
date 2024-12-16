package io.github.collagid.core.io.datashhets;

import io.github.collagid.core.dto.ColaGridDatasheetDto;

public interface DatasheetsLoader {

    ColaGridDatasheetDto getOne(String dstId);

}
