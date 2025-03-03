package com.example.colagrid.api.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class GridConfigDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Boolean showHeader;
    private Boolean showFooter;
    private Boolean enablePagination;
    private Integer pageSize;
    private String theme;
}
