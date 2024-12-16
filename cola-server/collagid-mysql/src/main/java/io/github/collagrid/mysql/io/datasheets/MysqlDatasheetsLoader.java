package io.github.collagrid.mysql.io.datasheets;

import io.github.collagid.core.dto.ColaGridDatasheetDto;
import io.github.collagid.core.io.datashhets.DatasheetsLoader;
import io.github.collagrid.mysql.entity.ColaGridDatasheetEntity;
import io.github.collagrid.mysql.mapper.ColaGridDatasheetMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MysqlDatasheetsLoader implements DatasheetsLoader {

    @Resource
    private ColaGridDatasheetMapper colaGridDatasheetMapper;

    @Override
    public ColaGridDatasheetDto getOne(String dstId) {
        if (dstId == null) {
            return null;
        }
        ColaGridDatasheetEntity colaGridDatasheet = colaGridDatasheetMapper.selectOneById(dstId);
        if (colaGridDatasheet == null) {
            return null;
        }
        return colaGridDatasheet.toDto();
    }

}
