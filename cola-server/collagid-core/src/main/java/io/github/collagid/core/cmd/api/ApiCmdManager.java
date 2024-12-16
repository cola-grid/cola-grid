package io.github.collagid.core.cmd.api;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.cmd.api.datasheets.CreateDatasheetsCmd;
import io.github.collagid.core.cmd.api.datasheets.ListDatasheetsCmd;
import io.github.collagid.core.exp.ColaOtException;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ApiCmdManager {
    private static final Map<ApiCmdType, ApiAbsCmd> CMD_CACHE = new HashMap<>();

    static {
        CMD_CACHE.put(ApiCmdType.ADD_DATASHEET, new CreateDatasheetsCmd());
        CMD_CACHE.put(ApiCmdType.LIST_DATASHEETS, new ListDatasheetsCmd());
    }

    public static ObjectNode execute(
            ApiCmdParams params,
            LoaderCollection loaderCollection,
            SaverCollection saverCollection){
        ApiAbsCmd apiAbsCmd = CMD_CACHE.get(params.cmdType);
        if (apiAbsCmd != null) {
            return apiAbsCmd.execute(params, loaderCollection, saverCollection);
        }
        throw new ColaOtException("no such cmd");
    }
}
