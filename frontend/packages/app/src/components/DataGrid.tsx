import React, { useState, useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { ValidationModule,AllEnterpriseModule, ModuleRegistry, ColDef, ICellRendererParams, GridApi } from 'ag-grid-enterprise';
import { AllCommunityModule, themeQuartz } from 'ag-grid-community';
import './DataGrid.css';

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

// 编辑状态类型
interface EditorState {
  rowIndex: number;
  colId: string;
  editor: string;
  color: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ className }) => {
  const gridRef = useRef<any>();
  
  // 存储单元格编辑状态
  const editingStatesRef = useRef<EditorState[]>([
    { rowIndex: 0, colId: 'model', editor: 'User1', color: '#0000ff' },
    { rowIndex: 1, colId: 'model', editor: '2人编辑', color: '#ff0000' },
    { rowIndex: 3, colId: 'model', editor: 'User2', color: '#ff0000' }
  ]);
  const [editingStates, setEditingStates] = useState(editingStatesRef.current);

  const getEditorState = useCallback((params: ICellRendererParams) => {
    return editingStatesRef.current.find(
      state => state.rowIndex == params.node.rowIndex && state.colId == params.column.getColId()
    );
  }, []);

  const cellRenderer = useCallback((params: ICellRendererParams) => {
    const editorState = getEditorState(params);
    console.log('zzq see updated', params, editorState);
    if (!editorState) return params.value;

    console.log(params, 'edited', editorState);
    const style = {
      position: 'relative' as const,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px 0 0' // 只保留右侧空间
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
      zIndex: 1 // 确保 badge 在内容之上
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

  const [columnDefs] = useState<ColDef[]>([
    { 
      field: 'make',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { 
      field: 'model',
      sortable: true,
      filter: true,
      editable: true,
      cellRenderer
    },
    { 
      field: 'price',
      sortable: true,
      filter: true,
      aggFunc: 'avg',
      editable: true,
      cellEditor: 'agRichSelect',
      cellEditorParams: {
        values: [25000, 28000, 30000, 32000, 35000, 72000],
      }
    }
  ]);

  const [rowData] = useState([
    { 
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
      monthlyData: [10, 15, 8, 12, 9, 14]
    },
    { 
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      monthlyData: [8, 7, 9, 11, 13, 10]
    },
    { 
      make: 'Ford',
      model: 'Focus',
      price: 28000,
      monthlyData: [12, 11, 10, 9, 8, 7]
    },
    { 
      make: 'Porsche',
      model: 'Boxster',
      price: 72000,
      monthlyData: [5, 6, 8, 9, 7, 8]
    },
    { 
      make: 'Toyota',
      model: 'Corolla',
      price: 25000,
      monthlyData: [15, 14, 13, 12, 11, 10]
    },
    { 
      make: 'Toyota',
      model: 'Camry',
      price: 30000,
      monthlyData: [9, 10, 11, 12, 13, 14]
    }
  ]);

  // 模拟收到服务器通知，更新编辑状态
  const updateEditorState = useCallback((rowIndex: number, colId: string, editor: string, color: string) => {
    setEditingStates(prev => {
      // 移除相同位置的旧状态
      const filtered = prev.filter(state => !(state.rowIndex === rowIndex && state.colId === colId));
      // 添加新状态
      const newState =  [...filtered, { rowIndex, colId, editor, color }];
      editingStatesRef.current = newState;
      return newState;
    });

    // 获取单元格并刷新
    const api = gridRef.current?.api;
    console.log(`修改 ${rowIndex} ${colId}`, api);
    if (api) {
      const rowNode = api.getDisplayedRowAtIndex(rowIndex);
      if (rowNode) {
        console.log(`刷新 ${rowIndex} ${colId}`, rowNode);
        api.refreshCells({
          rowNodes: [rowNode],
          columns: [colId],
          force: true
        });
      }
    }
  }, []);

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
          onClick={() => updateEditorState(2, 'model', 'User3', '#6b56e3')}
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
