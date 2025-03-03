package com.example.colagrid.api.dto;

import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Data
public class GridDataDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String id;
    private String name;
    private List<GridColumnDTO> columns;
    private List<GridRowDTO> rows;
    private GridConfigDTO config;
}
