import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { ValidationModule, AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';
import { AllCommunityModule, themeQuartz } from 'ag-grid-community';
import './DataGrid.css';
import { DynamicStyleManager } from './DynamicStyleManager';
import { 
  EditorState, 
  columnDefs, 
  rowData, 
  subscribeToEditorStateChanges, 
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
  const [editingStates] = useState(new Map<string, EditorState>());
  const manager = useRef(new DynamicStyleManager());
  const unsubscribeRef = useRef<() => void>();

  // 获取单元格的唯一标识
  const getCellKey = useCallback((rowIndex: number, colId: string) => {
    return `${rowIndex}-${colId}`;
  }, []);

  // 获取单元格元素
  const getCellElement = useCallback((rowIndex: number, colId: string) => {
    const row = document.querySelector(`div[role="row"][row-index="${rowIndex}"]`);
    if (!row) {
      console.warn(`未找到行：row-index="${rowIndex}"`);
      return null;
    }

    const cell = row.querySelector(`div[col-id="${colId}"]`);
    if (!cell) {
      console.warn(`未找到单元格：col-id="${colId}"`);
      return null;
    }

    return cell;
  }, []);

  // 处理编辑状态变化
  const handleEditorStateChange = useCallback((state: EditorState, type: 'add' | 'update' | 'delete') => {
    const key = getCellKey(state.rowIndex, state.colId);
    console.log(`编辑状态${type}:`, state);

    const cell = getCellElement(state.rowIndex, state.colId);
    if (!cell) {
      console.warn(`未找到单元格：row-index="${state.rowIndex}", col-id="${state.colId}"`);
      return;
    }

    if (type === 'delete') {
      cell.removeAttribute('data-editor-info');
      manager.current.removeStyle(state.editor);
    } else {
      cell.setAttribute('data-editor-info', state.editor);
      manager.current.addOrUpdateStyle(state.editor, state.color);
    }
  }, [getCellKey, getCellElement]);

  // 清理订阅
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const onGridReady = useCallback(() => {
    // 表格准备好后，订阅编辑状态变化
    unsubscribeRef.current = subscribeToEditorStateChanges(handleEditorStateChange);
  }, [handleEditorStateChange]);

  const onExportExcel = useCallback(() => {
    const params = {
      fileName: '车辆数据导出.xlsx',
    };
    gridRef.current!.api.exportDataAsExcel(params);
  }, []);

  const getContextMenuItems = useCallback(() => {
    return [
      {
        name: '导出到 Excel',
        action: onExportExcel,
      },
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      'chartRange',
    ];
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
          onClick={simulateServerPush}
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
          onGridReady={onGridReady}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            filter: true
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
