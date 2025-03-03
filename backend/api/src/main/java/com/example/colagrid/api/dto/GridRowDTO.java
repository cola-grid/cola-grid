package com.example.colagrid.api.dto;

import lombok.Data;
import java.io.Serializable;
import java.util.Map;

@Data
public class GridRowDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String id;
    private Map<String, Object> data;
}
