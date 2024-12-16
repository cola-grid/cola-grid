package io.github.collagrid.mysql.io.datasheets;

import io.github.collagid.core.dto.ColaGridDatasheetDto;
import io.github.collagid.core.io.datashhets.DatasheetsSaver;
import io.github.collagrid.mysql.entity.ColaGridDatasheetEntity;
import io.github.collagrid.mysql.mapper.ColaGridDatasheetMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MysqlDatasheetsSaver implements DatasheetsSaver {

    @Resource
    private ColaGridDatasheetMapper colaGridDatasheetMapper;

    @Override
    public ColaGridDatasheetDto createDatasheet(String dstId) {
        ColaGridDatasheetEntity colaGridDatasheetEntity = new ColaGridDatasheetEntity();
        colaGridDatasheetEntity.setDstId(dstId);
        colaGridDatasheetEntity.setV(0L);
        colaGridDatasheetMapper.insert(colaGridDatasheetEntity);
        return colaGridDatasheetEntity.toDto();
    }
}
