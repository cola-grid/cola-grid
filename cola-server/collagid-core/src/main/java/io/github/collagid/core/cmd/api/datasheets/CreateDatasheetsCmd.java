package io.github.collagid.core.cmd.api.datasheets;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.cmd.api.ApiAbsCmd;
import io.github.collagid.core.cmd.api.ApiCmdParams;
import io.github.collagid.core.dto.ColaGridDatasheetDto;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;
import io.github.collagid.core.io.datashhets.DatasheetsSaver;
import io.github.collagid.core.utils.ConstVal;

public class CreateDatasheetsCmd extends ApiAbsCmd {

    @Override
    public ObjectNode execute(ApiCmdParams params, LoaderCollection loaderCollection, SaverCollection saverCollection) {
        DatasheetsSaver datasheetsSaver = saverCollection.getDatasheetsSaver();
        ColaGridDatasheetDto datasheet = datasheetsSaver.createDatasheet(params.dstId);
        return ConstVal.MAPPER.valueToTree(datasheet);
    }
}
