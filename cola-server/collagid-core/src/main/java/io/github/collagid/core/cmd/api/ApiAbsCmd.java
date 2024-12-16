package io.github.collagid.core.cmd.api;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.SaverCollection;

public abstract class ApiAbsCmd {

    public abstract ObjectNode execute(
            ApiCmdParams params,
            LoaderCollection loaderCollection,
            SaverCollection saverCollection);
}
