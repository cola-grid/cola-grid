package com.example.colagrid.api.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class GridColumnDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String field;
    private String title;
    private String type;
    private Integer width;
    private Boolean sortable;
    private Boolean filterable;
    private String align;
}
