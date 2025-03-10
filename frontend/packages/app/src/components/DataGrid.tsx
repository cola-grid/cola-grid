import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { 
  ValidationModule, 
  AllEnterpriseModule, 
  ModuleRegistry,
  Column,
  RowNode,
  CellPosition
} from 'ag-grid-enterprise';
import { 
  AllCommunityModule, 
  themeQuartz,
  ThemeDefaultParams
} from 'ag-grid-community';
import './DataGrid.css';
import { DynamicStyleManager } from './DynamicStyleManager';
import '@cola-grid/base-component';
import { 
  EditorState, 
  columnDefs, 
  rowData, 
  subscribeToEditorStateChanges, 
  simulateServerPush,
  JumpToRowOptions 
} from '@cola-grid/api';

const lightTheme = themeQuartz.withParams({
  columnBorder: '1px solid #ccc',
  backgroundColor: '#ffffff',
  headerBackgroundColor: '#f3f4f6',
  rowHoverColor: '#f9fafb',
  selectedRowBackgroundColor: '#e5edff',
  borderColor: '#e5e7eb',
} as Partial<ThemeDefaultParams>);

const darkTheme = themeQuartz.withParams({
  columnBorder: '1px solid #374151',
  backgroundColor: '#1f2937',
  headerBackgroundColor: '#111827',
  rowHoverColor: '#374151',
  selectedRowBackgroundColor: '#2563eb',
  borderColor: '#374151',
  foregroundColor: '#ffffff',
} as Partial<ThemeDefaultParams>);

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ValidationModule
]);

export interface DataGridProps {
  className?: string;
  onJumpToRow?: (options: JumpToRowOptions) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({ className, onJumpToRow }) => {
  const gridRef = useRef<any>();
  const [editingStates] = useState(new Map<string, EditorState>());
  const manager = useRef(new DynamicStyleManager());
  const unsubscribeRef = useRef<() => void>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [jumpToRow, setJumpToRow] = useState<number>(1);

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

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleInsertRow = useCallback(() => {
    const rowData = {
      // 添加新行的默认数据
    };
    gridRef.current?.api.applyTransaction({ add: [rowData] });
  }, []);

  const handleHideColumn = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.columnApi.setColumnsVisible(selectedColumns, false);
    }
  }, []);

  const handleFilter = useCallback(() => {
    gridRef.current?.api.setQuickFilter(
      prompt('请输入筛选关键字') || ''
    );
  }, []);

  const handleGroup = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.columnApi.addRowGroupColumns(selectedColumns);
    }
  }, []);

  const handleSort = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.api.setSortModel(
        selectedColumns.map((col: Column) => ({
          colId: col.getId(),
          sort: 'asc'
        }))
      );
    }
  }, []);

  const handleRowHeight = useCallback(() => {
    const height = parseInt(prompt('请输入行高（像素）', '40') || '40');
    if (!isNaN(height)) {
      gridRef.current?.api.forEachNode((node: RowNode) => {
        node.setRowHeight(height);
      });
      gridRef.current?.api.onRowHeightChanged();
    }
  }, []);

  const handleShare = useCallback(() => {
    onExportExcel();
  }, [onExportExcel]);

  // 处理行跳转的核心逻辑
  const handleRowNavigation = useCallback((options: JumpToRowOptions) => {
    if (!gridRef.current) return;
    
    const targetIndex = options.rowIndex - 1; // 转换为0基索引
    if (targetIndex < 0 || targetIndex >= 1500) return;

    // 确保目标行在可视区域内
    gridRef.current.api.ensureIndexVisible(targetIndex);
    
    // 如果需要高亮显示
    if (options.highlight) {
      const rowNode = gridRef.current.api.getDisplayedRowAtIndex(targetIndex);
      if (rowNode) {
        rowNode.setDataValue('flash', true);
        setTimeout(() => rowNode.setDataValue('flash', false), 1000);
      }
    }

    // 如果需要聚焦特定单元格
    if (options.focusCell) {
      const cellPosition: CellPosition = {
        rowIndex: targetIndex,
        column: gridRef.current.columnApi.getColumn(options.focusCell.field),
        rowPinned: null
      };
      
      if (options.focusCell.scrollIntoView) {
        gridRef.current.api.ensureColumnVisible(options.focusCell.field);
      }
      
      gridRef.current.api.clearRangeSelection();
      gridRef.current.api.setFocusedCell(
        cellPosition.rowIndex,
        cellPosition.column,
        cellPosition.rowPinned
      );
      gridRef.current.api.getDisplayedRowAtIndex(targetIndex)?.setSelected(true);
    } else {
      // 如果没有指定单元格，只选中行
      gridRef.current.api.clearRangeSelection();
      gridRef.current.api.getDisplayedRowAtIndex(targetIndex)?.setSelected(true);
    }
  }, []);

  // 处理输入框跳转按钮点击
  const handleJumpToRow = useCallback(() => {
    const options: JumpToRowOptions = {
      rowIndex: jumpToRow,
      highlight: true
    };
    
    // 如果提供了外部处理函数，则调用它
    if (onJumpToRow) {
      onJumpToRow(options);
    } else {
      // 否则使用内部处理逻辑
      handleRowNavigation(options);
    }
  }, [jumpToRow, onJumpToRow, handleRowNavigation]);

  // 暴露行跳转方法给外部
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.jumpToRow = handleRowNavigation;
    }
  }, [handleRowNavigation]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
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
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max="1500"
            className={`w-24 px-3 py-2 border rounded ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
            placeholder="行号"
            onChange={(e) => setJumpToRow(Math.max(1, Math.min(1500, parseInt(e.target.value) || 1)))}
            value={jumpToRow}
          />
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            onClick={handleJumpToRow}
          >
            跳转
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded ${
            isDarkMode 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
              : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
          onClick={toggleTheme}
        >
          {isDarkMode ? '☀️ 日间模式' : '🌙 夜间模式'}
        </button>
      </div>
      <div>
        <cola-toolbar
            oninsert-row={handleInsertRow}
            onhide-column={handleHideColumn}
            onfilter={handleFilter}
            ongroup={handleGroup}
            onsort={handleSort}
            onadjust-row-height={handleRowHeight}
            onshare={handleShare}
          />
      </div>
      <div 
        className={`w-full h-[500px] ${isDarkMode ? 'theme-dark' : 'theme-light'}`}
        style={{
          '--toolbar-bg': isDarkMode ? '#1f2937' : '#ffffff',
          '--toolbar-border-color': isDarkMode ? '#374151' : '#e8e8e8',
          '--button-border-color': isDarkMode ? '#4b5563' : '#d9d9d9',
          '--button-color': isDarkMode ? '#e5e7eb' : '#595959',
          '--button-hover-color': isDarkMode ? '#60a5fa' : '#1677ff',
          '--button-hover-border-color': isDarkMode ? '#60a5fa' : '#1677ff',
          '--button-hover-bg': isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(22, 119, 255, 0.1)',
          '--button-active-color': isDarkMode ? '#3b82f6' : '#0958d9',
          '--button-active-border-color': isDarkMode ? '#3b82f6' : '#0958d9',
          '--divider-color': isDarkMode ? '#374151' : '#e8e8e8'
        } as React.CSSProperties}
      >
        <AgGridReact
          ref={gridRef}
          theme={isDarkMode ? darkTheme : lightTheme}
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
