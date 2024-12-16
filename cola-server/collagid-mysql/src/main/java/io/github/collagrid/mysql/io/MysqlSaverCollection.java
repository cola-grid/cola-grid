package io.github.collagrid.mysql.io;

import io.github.collagid.core.io.SaverCollection;
import io.github.collagid.core.io.datashhets.DatasheetsSaver;
import io.github.collagrid.mysql.io.datasheets.MysqlDatasheetsSaver;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MysqlSaverCollection implements SaverCollection {
    @Resource
    private MysqlDatasheetsSaver mysqlDatasheetsSaver;

    @Override
    public DatasheetsSaver getDatasheetsSaver() {
        return mysqlDatasheetsSaver;
    }
}
