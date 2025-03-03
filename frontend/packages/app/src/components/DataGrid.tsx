import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { ValidationModule, AllEnterpriseModule, ModuleRegistry, ICellRendererParams } from 'ag-grid-enterprise';
import { AllCommunityModule, themeQuartz } from 'ag-grid-community';
import './DataGrid.css';
import { 
  EditorState, 
  columnDefs, 
  rowData, 
  subscribeToEditorStateChanges, 
  getCurrentEditorStates,
  simulateServerPush 
} from '@cola-grid/api';

const myTheme = themeQuartz.withParams({
  columnBorder: '1px solid #ccc'
});

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ValidationModule
]);

export interface DataGridProps {
  className?: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ className }) => {
  const gridRef = useRef<any>();
  
  // 存储单元格编辑状态
  const editingStatesRef = useRef<Map<string, EditorState>>(new Map());
  const [editingStates, setEditingStates] = useState<Map<string, EditorState>>(editingStatesRef.current);

  // 获取单元格的唯一标识
  const getCellKey = useCallback((rowIndex: number, colId: string) => {
    return `${rowIndex}-${colId}`;
  }, []);

  // 订阅编辑状态变化
  useEffect(() => {
    const unsubscribe = subscribeToEditorStateChanges((state, type) => {
      const key = getCellKey(state.rowIndex, state.colId);
      console.log(`编辑状态${type}:`, state);

      if (type === 'delete') {
        editingStatesRef.current.delete(key);
      } else {
        editingStatesRef.current.set(key, state);
      }
      
      setEditingStates(new Map(editingStatesRef.current));
      
      // 刷新受影响的单元格
      const api = gridRef.current?.api;
      if (api) {
        const rowNode = api.getDisplayedRowAtIndex(state.rowIndex);
        if (rowNode) {
          api.refreshCells({
            rowNodes: [rowNode],
            columns: [state.colId],
            force: true
          });
        }
      }
    });

    return () => unsubscribe();
  }, [getCellKey]);

  const getEditorState = useCallback((params: ICellRendererParams) => {
    const key = getCellKey(params.node.rowIndex, params.column.getColId());
    return editingStatesRef.current.get(key);
  }, [getCellKey]);

  const cellRenderer = useCallback((params: ICellRendererParams) => {
    const editorState = getEditorState(params);
    if (!editorState) return params.value;

    const style = {
      position: 'relative' as const,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px 0 0'
    };

    const badgeStyle = {
      position: 'absolute' as const,
      top: '2px',
      right: '2px',
      padding: '2px 4px',
      fontSize: '10px',
      lineHeight: '12px',
      height: '16px',
      borderRadius: '4px',
      color: 'white',
      backgroundColor: editorState.color,
      opacity: 0.8,
      whiteSpace: 'nowrap' as const,
      zIndex: 1
    };

    return (
      <div style={style}>
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1
        }}>
          {params.value}
        </span>
        <span style={badgeStyle}>{editorState.editor}</span>
      </div>
    );
  }, [getEditorState]);

  const onExportExcel = useCallback(() => {
    const params = {
      fileName: '车辆数据导出.xlsx',
    };
    gridRef.current!.api.exportDataAsExcel(params);
  }, []);

  const getContextMenuItems = useCallback((params: any) => {
    const result = [
      {
        name: '导出到 Excel',
        action: () => {
          onExportExcel();
        },
      },
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      'chartRange',
    ];
    return result;
  }, [onExportExcel]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onExportExcel}
        >
          导出到 Excel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => simulateServerPush()}
        >
          模拟新编辑者
        </button>
      </div>
      <div className={`w-full h-[500px]`}>
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          columnDefs={columnDefs}
          rowData={rowData}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            filter: true,
            cellRenderer
          }}
          sideBar={{
            toolPanels: [
              {
                id: 'columns',
                labelDefault: '列',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
              },
              {
                id: 'filters',
                labelDefault: '筛选',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
              },
            ],
          }}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
              { statusPanel: 'agFilteredRowCountComponent' },
              { statusPanel: 'agSelectedRowCountComponent' },
              { statusPanel: 'agAggregationComponent' },
            ],
          }}
          enableRangeSelection={true}
          groupDisplayType={'multipleColumns'}
          rowSelection="multiple"
          enableRangeHandle={true}
          enableFillHandle={true}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          enableCellChangeFlash={true}
          getContextMenuItems={getContextMenuItems}
          suppressCopyRowsToClipboard={false}
          clipboardDelimiter="\t"
        />
      </div>
    </div>
  );
};
