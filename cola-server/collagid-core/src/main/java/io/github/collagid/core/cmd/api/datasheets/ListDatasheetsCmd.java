package io.github.collagid.core.cmd.api.datasheets;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.cmd.api.ApiAbsCmd;
import io.github.collagid.core.cmd.api.ApiCmdParams;
import io.github.collagid.core.dto.ColaGridDatasheetDto;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;
import io.github.collagid.core.io.datashhets.DatasheetsLoader;
import io.github.collagid.core.utils.ConstVal;

public class ListDatasheetsCmd extends ApiAbsCmd {

    @Override
    public ObjectNode execute(ApiCmdParams params, LoaderCollection loaderCollection, SaverCollection saverCollection) {
        DatasheetsLoader datasheetsLoader = loaderCollection.getDatasheetsLoader();
        ColaGridDatasheetDto one = datasheetsLoader.getOne(params.dstId);
        if (one == null) {
            return ConstVal.MAPPER.createObjectNode();
        }
        return ConstVal.MAPPER.valueToTree(one);
    }

}
