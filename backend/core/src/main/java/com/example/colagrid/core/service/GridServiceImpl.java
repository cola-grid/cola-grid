package com.example.colagrid.core.service;

import com.example.colagrid.api.dto.GridDataDTO;
import com.example.colagrid.api.service.GridService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GridServiceImpl implements GridService {
    private final Map<String, GridDataDTO> gridStore = new ConcurrentHashMap<>();

    @Override
    public GridDataDTO createGrid(GridDataDTO gridData) {
        gridStore.put(gridData.getId(), gridData);
        return gridData;
    }

    @Override
    public GridDataDTO getGrid(String id) {
        return gridStore.get(id);
    }

    @Override
    public GridDataDTO updateGrid(String id, GridDataDTO gridData) {
        if (!gridStore.containsKey(id)) {
            throw new RuntimeException("Grid not found with id: " + id);
        }
        gridStore.put(id, gridData);
        return gridData;
    }

    @Override
    public void deleteGrid(String id) {
        gridStore.remove(id);
    }
}
