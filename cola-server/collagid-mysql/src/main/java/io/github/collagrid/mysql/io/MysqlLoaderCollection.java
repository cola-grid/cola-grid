package io.github.collagrid.mysql.io;

import io.github.collagid.core.io.LoaderCollection;
import io.github.collagid.core.io.datashhets.DatasheetsLoader;
import io.github.collagrid.mysql.io.datasheets.MysqlDatasheetsLoader;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MysqlLoaderCollection implements LoaderCollection {

    @Resource
    private MysqlDatasheetsLoader mysqlDatasheetsLoader;

    @Override
    public DatasheetsLoader getDatasheetsLoader() {
        return mysqlDatasheetsLoader;
    }
}
