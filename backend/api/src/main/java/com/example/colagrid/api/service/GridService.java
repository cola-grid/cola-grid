package com.example.colagrid.api.service;

import com.example.colagrid.api.dto.GridDataDTO;

public interface GridService {
    GridDataDTO createGrid(GridDataDTO gridData);
    GridDataDTO getGrid(String id);
    GridDataDTO updateGrid(String id, GridDataDTO gridData);
    void deleteGrid(String id);
}
